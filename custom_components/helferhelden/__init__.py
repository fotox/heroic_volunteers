"""Helferhelden – a gamified chore system for kids in Home Assistant."""

from __future__ import annotations

import logging
import time
from collections.abc import Callable
from pathlib import Path
from typing import Any

import voluptuous as vol
from homeassistant.auth.permissions.const import POLICY_CONTROL
from homeassistant.components import frontend, websocket_api
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import Context, HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import (
    async_dispatcher_connect,
    async_dispatcher_send,
)
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    CARD_URL,
    DOMAIN,
    EVENT_PREFIX,
    FONTS_URL,
    SIGNAL_UPDATE,
    STORAGE_KEY,
    STORAGE_VERSION,
    VERSION,
)
from .model import (
    SCRIPT_RE,
    Game,
    GameError,
    encode_pin,
    is_legacy_pin,
    pin_matches,
    validate_pin,
)

_LOGGER = logging.getLogger(__name__)

PLATFORMS = [Platform.SENSOR]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

PIN_MAX_FAILS = 5
PIN_LOCK_SECONDS = 60

KID_ACTIONS = {"complete", "undo", "buy"}
ADMIN_ACTIONS = {
    "approve", "reject", "redeem", "adjust_stars",
    "save_child", "delete_child", "save_chore", "delete_chore",
    "save_reward", "delete_reward", "set_quest", "set_pin", "check_pin", "set_voice",
    "reward_script",
}

# Actions that only read: they must not trigger a save or a state push.
READ_ONLY_ACTIONS = {"check_pin", "reward_script"}


