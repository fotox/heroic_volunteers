# Helferhelden

A chore game for kids in Home Assistant. Built for children who cannot read yet, and for a shared wall tablet.

Every child has a pet in their own world (space, jungle, ocean, dinos, fairy forest). Chores appear as large picture stickers, grouped into morning, daytime and evening. A tap reads the chore out loud, the green check mark completes it. That earns stars, experience and levels; the pet grows along, celebrates, and asks via a speech bubble for the next chore.

The interface follows your Home Assistant language: German for `de*`, English for everything
else. Documentation, code and log messages are English.

<!-- Screenshots go here: start screen, a child's world, the parents' area.
     Take them on the target device so the emoji match what users will see. -->

## What's inside

**For the kids**
- A pet with a mood that grows with the level (sparkles from level 6, a crown from level 10)
- Chores as pictures, read aloud via text-to-speech, sounds and confetti
- Stars as the currency for the reward shop; when stars are short, a bar shows how many are missing
- 14 collectible badges (the ones not yet earned appear as a mysterious silhouette)
- Streak: consecutive days on which everything was done (chore-free days do not break it)
- Family quest: a shared star goal across all children, for example "a trip to the zoo"

**Parents play along, as a team**
- Parents get their own chores, their own pet and their own world
- On the start screen the children see, as pictures, what the whole family achieved today. There is no leaderboard and no comparing of scores
- Parent stars count towards the family quest
- Once everyone has finished their chores, the whole family celebrates ("Familien-Tag geschafft!"), with its own family streak
- Parents complete their chores by holding the check mark for a second, so a child cannot tick them off by accident

**For the parents** (hold the padlock at the bottom right, optionally with a PIN)
- Approve or reject chores, mark bought rewards as redeemed, adjust stars by hand
- Manage children, chores (picture, stars, time of day, weekdays, who for, with or without approval), rewards and quests
- A reward can start a Home Assistant script (for example "TV on for 30 minutes")

**For automations**
- One sensor per child (`sensor.helferhelden_<name>_sterne`) with level, streak and open chores
- `sensor.helferhelden_offene_bestatigungen` for everything waiting on a parent
- Events: `helferhelden_chore_done`, `helferhelden_all_done`, `helferhelden_family_all_done`, `helferhelden_level_up`, `helferhelden_badge`, `helferhelden_reward_bought`, `helferhelden_quest_complete`
- Services: `helferhelden.complete_chore` (for example from an NFC tag), `helferhelden.add_stars`

Entity ids are German because the entity names are. Renaming them would break existing automations, so they stay as they are.

