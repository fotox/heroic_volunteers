# Changelog

All notable changes to Helferhelden are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[semantic versioning](https://semver.org/).

## [0.1.1] — 2026-10-11

A compatibility release. Nothing in the game changed; the card now works on the older
tablets that households actually mount on the wall.

### Added

- **Transpiled card for the legacy frontend build.** Home Assistant ships two frontend
  builds and picks one from the browser's user agent. Anything below Chrome or Android
  WebView 130 gets the legacy build, which loads custom cards as classic scripts rather
  than as modules — that branch stayed empty and the tablet reported
  `Custom element doesn't exist: helferhelden-card`. The card is now registered for both
  builds: `helferhelden-card.es5.js` ships alongside the module and is served under its own
  static path. A browser only ever runs one of the two, and the card guards its own
  `customElements.define` in case it ever runs both.
- **README section "Older tablets"** — which build a device gets, what to do when the card
  stays missing, and where the usable floor is (around Chrome 84, below which the gap
  between the chore stickers collapses; `gap` in flex containers arrived in 84 and no build
  step can supply it).
- **Brand assets** under `custom_components/helferhelden/brand/` — icon and logo, each as
  1x and 2x PNG. Home Assistant 2026.3 and newer read brand images from there and prefer
  them over the ones in the `home-assistant/brands` repository; older versions ignore the
  folder. HACS still shows its own placeholder, so the icon appears under
  **Settings → Devices & Services** rather than in the HACS list.
- **Build script and CI check for the generated card.** `scripts/build-card-es5.sh`
  rebuilds `helferhelden-card.es5.js` from its source with a pinned esbuild;
  `--check` rebuilds and compares byte for byte. The workflow
  `.github/workflows/verify-card.yml` runs that check on every push and pull request
  and parses both card files, so the generated copy cannot fall behind the source it
  claims to be built from — it would keep working on modern browsers and quietly rot
  on the old tablets it exists for.
- **This changelog**, linked from the README.

### Changed

- **Stacked layout for portrait screens no longer depends on `@container`.** The query
  needs Chrome 105; below that the whole block was skipped and a tablet in portrait got
  the wide two-column layout. The breakpoint now lives in `_watchWidth()`: a
  `ResizeObserver` measures the same box the query did — the card, not the viewport — and
  toggles `.root.narrow`, which works from Chrome 64. Without `ResizeObserver` the window
  resize event takes over.
- **CSS fallbacks reaching back to Chrome 61** for everything the card relied on:
  - `inset` shorthand (Chrome 87) spelled out as `top`/`right`/`bottom`/`left`
  - `min()` and `clamp()` font and box sizes preceded by a plain value
  - `aspect-ratio` (Chrome 88) replaced by an explicit height on the pet nest, and covered
    by `@supports not (aspect-ratio: 1 / 1)` on the badge slots
  - `container-type: inline-size` (Chrome 105) replaced by `contain: layout`, which makes
    the card the containing block for the fixed parents' button from Chrome 52 on
  - `:focus-visible` (Chrome 86) preceded by a plain `:focus` ring, so keyboard focus stays
    visible on older browsers
- **`Object.fromEntries` replaced by `reduce`** when indexing the children — it needs
  Chrome 73 and the build adds no polyfill.
- **Version numbering consolidated.** Integration manifest, `const.py` and the card now
  carry the same number. The internal 1.3.x line from before the first public release is
  gone.

### Removed

- `RELEASE_NOTES.md`. It covered a single release; this changelog replaces it and
  carries its content forward under 0.1.0.

## [0.1.0] — 2026-10-08

First public release.

A chore game for kids in Home Assistant, built for children who cannot read yet and for a
shared wall tablet. Every family member has a pet in their own world. Chores appear as large
picture stickers, a tap reads them out loud, the green check mark completes them. That earns
stars, experience and levels, and the pet grows along.

The integration had been running in one household for a while. It is published as 0.1.0
because this is the first time anyone else can install it, not because it is unfinished.

### Added

- **For the children.** A pet with a mood that grows with the level. Chores as pictures,
  grouped into morning, daytime and evening, read out loud via any text-to-speech engine
  Home Assistant offers. Stars as the currency for a reward shop, 14 collectible badges, and
  a streak counter for consecutive days — days without chores do not break it.
- **Parents play along, as a team.** Parents get their own chores, pet and world. The start
  screen shows what the whole family achieved today, as pictures. No leaderboard, no
  comparing of scores. A shared family quest collects stars from everyone towards one goal.
- **Parents' area.** Behind a padlock, optionally a PIN: approve or reject chores, redeem
  bought rewards, adjust stars by hand, and manage children, chores, rewards and quests. A
  reward can start a Home Assistant script.
- **For automations.** One sensor per child with stars, level, streak and open chores, one
  sensor for everything waiting on a parent, seven events, and two services so a chore can
  be ticked off by an NFC tag or a button.
- **Local by default.** The integration makes no outbound request of its own, and the fonts
  (Baloo 2 and Nunito, SIL Open Font License) ship with it. The one thing that can leave the
  network is speech, and only with a cloud engine picked in Home Assistant.
- **German and English.** The card follows the Home Assistant language: German for `de*`,
  English otherwise.
- The PIN is stored as a salted PBKDF2-SHA256 hash; a plain-text PIN from an earlier
  installation is converted on the first start.

### Known limitations

- The interface speaks German and English only.
- Entity ids are German (`sensor.helferhelden_<name>_sterne`) and stay that way — renaming
  them would break every automation already using them.
- Not in the HACS default store; it installs as a custom repository.
- Built for a tablet in landscape. It works on a phone, but it was not designed for one.
- A shared-tablet app, not a multi-user system: completing a chore, undoing one and buying a
  reward are not tied to a Home Assistant account. The card's `child` option filters what is
  shown; it is not an access control.

[0.1.1]: https://github.com/fotox/heroic_volunteers/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/fotox/heroic_volunteers/releases/tag/0.1.0
