# Neon Coast Cover Studio

An original, offline photo-to-poster studio with neon nights and cinematic coastal energy. Created for [Make GTA 6 Cover Art](https://make.fun/bounty/gta6-cover-art-01), using original lettering and the supplied make.fun sample photos. No commercial game assets or fonts.

[![make.fun · gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/0xjouje-ai/gta6-cover-art-01-entry/rank.svg)](https://make.fun/bounty/gta6-cover-art-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/0xjouje-ai/gta6-cover-art-01-entry/reward.svg)](https://make.fun/bounty/gta6-cover-art-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-cover-art-01)

- Four compositions: hero with three panels, grid, full-bleed with a strip, and tilted snapshots.
- Four independently replaceable photos, local file loading, fill-all, drag-to-pan, zoom and crop reset.
- Live title and neon subtitle, four color grades, deterministic grain, vignette and poster frame.
- PNG downloads at 1080 × 1080, 1080 × 1350 and 1920 × 1080.
- Private by design: static canvas 2D, system fonts, no uploads, dependencies or runtime network services.

Run `node serve.ts`, then open http://localhost:8080. Choose a panel, replace its photo, set your title and export. The two bundled samples load automatically.

The source is split by responsibility under `app/src/`. Preview and PNG output share the same renderer. `?shot=cover`, `?shot=editor`, `?shot=cover-tall` and `?shot=cover-wide` provide deterministic capture scenes. Cover scenes show an actual PNG at its native intrinsic resolution, fitted to the viewport.

Package with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`. This copies the app and four screenshots and creates the make.fun dossier. It fails if screenshots are absent or exceed the supplied gate limits.