The integration makes no outbound requests of its own: no cloud, no telemetry, and the fonts ship with it. Text-to-speech is the one thing that can leave your network, and only if you pick a cloud engine for it — see [Voice](#voice).

## Installation

Requires Home Assistant 2024.7 or newer.

**Via HACS:** add this repository as a custom repository of type *Integration*, then install it.

**By hand:**
1. Copy the folder `custom_components/helferhelden` to `/config/custom_components/helferhelden`, for example with the Samba or SSH add-on.
2. Restart Home Assistant.
3. **Settings → Devices & Services → Add integration → Helferhelden**.

The card is loaded by the integration automatically. You do not need to register a dashboard resource.

## Dashboard for the hallway tablet

A dedicated dashboard with a **panel view** works best, so the card fills the whole screen:

```yaml
views:
  - title: Helferhelden
    type: panel
    cards:
      - type: custom:helferhelden-card
```

Card options:

| Option | Default | Meaning |
|---|---|---|
| `child` | – | A child's name: the card shows only that child (for their own tablet) |
| `idle` | `90` | Return to the child picker after this many seconds without a touch; the parents' area locks itself. `0` turns it off |
| `sound` | `true` | Sounds |
| `speech` | `true` | Reading out loud |
| `height` | `calc(100vh - 64px)` | Height of the card; in a sections view use something like `700px` |

Tips for a wall tablet: Fully Kiosk Browser in kiosk mode, screen timeout off, and allow automatic media playback under "Web Content Settings".

## Voice

The card reads chores out loud and praises with varying sentences and the child's name. It sounds best with a text-to-speech engine from Home Assistant:

- **Piper** (free, local, add-on): German voices such as `thorsten`, `kerstin`, `eva_k` or `ramona`. Runs entirely on your own hardware, so the text never leaves your network. The recommended choice.
- **Home Assistant Cloud** (subscription): 15 German neural voices, for example Katja, Amala, Louisa, or the child voice Gisela.
- Any other engine you have installed. The card lists every `tts.*` entity Home Assistant knows, so nothing needs to be configured here.

Pick one in the parents' area under **Settings → Choose a voice**, with a preview button. Home Assistant caches every sentence after the first time; when a child is opened the card preloads their sentences so they play without delay. If no engine is set up or it cannot be reached, the card falls back to the tablet's best German voice.

Note that a cloud engine sends the text to be spoken — chore titles and your children's names — to that provider. Piper does not.

## First steps

1. Hold the padlock at the bottom right for a second.
2. Under **Settings**, set a PIN. Without a PIN the parents' area is restricted to Home Assistant administrators.
3. Under **Family**, create each child and let them pick a pet and a world. Anyone who wants to join adds themselves as a parent.
4. Under **Settings**, choose the voice.
5. Under **Chores**, create three to six chores per child. Short titles, unmistakable pictures.
6. Under **Rewards**, create two cheap rewards (3–5 stars) and one larger one. Quick first wins motivate most.
7. Optionally start a **quest**.

## Automation examples

Flash a light green briefly when a child has finished everything:

```yaml
automation:
  - alias: Helferhelden – all done
    triggers:
      - trigger: event
        event_type: helferhelden_all_done
    actions:
      - action: light.turn_on
        target: { entity_id: light.hallway }
        data: { flash: short, color_name: green }
```

Notify a parent when something needs approval:

```yaml
automation:
  - alias: Helferhelden – approval needed
    triggers:
      - trigger: state
        entity_id: sensor.helferhelden_offene_bestatigungen
    conditions:
      - condition: template
        value_template: "{{ trigger.to_state.state | int(0) > trigger.from_state.state | int(0) }}"
    actions:
      - action: notify.mobile_app_your_phone
        data:
          title: Helferhelden
          message: "{{ state_attr('sensor.helferhelden_offene_bestatigungen', 'approvals') | join(', ') }}"
```

An NFC tag on the dishwasher:

```yaml
automation:
  - alias: Helferhelden – dishwasher emptied
    triggers:
      - trigger: tag
        tag_id: dishwasher
    actions:
      - action: helferhelden.complete_chore
        data: { child: Mia, chore: Empty the dishwasher }
```

A reward script (it receives `child` and `reward` as variables):

```yaml
script:
  tv_30_min:
    alias: TV for 30 minutes
    sequence:
      - action: media_player.turn_on
        target: { entity_id: media_player.living_room_tv }
      - delay: "00:30:00"
      - action: media_player.turn_off
        target: { entity_id: media_player.living_room_tv }
```

A reward script only runs if the account that bought the reward is allowed to control that script. A read-only account cannot trigger one.

## Game rules in detail

- One star gives 10 experience points. Level 2 at 50, level 3 at 150, level 5 at 500, level 10 at 2250 points.
- Chores that need approval count towards the daily streak immediately, but the stars arrive only after approval. Rejecting removes the day from the streak again.
- Children can undo a completed chore on the same day (long-press the sticker), but only while the stars have not been spent yet.
- History is kept for 60 days. Data lives in `/config/.storage/helferhelden`.

## Permissions and privacy

Helferhelden relies on Home Assistant for authentication. Within that, it separates parents from children with its own PIN. Both layers matter, and they protect different things.

**The PIN protects the parents' area of the card — nothing else.** Privileged actions over the card's connection (managing children, chores and rewards, approving, adjusting stars, setting the PIN) require it. As long as no PIN is set, only Home Assistant administrators may use them; once a PIN is set, any account with the PIN may. This keeps a shared wall tablet on a non-admin account usable. Setting the first PIN therefore requires an administrator.

**Children's actions are open to every signed-in account, for every child.** Completing a chore, undoing one and buying a reward are not tied to a particular Home Assistant account: anyone at the tablet can act for any child. This is deliberate for the shared family tablet this card is built for. Helferhelden is not a multi-user system in which a child can only operate their own profile. The `child` option of the card only filters what is shown; it is not an access control.

**The services bypass the PIN.** `helferhelden.complete_chore` and `helferhelden.add_stars` exist for automations (an NFC tag, a button). Any automation, script or account allowed to call Home Assistant services can use them, PIN or not. `add_stars` accepts up to ±1000 stars per call. If that matters in your household, restrict who may edit automations and call services in Home Assistant itself.

**Reward scripts run with the rights of the account that bought the reward.** A purchase only starts the reward's script if that Home Assistant account may control the script entity; the normal card view never reveals which script a reward starts.

**What every signed-in account can see.** The card shows children's names, pets, chores, stars, levels, streaks and purchases. Every Home Assistant account with access to the dashboard can see them. Data stays local in `/config/.storage/helferhelden`, and the integration itself talks to no external service. If you pick a cloud speech engine under **Voice**, the sentences the card reads out are sent to that service by Home Assistant. Chore history is kept for 60 days, the purchase list for the last 200 entries.

**The PIN is stored as a salted hash** (PBKDF2-SHA256), not in plain text. A PIN from an older version is converted on the first start. With only 4–8 digits the hash slows down guessing from a copied storage file rather than preventing it, so treat access to `/config` as access to everything.

**Wrong PINs.** After five wrong attempts an account is locked for 60 seconds. The count is kept per Home Assistant account, so on a shared tablet everyone using it shares one count.

**Forgotten PIN.** There is no reset in the card, and administrators need the PIN too once it is set. Stop Home Assistant, set `"pin": null` in `/config/.storage/helferhelden`, and start it again; then set a new PIN as an administrator.

## Development

```bash
pip install pytest-homeassistant-custom-component home-assistant-frontend
pytest            # game rules and integration against a real Home Assistant
```

Coverage is enforced at 80 %. CI additionally runs `ruff`, `hassfest` and the HACS validation.

### Release handover

`python3 .claude/release-export.py` copies the publishable payload — the integration,
`hacs.json`, `README.md` and `LICENSE` — into `../ha_heroic_volunteers`, leaving behind the
workflow files, hooks, tests, demo harness and every local cache. The payload is an allowlist,
so a file added to the repository later stays out of a release until it is named there.

The script refuses to delete anything in the target it did not put there, leaves a `.git`
directory in the target alone, and verifies the result: no excluded directory, no cache, valid
HACS metadata, a version matching the source, and every relative README link resolving. Use
`--dry-run` to see the plan first.

### Secret scanning

CI scans every push and pull request for credentials with
[gitleaks](https://github.com/gitleaks/gitleaks), over the full history and the working tree.
The same check runs locally as a pre-commit hook; enable it once per clone:

```bash
brew install gitleaks          # or see the gitleaks releases page
git config core.hooksPath .githooks
```

Without gitleaks installed the hook skips the scan and says so — CI still catches it, so
nothing reaches the remote unchecked.

`node tests/check_card.mjs` evaluates the card with DOM stubs and verifies the translation
layer: that every `tr("…")` has an English entry, that German output is unchanged, that the
backend's German messages are all translatable, and that the version in `manifest.json`,
`const.py` and the card agree.

`demo/index.html` opens the card with a simulated Home Assistant in the browser — no Home
Assistant needed. Append `?lang=en` to see the English wording.

### Adding a language

The card uses the German source string as its lookup key, so `tr()` returns its argument
unchanged for German. To add a language, copy the `EN` table in `helferhelden-card.js`, translate
the values and extend `setLang`. A key missing from a table falls back to German rather than
rendering empty.

Fonts: Baloo 2 and Nunito, SIL Open Font License (see `frontend/fonts`).

## License

MIT, see [`LICENSE`](LICENSE).

The integration declares no third-party Python requirements and bundles no JavaScript library,
so installing it pulls in nothing beyond Home Assistant itself. The only third-party components
are two fonts, shipped so that the card needs no connection to Google Fonts:

| Component | License | Copyright |
|---|---|---|
| [Baloo 2](https://github.com/EkType/Baloo2) 1.700 | SIL Open Font License 1.1 | 2019 The Baloo 2 Project Authors |
| [Nunito](https://github.com/googlefonts/nunito) 3.602 | SIL Open Font License 1.1 | 2014 The Nunito Project Authors |

Both licenses travel with the fonts in `custom_components/helferhelden/frontend/fonts/`, as the
OFL requires. Neither declares a Reserved Font Name, and both permit unrestricted embedding.

Emoji are plain Unicode characters; they are drawn with whatever emoji font the viewing device
provides, and none is bundled here.