class Manager:
    """Owns the game, persistence, events and change listeners."""

    def __init__(self, hass: HomeAssistant, store: Store, game: Game) -> None:
        self.hass = hass
        self.store = store
        self.game = game
        # Failed attempts and lock per Home Assistant account: one account mistyping must not
        # lock out another. On a shared wall tablet everyone uses one account, so they share
        # one counter -- which is the same as before for that setup.
        self._pin_fails: dict[str, int] = {}
        self._pin_locked_until: dict[str, float] = {}

    @callback
    def view(self) -> dict[str, Any]:
        return self.game.view(dt_util.now())

    @callback
    def notify(self) -> None:
        """Push fresh state to cards and sensors (subscriptions survive reloads)."""
        async_dispatcher_send(self.hass, SIGNAL_UPDATE)

    @callback
    def changed(self) -> None:
        self.store.async_delay_save(self.game.to_dict, 1)
        self.notify()

    async def verify_pin(self, pin: str | None, account: str = "") -> str | None:
        """Return an error code, or None if the PIN is fine. Rate-limited per account.

        The hash comparison is CPU-bound by design, so it runs in an executor rather than
        on the event loop.
        """
        if not self.game.pin:
            return None
        if time.monotonic() < self._pin_locked_until.get(account, 0.0):
            return "pin_locked"
        if await self.hass.async_add_executor_job(pin_matches, pin, self.game.pin):
            self._pin_fails.pop(account, None)
            return None
        fails = self._pin_fails.get(account, 0) + 1
        if fails >= PIN_MAX_FAILS:
            self._pin_fails.pop(account, None)
            self._pin_locked_until[account] = time.monotonic() + PIN_LOCK_SECONDS
            return "pin_locked"
        self._pin_fails[account] = fails
        return "bad_pin"

    async def set_pin(self, new_pin: str | None) -> None:
        """Validate, hash off the event loop, store and save."""
        pin = validate_pin(new_pin)
        encoded = await self.hass.async_add_executor_job(encode_pin, pin) if pin else None
        self.game.set_pin_hash(encoded)
        self.changed()

    async def upgrade_legacy_pin(self) -> None:
        """Replace a plain-text PIN from an older version by its hash, and save at once."""
        if is_legacy_pin(self.game.pin):
            self.game.set_pin_hash(await self.hass.async_add_executor_job(encode_pin, self.game.pin))
            await self.store.async_save(self.game.to_dict())

    async def _run_script(
        self, entity_id: str, variables: dict[str, Any], context: Context | None = None
    ) -> None:
        """Start a reward script on behalf of the calling user, after checking rights.

        `script.turn_on` is registered as a plain service, so it runs through
        `async_extract_entities`, which checks no permissions -- Home Assistant enforces
        them in its websocket and REST entry points instead. An integration-initiated
        call bypasses those, so `buy` would otherwise let any account start any script,
        including one HA forbids it from controlling. The check below is the same one HA
        makes at its own entry point. A call with no user behind it (an automation using
        `helferhelden.complete_chore`) stays unrestricted, matching how HA treats a
        context without a user.

        The entity id is re-validated here as well as in `Game.save_reward`, because a
        value restored from .storage is never re-checked on load and this is the only
        place where it reaches the service registry.
        """
        if not SCRIPT_RE.match(entity_id):
            _LOGGER.warning("Reward script %s is not a valid script entity id", entity_id)
            return
        if context and context.user_id and not await self._may_control(context.user_id, entity_id):
            _LOGGER.warning(
                "Reward script %s not started: the account may not control it", entity_id
            )
            return
        try:
            await self.hass.services.async_call(
                "script",
                "turn_on",
                {"entity_id": entity_id, "variables": variables},
                context=context,
            )
        except Exception as err:  # noqa: BLE001 - a broken script must not break the game
            _LOGGER.warning("Reward script %s could not be started: %s", entity_id, err)

    async def _may_control(self, user_id: str, entity_id: str) -> bool:
        """Whether that Home Assistant account may control `entity_id`."""
        user = await self.hass.auth.async_get_user(user_id)
        if user is None:
            return False
        return user.is_admin or user.permissions.check_entity(entity_id, POLICY_CONTROL)

    @callback
    def _flush_events(self, context: Context | None = None) -> None:
        for name, data in self.game.pop_events():
            self.hass.bus.async_fire(f"{EVENT_PREFIX}_{name}", data, context=context)
            if name == "reward_bought" and data.get("script"):
                self.hass.async_create_task(
                    self._run_script(
                        data["script"],
                        {"child": data["child"], "reward": data["reward"]},
                        context,
                    )
                )

    @callback
    def perform(self, action: str, data: dict[str, Any], context: Context | None = None) -> Any:
        """Run one game action; raises GameError on invalid input.

        `context` carries the calling Home Assistant user through to the reward script
        call, so that call is subject to that user's entity permissions.
        """
        g, now = self.game, dt_util.now()
        handlers: dict[str, Callable[[], Any]] = {
            "complete": lambda: g.complete(data["chore_id"], data["child_id"], now),
            "undo": lambda: g.undo(data["chore_id"], data["child_id"], now),
            "buy": lambda: g.buy(data["reward_id"], data["child_id"], now),
            "approve": lambda: g.approve(data["entry_id"], now),
            "reject": lambda: g.reject(data["entry_id"]),
            "redeem": lambda: g.redeem(data["purchase_id"]),
            "adjust_stars": lambda: g.adjust_stars(
                data["child_id"], int(data["amount"]), now, data.get("reason", "")
            ),
            "save_child": lambda: g.save_child(data).id,
            "delete_child": lambda: g.delete_child(data["id"]),
            "save_chore": lambda: g.save_chore(data).id,
            "delete_chore": lambda: g.delete_chore(data["id"]),
            "save_reward": lambda: g.save_reward(data).id,
            "delete_reward": lambda: g.delete_reward(data["id"]),
            "set_quest": lambda: g.set_quest(data),
            "set_pin": lambda: g.set_pin(data.get("new_pin")),
            "set_voice": lambda: g.set_voice(data),
            "reward_script": lambda: g.reward_script(data["id"]),
            "check_pin": lambda: True,
        }
        try:
            result = handlers[action]()
        except KeyError as err:
            raise GameError(f"Feld fehlt: {err}") from err
        except (TypeError, ValueError) as err:
            raise GameError("Ungültige Eingabe") from err
        self._flush_events(context)
        if action not in READ_ONLY_ACTIONS:
            self.changed()
        return result


def _manager(hass: HomeAssistant) -> Manager:
    mgr = hass.data.get(DOMAIN)
    if mgr is None:
        raise HomeAssistantError("Helferhelden ist nicht eingerichtet")
    return mgr


