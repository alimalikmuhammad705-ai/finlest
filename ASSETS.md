# Asset sources & licences

## Video

| File | Source | Licence |
|---|---|---|
| `public/videos/ship-scroll-desktop.mp4`, `public/videos/ship-scroll-mobile.mp4` (and derived posters `public/images/ship-poster-*.jpg`, `public/images/og.jpg`) | Pexels video **2943126** — "Aerial footage of a cargo ship at sea loaded with containers" — https://www.pexels.com/video/aerial-footage-of-a-cargo-ship-at-sea-loaded-with-containers-2943126/ (downloaded 2026-10-11 via `https://www.pexels.com/download/video/2943126/`, 1920×1080 rendition) | [Pexels License](https://www.pexels.com/license/) |
| Final ~10 s of both scroll videos, `public/images/port-still.jpg` | Pexels video **35562081** — "Container ships and cranes at Hamburg harbor" — https://www.pexels.com/video/container-ships-and-cranes-at-hamburg-harbor-35562081/ (downloaded 2026-10-11) | [Pexels License](https://www.pexels.com/license/) |

**Pexels License summary** (re-read the official page before launch — terms can change): free to use for commercial and non-commercial purposes; attribution not required but appreciated; you may modify the footage. You may not sell unaltered copies, imply endorsement by people or brands shown, or redistribute the footage on other stock platforms.

> ⚠️ The Pexels pages returned bot-protection (HTTP 403) to automated fetching during the build, so the licence for these exact items should be **manually re-confirmed on each video page** before launch.

### Notes / caveats
- The footage is **generic stock**: the port clip was filmed in **Hamburg**, not Karachi. The site labels the hero "Illustrative footage" and never presents it as Karachi Port or Port Qasim.
- Third-party shipping-line branding (e.g. MSC, Evergreen, COSCO) is visible in the footage. Its use does not imply any relationship or endorsement. If you'd prefer to avoid this, swap in unbranded footage, e.g. a custom render (see README).

### Processing
Both renditions were produced with ffmpeg (via the `ffmpeg-static` npm package):
- Ship clip trimmed to 24 s, 1.5 s crossfade into the port clip → ~33 s total, 24 fps.
- Colour grade: slightly darker, desaturated, cooler.
- H.264, no audio, **keyframe every 12 frames** (`-g 12 -sc_threshold 0`) so scroll seeking stays responsive, `+faststart`.
- Desktop 1280×720; mobile is a 9:16 portrait crop (540×960) framed on the vessel.

## Fonts
Inter, Inter Tight, Instrument Serif, JetBrains Mono — Google Fonts via `next/font` (SIL Open Font License), self-hosted at build time.

## Icons
[lucide-react](https://lucide.dev) — ISC licence.
