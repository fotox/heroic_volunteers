"""Pure-Python game model for Helferhelden.

No Home Assistant imports here: everything that touches time takes an explicit
``now`` so the rules are fully unit-testable.
"""

from __future__ import annotations

import hashlib
import hmac
import math
import re
import secrets
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta
from typing import Any

XP_PER_STAR = 10
HISTORY_DAYS = 60
MAX_ADJUST = 1000
STREAK_LOOKBACK = 14
SCRIPT_RE = re.compile(r"^script\.[a-z0-9_]+$")

# The parents' PIN is stored as a salted PBKDF2 hash, never in plain text. A 4-8 digit PIN
# has little entropy, so the hash slows down guessing from a leaked .storage file rather
# than preventing it; it mainly keeps the PIN itself from being readable there.
PIN_SCHEME = "pbkdf2_sha256"
PIN_ITERATIONS = 200_000


def encode_pin(pin: str, salt: bytes | None = None, iterations: int = PIN_ITERATIONS) -> str:
    """Hash a PIN as ``pbkdf2_sha256$<iterations>$<salt hex>$<hash hex>``.

    CPU-bound on purpose; callers on the event loop run it in an executor.
    """
    salt = salt or secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", pin.encode(), salt, iterations)
    return f"{PIN_SCHEME}${iterations}${salt.hex()}${digest.hex()}"


def is_legacy_pin(stored: str | None) -> bool:
    """Whether a stored PIN predates hashing (plain digits in .storage)."""
    return bool(stored) and not str(stored).startswith(f"{PIN_SCHEME}$")


def pin_matches(pin: str | None, stored: str | None) -> bool:
    """Constant-time check of an entered PIN against the stored hash (or a legacy value)."""
    if not stored or pin is None:
        return False
    if is_legacy_pin(stored):
        return hmac.compare_digest(str(pin).encode(), str(stored).encode())
    try:
        _, iterations, salt, expected = stored.split("$")
        candidate = encode_pin(str(pin), bytes.fromhex(salt), int(iterations))
    except ValueError:
        return False
    return hmac.compare_digest(candidate.rsplit("$", 1)[1], expected)


def validate_pin(pin: str | None) -> str | None:
    """Normalise a new PIN: 4-8 digits, or empty for "no PIN"."""
    pin = (pin or "").strip()
    if pin and (not pin.isdigit() or not 4 <= len(pin) <= 8):
        raise GameError("PIN muss 4–8 Ziffern haben")
    return pin or None

TIME_SLOTS = ("morning", "day", "evening")

THEMES = ("space", "jungle", "ocean", "dino", "fairy")
ROLES = ("child", "parent")
PETS = ("dragon", "cat", "dog", "unicorn", "dino", "fox", "octopus", "bunny", "robot", "owl")

# id: (emoji, German label shown to parents, condition key)
BADGES: dict[str, tuple[str, str]] = {
    "first_chore": ("🌱", "Erste Aufgabe geschafft"),
    "stars_10": ("⭐", "10 Sterne gesammelt"),
    "stars_50": ("🌟", "50 Sterne gesammelt"),
    "stars_200": ("💫", "200 Sterne gesammelt"),
    "all_done": ("🎉", "Alle Aufgaben an einem Tag"),
    "streak_3": ("🔥", "3 Tage am Stück"),
    "streak_7": ("🏅", "7 Tage am Stück"),
    "streak_30": ("🏆", "30 Tage am Stück"),
    "early_bird": ("🐦", "Morgenaufgabe vor 8 Uhr"),
    "shopper": ("🛍️", "Erste Belohnung eingelöst"),
    "team_player": ("🤝", "Familien-Abenteuer geschafft"),
    "level_5": ("🦸", "Level 5 erreicht"),
    "level_10": ("👑", "Level 10 erreicht"),
    "family_day": ("🏡", "Ganze Familie hat alles geschafft"),
}


class GameError(Exception):
    """Raised for invalid game actions (shown to the user)."""


def new_id() -> str:
    return secrets.token_hex(4)


def xp_for_level(level: int) -> int:
    """Total XP needed to *reach* ``level`` (level 1 = 0 XP)."""
    return 25 * (level - 1) * level


