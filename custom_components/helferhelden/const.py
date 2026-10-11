"""Constants for Helferhelden."""

DOMAIN = "helferhelden"
VERSION = "0.1.1"
STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
CARD_URL = f"/{DOMAIN}/helferhelden-card.js"
# Home Assistant ships two frontend builds and picks one by user agent. The legacy
# build loads extra JavaScript as a classic script, not as a module, and gets this
# transpiled copy. Generated from helferhelden-card.js by scripts/build-card-es5.sh,
# which ships alongside it: `scripts/build-card-es5.sh --check` rebuilds and compares.
CARD_ES5_URL = f"/{DOMAIN}/helferhelden-card.es5.js"
FONTS_URL = f"/{DOMAIN}/fonts"
SIGNAL_UPDATE = f"{DOMAIN}_update"
EVENT_PREFIX = DOMAIN
