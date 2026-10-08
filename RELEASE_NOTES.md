# Helferhelden 0.1.0

First public release.

A chore game for kids in Home Assistant, built for children who cannot read yet and for a
shared wall tablet. Every family member has a pet in their own world. Chores appear as large
picture stickers, a tap reads them out loud, the green check mark completes them. That earns
stars, experience and levels, and the pet grows along.

The integration has been running in one household for a while. It is published here as 0.1.0
because this is the first time anyone else can install it, not because it is unfinished —
expect the rough edges of software that has had exactly one set of users so far.

## Requirements

Home Assistant 2024.7 or newer. Nothing else: the integration declares no third-party Python
requirements and bundles no JavaScript library.

## Installation

In HACS, add this repository as a custom repository of type *Integration*, install it, restart
Home Assistant, then add the integration under **Settings → Devices & Services**. The card is
loaded automatically — no dashboard resource to register.

A panel view works best, so the card fills the screen:

```yaml
views:
  - title: Helferhelden
    type: panel
    cards:
      - type: custom:helferhelden-card
```

## What it does

**For the children.** A pet with a mood that grows with the level. Chores as pictures, grouped
into morning, daytime and evening, read out loud via any text-to-speech engine Home Assistant
offers. Stars as the currency for a reward shop, 14 collectible badges, and a streak counter
for consecutive days — days without chores do not break it.

**Parents play along, as a team.** Parents get their own chores, pet and world. The start
screen shows what the whole family achieved today, as pictures. There is no leaderboard and no
comparing of scores. A shared family quest collects stars from everyone towards one goal, for
example a trip to the zoo.

**For the parents.** Behind a padlock, optionally a PIN: approve or reject chores, redeem
bought rewards, adjust stars by hand, and manage children, chores, rewards and quests. A reward
can start a Home Assistant script — "TV on for 30 minutes", for instance.

**For automations.** One sensor per child with stars, level, streak and open chores, one sensor
for everything waiting on a parent, seven events, and two services so a chore can be ticked off
by an NFC tag or a button.

**Local by default.** The integration makes no outbound request of its own, and the fonts ship
with it. The one thing that can leave your network is speech, and only if you pick a cloud
engine for it in Home Assistant. Piper keeps it local.

**German and English.** The card follows your Home Assistant language: German for `de*`,
English otherwise.

## Before you install, two things worth knowing

The full picture is in the README under **Permissions and privacy**. The short version:

**This is a shared-tablet app, not a multi-user system.** Completing a chore, undoing one and
buying a reward are not tied to a Home Assistant account — anyone at the tablet can act for any
child. That is deliberate. The card's `child` option filters what is shown; it is not an access
control.

**The parents' PIN protects the card's parents' area, nothing else.** The two services bypass
it by design, because automations need them. Every Home Assistant account with dashboard access
can see the family data. If that matters in your household, restrict service and dashboard
access in Home Assistant itself.

## Known limitations

- The interface speaks German and English only.
- Entity ids are German (`sensor.helferhelden_<name>_sterne`). They stay that way: renaming
  them would break every automation already using them.
- Not in the HACS default store yet — it installs as a custom repository.
- The card is built for a tablet in landscape. It works on a phone, but it was not designed for
  one.

## Feedback

Bug reports and ideas are welcome in the issue tracker. If something is unclear in the setup,
that is a bug in the documentation and worth reporting too.

## License

MIT. The bundled fonts, Baloo 2 and Nunito, are under the SIL Open Font License and keep their
own license.