# --------------------------------------------------------------- websocket API
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    if hass.data.get(DOMAIN) is None:
        connection.send_error(msg["id"], "not_setup", "Helferhelden ist nicht eingerichtet")
        return

    @callback
    def push() -> None:
        # Look the manager up on every push so the subscription survives a reload.
        if (mgr := hass.data.get(DOMAIN)) is not None:
            connection.send_message(websocket_api.event_message(msg["id"], mgr.view()))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_UPDATE, push)
    connection.send_result(msg["id"])
    push()


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/action",
        vol.Required("action"): vol.In(KID_ACTIONS | ADMIN_ACTIONS),
        vol.Optional("data", default={}): dict,
        vol.Optional("pin"): vol.Any(str, None),
    }
)
@websocket_api.async_response
async def ws_action(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    mgr = hass.data.get(DOMAIN)
    if mgr is None:
        connection.send_error(msg["id"], "not_setup", "Helferhelden ist nicht eingerichtet")
        return
    action = msg["action"]
    if action in ADMIN_ACTIONS:
        # On a shared wall tablet every family member uses one Home Assistant account,
        # so the parents' PIN -- not the account -- is what separates them. With no PIN
        # set it separates nothing, so fall back to HA's own admin flag instead of
        # treating every token holder as a parent. Otherwise the first caller could also
        # seize the lock through `set_pin`, for which there is no recovery path.
        if not mgr.game.pin and not connection.user.is_admin:
            connection.send_error(
                msg["id"],
                "unauthorized",
                "Ohne Eltern-PIN dürfen das nur Administratoren. Bitte zuerst eine PIN festlegen.",
            )
            return
        if code := await mgr.verify_pin(msg.get("pin"), connection.user.id):
            text = "Zu viele Versuche, bitte kurz warten" if code == "pin_locked" else "Falsche PIN"
            connection.send_error(msg["id"], code, text)
            return
    try:
        if action == "set_pin":
            # Hashing is deliberately slow; keep it off the event loop.
            await mgr.set_pin(msg["data"].get("new_pin"))
            result = None
        else:
            result = mgr.perform(action, msg["data"], connection.context(msg))
    except GameError as err:
        connection.send_error(msg["id"], "game_error", str(err))
        return
    connection.send_result(msg["id"], {"result": result})


# --------------------------------------------------------------------- setup
async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    websocket_api.async_register_command(hass, ws_subscribe)
    websocket_api.async_register_command(hass, ws_action)
    frontend_dir = Path(__file__).parent / "frontend"
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(CARD_URL, str(frontend_dir / "helferhelden-card.js"), False),
            StaticPathConfig(FONTS_URL, str(frontend_dir / "fonts"), True),
        ]
    )
    frontend.add_extra_js_url(hass, f"{CARD_URL}?v={VERSION}")
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store: Store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    game = Game.from_dict(await store.async_load())
    mgr = Manager(hass, store, game)
    await mgr.upgrade_legacy_pin()
    hass.data[DOMAIN] = mgr

    @callback
    def midnight(_now) -> None:
        game.prune(dt_util.now().date())
        mgr.changed()

    entry.async_on_unload(async_track_time_change(hass, midnight, hour=0, minute=0, second=5))
    @callback
    def hourly(_now) -> None:
        # keeps time-of-day mood (e.g. sleepy before 7) current
        mgr.notify()

    entry.async_on_unload(async_track_time_change(hass, hourly, minute=0, second=10))

    def _run(action: str, data: dict[str, Any], context: Context | None = None) -> None:
        try:
            mgr.perform(action, data, context)
        except GameError as err:
            raise HomeAssistantError(str(err)) from err

    async def svc_complete(call: ServiceCall) -> None:
        try:
            child = game.find_child(call.data["child"])
            chore = game.find_chore(call.data["chore"])
        except GameError as err:
            raise HomeAssistantError(str(err)) from err
        _run("complete", {"child_id": child.id, "chore_id": chore.id}, call.context)

    async def svc_stars(call: ServiceCall) -> None:
        try:
            child = game.find_child(call.data["child"])
        except GameError as err:
            raise HomeAssistantError(str(err)) from err
        _run("adjust_stars", {"child_id": child.id, "amount": call.data["amount"],
                              "reason": call.data.get("reason", "")}, call.context)

    hass.services.async_register(
        DOMAIN, "complete_chore", svc_complete,
        vol.Schema({vol.Required("child"): cv.string, vol.Required("chore"): cv.string}),
    )
    hass.services.async_register(
        DOMAIN, "add_stars", svc_stars,
        vol.Schema({
            vol.Required("child"): cv.string,
            vol.Required("amount"): vol.All(vol.Coerce(int), vol.Range(min=-1000, max=1000)),
            vol.Optional("reason", default=""): cv.string,
        }),
    )

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    mgr.notify()  # refresh cards that stayed subscribed across a reload
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        mgr: Manager = hass.data.pop(DOMAIN)
        await mgr.store.async_save(mgr.game.to_dict())
        hass.services.async_remove(DOMAIN, "complete_chore")
        hass.services.async_remove(DOMAIN, "add_stars")
    return ok