def level_for_xp(xp: int) -> int:
    """Closed form of xp_for_level's inverse (no loops, safe for huge values)."""
    if xp <= 0:
        return 1
    level = max(1, (25 + math.isqrt(625 + 100 * xp)) // 50)
    while xp_for_level(level + 1) <= xp:
        level += 1
    while level > 1 and xp_for_level(level) > xp:
        level -= 1
    return level


def pet_stage(level: int) -> int:
    if level >= 10:
        return 3
    if level >= 6:
        return 2
    if level >= 3:
        return 1
    return 0


@dataclass
class Child:
    id: str
    name: str
    role: str = "child"
    pet: str = "dragon"
    pet_name: str = ""
    theme: str = "space"
    stars: int = 0
    xp: int = 0
    lifetime_stars: int = 0
    streak: int = 0
    best_streak: int = 0
    last_full_day: str | None = None
    badges: dict[str, str] = field(default_factory=dict)
    # streak state before the most recent full day, to revert on undo/reject
    day_snapshot: dict[str, Any] | None = None


@dataclass
class Chore:
    id: str
    title: str
    icon: str = "⭐"
    stars: int = 1
    days: list[int] = field(default_factory=list)  # 0=Mon … 6=Sun, empty = daily
    slot: str = "day"
    children: list[str] = field(default_factory=list)
    needs_approval: bool = False
    active: bool = True


@dataclass
class Reward:
    id: str
    title: str
    icon: str = "🎁"
    cost: int = 5
    script: str | None = None
    active: bool = True


@dataclass
class Quest:
    title: str = ""
    icon: str = "🚀"
    goal: int = 0
    progress: int = 0
    reward: str = ""
    completed_at: str | None = None
    contributors: list[str] = field(default_factory=list)


def _from_dict(cls, data: dict[str, Any]):
    names = cls.__dataclass_fields__.keys()
    return cls(**{k: v for k, v in data.items() if k in names})


class Game:
    """The whole family game state plus all rules."""

    def __init__(self) -> None:
        self.children: dict[str, Child] = {}
        self.chores: dict[str, Chore] = {}
        self.rewards: dict[str, Reward] = {}
        self.quest = Quest()
        # date iso -> list of completion dicts
        self.log: dict[str, list[dict[str, Any]]] = {}
        self.purchases: list[dict[str, Any]] = []
        self.pin: str | None = None
        self.voice: dict[str, str] = {"engine": "", "voice": "", "language": ""}
        self.family: dict[str, Any] = {"streak": 0, "best_streak": 0, "last_full_day": None, "snapshot": None}
        self.events: list[tuple[str, dict[str, Any]]] = []

    # ------------------------------------------------------------ persistence
    def to_dict(self) -> dict[str, Any]:
        from dataclasses import asdict

        return {
            "children": [asdict(c) for c in self.children.values()],
            "chores": [asdict(c) for c in self.chores.values()],
            "rewards": [asdict(r) for r in self.rewards.values()],
            "quest": asdict(self.quest),
            "log": self.log,
            "purchases": self.purchases,
            "pin": self.pin,
            "voice": self.voice,
            "family": self.family,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any] | None) -> Game:
        game = cls()
        if not data:
            return game
        game.children = {c["id"]: _from_dict(Child, c) for c in data.get("children", [])}
        game.chores = {c["id"]: _from_dict(Chore, c) for c in data.get("chores", [])}
        game.rewards = {r["id"]: _from_dict(Reward, r) for r in data.get("rewards", [])}
        game.quest = _from_dict(Quest, data.get("quest") or {})
        game.log = data.get("log", {})
        game.purchases = data.get("purchases", [])
        game.pin = data.get("pin")
        game.voice = {**game.voice, **(data.get("voice") or {})}
        game.family = {**game.family, **(data.get("family") or {})}
        return game

    def pop_events(self) -> list[tuple[str, dict[str, Any]]]:
        events, self.events = self.events, []
        return events

    def _emit(self, name: str, **data: Any) -> None:
        self.events.append((name, data))

    # ---------------------------------------------------------------- helpers
    def _child(self, child_id: str) -> Child:
        try:
            return self.children[child_id]
        except KeyError as err:
            raise GameError("Kind nicht gefunden") from err

    def find_child(self, ref: str) -> Child:
        """Find a child by id or (case-insensitive) name."""
        if ref in self.children:
            return self.children[ref]
        for child in self.children.values():
            if child.name.lower() == ref.lower():
                return child
        raise GameError(f"Kind '{ref}' nicht gefunden")

    def find_chore(self, ref: str) -> Chore:
        if ref in self.chores:
            return self.chores[ref]
        for chore in self.chores.values():
            if chore.title.lower() == ref.lower():
                return chore
        raise GameError(f"Aufgabe '{ref}' nicht gefunden")

    def chores_for(self, child_id: str, day: date) -> list[Chore]:
        wd = day.weekday()
        order = {s: i for i, s in enumerate(TIME_SLOTS)}
        result = [
            c
            for c in self.chores.values()
            if c.active and child_id in c.children and (not c.days or wd in c.days)
        ]
        return sorted(result, key=lambda c: (order.get(c.slot, 1), c.title))

    def _entries(self, day: date) -> list[dict[str, Any]]:
        return self.log.setdefault(day.isoformat(), [])

    def _entry(self, day: date, chore_id: str, child_id: str) -> dict[str, Any] | None:
        for e in self.log.get(day.isoformat(), []):
            if e["chore_id"] == chore_id and e["child_id"] == child_id:
                return e
        return None

    def _award_badge(self, child: Child, badge: str, now: datetime) -> None:
        if badge not in child.badges:
            child.badges[badge] = now.date().isoformat()
            self._emit("badge", child_id=child.id, child=child.name, badge=badge,
                       icon=BADGES[badge][0], label=BADGES[badge][1])

    def _add_stars(self, child: Child, amount: int, now: datetime) -> None:
        old_level = level_for_xp(child.xp)
        child.stars = max(0, child.stars + amount)
        child.lifetime_stars = max(0, child.lifetime_stars + amount)
        child.xp = max(0, child.xp + amount * XP_PER_STAR)
        new_level = level_for_xp(child.xp)
        if new_level > old_level:
            self._emit("level_up", child_id=child.id, child=child.name, level=new_level)
        if amount > 0:
            for n in (10, 50, 200):
                if child.lifetime_stars >= n:
                    self._award_badge(child, f"stars_{n}", now)
            if new_level >= 5:
                self._award_badge(child, "level_5", now)
            if new_level >= 10:
                self._award_badge(child, "level_10", now)

    def _quest_add(self, child: Child, amount: int, now: datetime) -> None:
        q = self.quest
        if not q.goal or q.completed_at:
            return
        q.progress = max(0, q.progress + amount)
        if amount > 0 and child.id not in q.contributors:
            q.contributors.append(child.id)
        if q.progress >= q.goal:
            q.progress = q.goal
            q.completed_at = now.isoformat()
            for cid in q.contributors:
                if cid in self.children:
                    self._award_badge(self.children[cid], "team_player", now)
            self._emit("quest_complete", title=q.title, reward=q.reward)

    def _check_full_day(self, child: Child, now: datetime) -> None:
        day = now.date()
        chores = self.chores_for(child.id, day)
        if not chores:
            return
        for chore in chores:
            if self._entry(day, chore.id, child.id) is None:
                return
        today = day.isoformat()
        if child.last_full_day == today:
            return
        child.day_snapshot = {
            "day": today, "streak": child.streak, "best_streak": child.best_streak,
            "last_full_day": child.last_full_day,
        }
        prev = self._prev_scheduled_day(child.id, day)
        child.streak = child.streak + 1 if prev and child.last_full_day == prev else 1
        child.best_streak = max(child.best_streak, child.streak)
        child.last_full_day = today
        self._award_badge(child, "all_done", now)
        for n in (3, 7, 30):
            if child.streak >= n:
                self._award_badge(child, f"streak_{n}", now)
        self._emit("all_done", child_id=child.id, child=child.name, streak=child.streak)
        self._check_family_day(now)

    # ------------------------------------------------------------ family day
    def _members_with_chores(self, day: date) -> list[Child]:
        return [c for c in self.children.values() if self.chores_for(c.id, day)]

    def _day_complete(self, child_id: str, day: date) -> bool:
        chores = self.chores_for(child_id, day)
        return bool(chores) and all(self._entry(day, ch.id, child_id) for ch in chores)

    def _prev_family_day(self, day: date) -> str | None:
        for i in range(1, STREAK_LOOKBACK + 1):
            d = day - timedelta(days=i)
            if self._members_with_chores(d):
                return d.isoformat()
        return None

    def _check_family_day(self, now: datetime) -> None:
        """Everyone with chores today finished them all: a shared win, never a ranking."""
        day = now.date()
        members = self._members_with_chores(day)
        if len(members) < 2 or not all(self._day_complete(m.id, day) for m in members):
            return
        fam, today = self.family, day.isoformat()
        if fam["last_full_day"] == today:
            return
        fam["snapshot"] = {"day": today, "streak": fam["streak"], "best_streak": fam["best_streak"],
                           "last_full_day": fam["last_full_day"]}
        prev = self._prev_family_day(day)
        fam["streak"] = fam["streak"] + 1 if prev and fam["last_full_day"] == prev else 1
        fam["best_streak"] = max(fam["best_streak"], fam["streak"])
        fam["last_full_day"] = today
        for m in members:
            self._award_badge(m, "family_day", now)
        self._emit("family_all_done", streak=fam["streak"], members=[m.name for m in members])

    def _revert_family_day(self, day: str) -> None:
        fam = self.family
        snap = fam.get("snapshot")
        if fam["last_full_day"] != day or not snap or snap.get("day") != day:
            return
        fam.update(streak=snap["streak"], best_streak=snap["best_streak"],
                   last_full_day=snap["last_full_day"], snapshot=None)

    def family_streak(self, today: date) -> int:
        last = self.family["last_full_day"]
        if last and (last == today.isoformat() or last == self._prev_family_day(today)):
            return self.family["streak"]
        return 0

    def _prev_scheduled_day(self, child_id: str, day: date) -> str | None:
        """Most recent earlier day that had chores (days off don't break streaks)."""
        for i in range(1, STREAK_LOOKBACK + 1):
            d = day - timedelta(days=i)
            if self.chores_for(child_id, d):
                return d.isoformat()
        return None

    def _revert_full_day(self, child: Child, day: str) -> None:
        """Undo the streak bump if ``day`` is no longer complete."""
        snap = child.day_snapshot
        if child.last_full_day != day or not snap or snap.get("day") != day:
            return
        child.streak = snap["streak"]
        child.best_streak = snap["best_streak"]
        child.last_full_day = snap["last_full_day"]
        child.day_snapshot = None

    def current_streak(self, child: Child, today: date) -> int:
        """Streak as seen today: alive if the last full day is today or the previous chore day."""
        if child.last_full_day is None:
            return 0
        if child.last_full_day == today.isoformat():
            return child.streak
        if child.last_full_day == self._prev_scheduled_day(child.id, today):
            return child.streak
        return 0

    # ------------------------------------------------------------ kid actions
    def complete(self, chore_id: str, child_id: str, now: datetime) -> dict[str, Any]:
        child = self._child(child_id)
        chore = self.chores.get(chore_id)
        if chore is None:
            raise GameError("Aufgabe nicht gefunden")
        day = now.date()
        if chore not in self.chores_for(child_id, day):
            raise GameError("Diese Aufgabe ist heute nicht dran")
        if self._entry(day, chore_id, child_id) is not None:
            raise GameError("Schon erledigt")
        entry = {
            "id": new_id(),
            "chore_id": chore_id,
            "child_id": child_id,
            "stars": chore.stars,
            "status": "pending" if chore.needs_approval else "done",
            "at": now.isoformat(),
        }
        self._entries(day).append(entry)
        if not chore.needs_approval:
            self._award_badge(child, "first_chore", now)
        if chore.slot == "morning" and now.hour < 8:
            self._award_badge(child, "early_bird", now)
        if entry["status"] == "done":
            self._add_stars(child, chore.stars, now)
            self._quest_add(child, chore.stars, now)
        self._emit("chore_done", child_id=child.id, child=child.name, chore=chore.title,
                   stars=chore.stars, status=entry["status"])
        self._check_full_day(child, now)
        return entry

    def undo(self, chore_id: str, child_id: str, now: datetime) -> None:
        child = self._child(child_id)
        day = now.date()
        entry = self._entry(day, chore_id, child_id)
        if entry is None:
            raise GameError("Nichts zum Rückgängigmachen")
        if entry["status"] == "done" and child.stars < entry["stars"]:
            raise GameError("Die Sterne sind schon ausgegeben")
        self._entries(day).remove(entry)
        if entry["status"] == "done":
            self._add_stars(child, -entry["stars"], now)
            self._quest_add(child, -entry["stars"], now)
        self._revert_full_day(child, day.isoformat())
        self._revert_family_day(day.isoformat())

    # --------------------------------------------------------- parent actions
    def _find_entry(self, entry_id: str) -> tuple[str, dict[str, Any]]:
        for day, entries in self.log.items():
            for e in entries:
                if e["id"] == entry_id:
                    return day, e
        raise GameError("Eintrag nicht gefunden")

    def approve(self, entry_id: str, now: datetime) -> None:
        _, entry = self._find_entry(entry_id)
        if entry["status"] != "pending":
            raise GameError("Bereits bestätigt")
        child = self._child(entry["child_id"])
        entry["status"] = "done"
        self._award_badge(child, "first_chore", now)
        self._add_stars(child, entry["stars"], now)
        self._quest_add(child, entry["stars"], now)

    def reject(self, entry_id: str) -> None:
        day, entry = self._find_entry(entry_id)
        if entry["status"] != "pending":
            raise GameError("Nur offene Einträge können abgelehnt werden")
        self.log[day].remove(entry)
        child = self.children.get(entry["child_id"])
        if child:
            self._revert_full_day(child, day)
        self._revert_family_day(day)

    def pending(self) -> list[dict[str, Any]]:
        out = []
        for day, entries in sorted(self.log.items()):
            for e in entries:
                if e["status"] == "pending":
                    chore = self.chores.get(e["chore_id"])
                    child = self.children.get(e["child_id"])
                    out.append({
                        **e,
                        "day": day,
                        "chore": chore.title if chore else "?",
                        "icon": chore.icon if chore else "❔",
                        "child": child.name if child else "?",
                    })
        return out

    def adjust_stars(self, child_id: str, amount: int, now: datetime, reason: str = "") -> None:
        child = self._child(child_id)
        amount = int(amount)
        if abs(amount) > MAX_ADJUST:
            raise GameError(f"Höchstens {MAX_ADJUST} Sterne auf einmal")
        self._add_stars(child, amount, now)
        self._emit("stars_adjusted", child_id=child.id, child=child.name, amount=amount, reason=reason)

    def buy(self, reward_id: str, child_id: str, now: datetime) -> dict[str, Any]:
        child = self._child(child_id)
        reward = self.rewards.get(reward_id)
        if reward is None or not reward.active:
            raise GameError("Belohnung nicht verfügbar")
        if child.stars < reward.cost:
            raise GameError("Noch nicht genug Sterne")
        child.stars -= reward.cost
        purchase = {
            "id": new_id(),
            "reward_id": reward.id,
            "child_id": child.id,
            "title": reward.title,
            "icon": reward.icon,
            "cost": reward.cost,
            "at": now.isoformat(),
            "redeemed": False,
        }
        self.purchases.append(purchase)
        self.purchases = self.purchases[-200:]
        self._award_badge(child, "shopper", now)
        self._emit("reward_bought", child_id=child.id, child=child.name, reward=reward.title,
                   cost=reward.cost, script=reward.script, purchase_id=purchase["id"])
        return purchase

    def redeem(self, purchase_id: str) -> None:
        for p in self.purchases:
            if p["id"] == purchase_id:
                p["redeemed"] = True
                return
        raise GameError("Kauf nicht gefunden")

    # ----------------------------------------------------------------- admin
    def save_child(self, data: dict[str, Any]) -> Child:
        name = str(data.get("name", "")).strip()
        if not name:
            raise GameError("Name fehlt")
        name = name[:24]
        cid = data.get("id")
        child = self.children.get(cid) if cid else None
        if child is None:
            child = Child(id=new_id(), name=name)
            self.children[child.id] = child
        child.name = name
        if data.get("role") in ROLES:
            child.role = data["role"]
        if data.get("pet") in PETS:
            child.pet = data["pet"]
        if data.get("theme") in THEMES:
            child.theme = data["theme"]
        if "pet_name" in data:
            child.pet_name = str(data["pet_name"] or "").strip()[:20]
        return child

    def delete_child(self, child_id: str) -> None:
        self.children.pop(child_id, None)
        for chore in self.chores.values():
            if child_id in chore.children:
                chore.children.remove(child_id)

    def save_chore(self, data: dict[str, Any]) -> Chore:
        title = str(data.get("title", "")).strip()
        if not title:
            raise GameError("Titel fehlt")
        cid = data.get("id")
        existing = self.chores.get(cid) if cid else None
        base = existing or Chore(id=new_id(), title=title)
        try:
            values = {
                "title": title[:40],
                "icon": str(data.get("icon") or base.icon)[:8],
                "stars": max(1, min(5, int(data.get("stars", base.stars)))),
                "days": sorted({int(d) for d in data.get("days", base.days) if 0 <= int(d) <= 6}),
                "slot": data["slot"] if data.get("slot") in TIME_SLOTS else base.slot,
                "children": [c for c in data.get("children", base.children) if c in self.children],
                "needs_approval": bool(data.get("needs_approval", base.needs_approval)),
                "active": bool(data.get("active", base.active)),
            }
        except (TypeError, ValueError) as err:
            raise GameError("Ungültige Eingabe") from err
        for key, value in values.items():
            setattr(base, key, value)
        self.chores[base.id] = base
        return base

    def delete_chore(self, chore_id: str) -> None:
        self.chores.pop(chore_id, None)

    def save_reward(self, data: dict[str, Any]) -> Reward:
        title = str(data.get("title", "")).strip()
        if not title:
            raise GameError("Titel fehlt")
        rid = data.get("id")
        existing = self.rewards.get(rid) if rid else None
        base = existing or Reward(id=new_id(), title=title)
        script = data.get("script", base.script)
        try:
            values = {
                "title": title[:40],
                "icon": str(data.get("icon") or base.icon)[:8],
                "cost": max(1, min(9999, int(data.get("cost", base.cost)))),
                "script": script if script and SCRIPT_RE.match(str(script)) else None,
                "active": bool(data.get("active", base.active)),
            }
        except (TypeError, ValueError) as err:
            raise GameError("Ungültige Eingabe") from err
        for key, value in values.items():
            setattr(base, key, value)
        self.rewards[base.id] = base
        return base

    def reward_script(self, reward_id: str) -> str | None:
        """Return the script a reward starts, for the PIN-gated parents' editor.

        `view()` withholds this value, so the editor has to ask for it explicitly.
        """
        reward = self.rewards.get(reward_id)
        return reward.script if reward else None

    def delete_reward(self, reward_id: str) -> None:
        self.rewards.pop(reward_id, None)

    def set_quest(self, data: dict[str, Any]) -> None:
        try:
            goal = min(100000, int(data.get("goal", 0)))
        except (TypeError, ValueError) as err:
            raise GameError("Ungültiges Ziel") from err
        self.quest = Quest(
            title=str(data.get("title", "")).strip()[:40],
            icon=str(data.get("icon") or "🚀")[:8],
            goal=max(0, goal),
            reward=str(data.get("reward", "")).strip(),
        )

    def set_voice(self, data: dict[str, Any]) -> None:
        engine = str(data.get("engine") or "").strip()
        if engine and not re.match(r"^tts\.[a-z0-9_]+$|^[a-z0-9_]+$", engine):
            raise GameError("Ungültige Sprachausgabe")
        self.voice = {
            "engine": engine,
            "voice": str(data.get("voice") or "").strip()[:80],
            "language": str(data.get("language") or "").strip()[:12],
        }

    def check_pin(self, pin: str | None) -> bool:
        return not self.pin or pin_matches(pin, self.pin)

    def set_pin(self, pin: str | None) -> None:
        """Set or clear the PIN. Hashes synchronously; see `set_pin_hash` for the async path."""
        pin = validate_pin(pin)
        self.pin = encode_pin(pin) if pin else None

    def set_pin_hash(self, encoded: str | None) -> None:
        """Store a PIN already hashed by `encode_pin` (computed off the event loop)."""
        self.pin = encoded

    def prune(self, today: date) -> None:
        cutoff = (today - timedelta(days=HISTORY_DAYS)).isoformat()
        self.log = {d: e for d, e in self.log.items() if d >= cutoff and e}

    # ------------------------------------------------------------------ view
    def view(self, now: datetime) -> dict[str, Any]:
        """Everything the card needs, computed for ``now``."""
        today = now.date()
        children = []
        for child in self.children.values():
            tasks = []
            for chore in self.chores_for(child.id, today):
                entry = self._entry(today, chore.id, child.id)
                tasks.append({
                    "id": chore.id,
                    "title": chore.title,
                    "icon": chore.icon,
                    "stars": chore.stars,
                    "slot": chore.slot,
                    "status": entry["status"] if entry else "open",
                })
            total = len(tasks)
            done = sum(1 for t in tasks if t["status"] != "open")
            level = level_for_xp(child.xp)
            lo, hi = xp_for_level(level), xp_for_level(level + 1)
            if now.hour < 7:
                mood = "sleepy"
            elif total == 0 or done == total:
                mood = "party" if total else "happy"
            elif done == 0:
                mood = "hungry"
            elif done * 2 >= total:
                mood = "happy"
            else:
                mood = "ok"
            children.append({
                "id": child.id,
                "name": child.name,
                "role": child.role,
                "pet": child.pet,
                "pet_name": child.pet_name,
                "theme": child.theme,
                "stars": child.stars,
                "lifetime_stars": child.lifetime_stars,
                "xp": child.xp,
                "level": level,
                "level_progress": round((child.xp - lo) / (hi - lo), 3),
                "stage": pet_stage(level),
                "streak": self.current_streak(child, today),
                "best_streak": child.best_streak,
                "badges": child.badges,
                "mood": mood,
                "done": done,
                "total": total,
                "tasks": tasks,
            })
        # parents after kids, otherwise alphabetical; no ordering by score anywhere
        children.sort(key=lambda c: (c["role"] == "parent", c["name"].lower()))
        today_entries = self.log.get(today.isoformat(), [])
        feed = [
            {"child_id": e["child_id"], "icon": self.chores[e["chore_id"]].icon,
             "title": self.chores[e["chore_id"]].title, "at": e["at"], "status": e["status"]}
            for e in sorted(today_entries, key=lambda e: e["at"], reverse=True)
            if e["chore_id"] in self.chores and e["child_id"] in self.children
        ][:24]
        family = {
            "streak": self.family_streak(today),
            "best_streak": self.family["best_streak"],
            "done_today": all(c["done"] == c["total"] for c in children if c["total"]) and sum(1 for c in children if c["total"]) >= 2,
            "stars_today": sum(e["stars"] for e in today_entries if e["status"] == "done"),
            "tasks_today": len(today_entries),
            "feed": feed,
        }
        return {
            "today": today.isoformat(),
            "children": children,
            "chores": [vars(c) | {} for c in self.chores.values()],
            # `script` is withheld: the subscription is open to every authenticated
            # account, and the reward-to-script map is the sensitive part of it. The
            # parents' editor reads the value back through the PIN-gated
            # `reward_script` action instead.
            "rewards": [
                vars(r) | {"script": None, "has_script": bool(r.script)}
                for r in self.rewards.values()
            ],
            "quest": vars(self.quest) | {},
            "pending": self.pending(),
            "purchases": [p for p in self.purchases if not p["redeemed"]][-50:],
            "badges": {k: {"icon": v[0], "label": v[1]} for k, v in BADGES.items()},
            "pin_set": bool(self.pin),
            "voice": self.voice,
            "family": family,
        }
