# Rebel Comic / Issue 07

An original manga-inspired GitHub profile: acid yellow, ivory, black ink, halftone patterns, speed lines, a hand-built skyline and angular panels. No external image services, runtime JavaScript, or API keys are needed to display it.

## Display and animation

The README embeds committed PNG panels and an animated GIF. Raster output preserves the typography reliably in GitHub's image renderer. Every panel also has an editable SVG source. Project cards and the three contact tiles are separate links; apparent buttons inside the artwork are part of each linked image.

The hero has a 6.16-second loop: a left-to-right ink-style title reveal, a brief small title impact, then a long settled hold with two small cursor glints. The rest of the profile stays still. The hero is not interactive and GitHub offers no custom pause controls for the GIF. A still-image link and a plain-text profile are included. There are no strobe or full-screen flash frames.

## Rebuild

Requirements: Node.js 20 or newer, Python 3.10 or newer, and the fonts listed below.

```sh
npm ci
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
npm run build
npm run validate
```

The build uses Impact, Arial Bold, Arial Bold Italic and Courier New Bold. On macOS it reads them from `/System/Library/Fonts/Supplemental`. On other systems, set `PROFILE_FONT_DIR` to a directory containing `Impact.ttf`, `Arial Bold.ttf`, `Arial Bold Italic.ttf` and `Courier New Bold.ttf`. Fonts are not redistributed in this repository. The committed PNGs and GIF work without installing fonts.

Edit copy, colors, typography, projects and layout in `scripts/build-profile.mjs`. The README's image alt text and plain-text section should be updated alongside any copy changes. GIF encoding is in `scripts/animate-hero.py`. Temporary frames live in `.build/` and are ignored by Git.

Previously published terminal assets remain in `assets/` for history, but are no longer referenced by the README. No numerical GitHub statistics are baked into the new artwork, so the profile does not display stale counts.
