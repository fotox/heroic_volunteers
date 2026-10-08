"""Sensors: one per child (stars) plus open approvals – handy for automations."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SIGNAL_UPDATE


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    mgr = hass.data[DOMAIN]
    known: set[str] = set()

    @callback
    def sync() -> None:
        current = set(mgr.game.children)
        new = current - known
        if new:
            known.update(new)
            async_add_entities(ChildSensor(entry, mgr, cid) for cid in new)
        gone = known - current
        if gone:
            reg = er.async_get(hass)
            for cid in gone:
                known.discard(cid)
                if eid := reg.async_get_entity_id("sensor", DOMAIN, f"{entry.entry_id}_{cid}"):
                    reg.async_remove(eid)

    async_add_entities([PendingSensor(entry, mgr)])
    sync()
    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_UPDATE, sync))


class _Base(SensorEntity):
    _attr_should_poll = False
    _attr_has_entity_name = True

    def __init__(self, entry: ConfigEntry, mgr) -> None:
        self._mgr = mgr
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Helferhelden",
            "manufacturer": "Helferhelden",
        }

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            async_dispatcher_connect(self.hass, SIGNAL_UPDATE, self.async_write_ha_state)
        )


class ChildSensor(_Base):
    _attr_icon = "mdi:star-face"
    _attr_native_unit_of_measurement = "⭐"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, entry: ConfigEntry, mgr, child_id: str) -> None:
        super().__init__(entry, mgr)
        self._cid = child_id
        self._attr_unique_id = f"{entry.entry_id}_{child_id}"

    def _view(self) -> dict[str, Any] | None:
        return next((c for c in self._mgr.view()["children"] if c["id"] == self._cid), None)

    @property
    def available(self) -> bool:
        return self._cid in self._mgr.game.children

    @property
    def name(self) -> str:
        child = self._mgr.game.children.get(self._cid)
        return f"{child.name} Sterne" if child else "Sterne"

    @property
    def native_value(self) -> int | None:
        child = self._mgr.game.children.get(self._cid)
        return child.stars if child else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        v = self._view()
        if not v:
            return {}
        return {
            "child_id": v["id"],
            "role": v["role"],
            "level": v["level"],
            "xp": v["xp"],
            "streak": v["streak"],
            "best_streak": v["best_streak"],
            "done_today": v["done"],
            "total_today": v["total"],
            "all_done_today": v["total"] > 0 and v["done"] == v["total"],
            "open_tasks": [t["title"] for t in v["tasks"] if t["status"] == "open"],
            "badges": len(v["badges"]),
            "pet": v["pet"],
        }


class PendingSensor(_Base):
    _attr_icon = "mdi:account-check"
    _attr_name = "Offene Bestätigungen"

    def __init__(self, entry: ConfigEntry, mgr) -> None:
        super().__init__(entry, mgr)
        self._attr_unique_id = f"{entry.entry_id}_pending"

    @property
    def native_value(self) -> int:
        return len(self._mgr.game.pending()) + sum(
            1 for p in self._mgr.game.purchases if not p["redeemed"]
        )

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {
            "approvals": [f"{p['child']}: {p['chore']}" for p in self._mgr.game.pending()],
            "rewards_to_redeem": [
                f"{self._mgr.game.children[p['child_id']].name}: {p['title']}"
                for p in self._mgr.game.purchases
                if not p["redeemed"] and p["child_id"] in self._mgr.game.children
            ],
        }
