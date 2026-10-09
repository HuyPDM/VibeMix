# Chrome Web Store listing: Music Box

Copy each block into the matching field of the Chrome Web Store developer dashboard.
If you rename the product (e.g. to **VibeMix**), replace "Music Box" everywhere below, in
`public/manifest.json`, and re-run `node store-assets/render.mjs --name "VibeMix"`.

---

## Package

| Field | Value |
| --- | --- |
| Upload | `music-box-<version>.zip`: the **contents** of `dist/` (`cd dist && zip -r ../music-box-0.1.0.zip .`) |
| Version | from `public/manifest.json` (currently `0.1.0`) |
| Permissions | `storage` only |

---

## Store listing tab

**Item name** (from the manifest, max 75 chars)
```
Music Box: Loop Studio
```

**Summary / short description** (from the manifest, max 132 chars)
```
Make music by filtering, previewing and layering original beat loops in a 16-step sequencer.
```

**Description**
```
Pick a vibe. Build your beat.

Music Box is a pocket loop studio for your browser. Choose a genre and mood, find sounds that fit, and layer drums, bass, chords and melody into a beat that loops in perfect time. No music theory needed.

FIND SOUNDS THAT FIT
• 103 original loops across 7 genres: lo-fi, hip-hop, EDM, house, jazz, ambient and pop
• Filter by genre, mood, sound type, tempo and key
• Search the library by name or tag
• "Great fit" badges tell you which sounds match your song's tempo and key, and explain why

LISTEN, THEN ADD
• Preview any loop with one click. While your song plays, the preview joins in time and in key
• Match key automatically shifts melodic loops so everything sounds right together
• The first sound you add sets the tempo for you

MIX IT YOUR WAY
• Up to 8 tracks on a 16-step sequencer with a live playhead
• Switch steps on and off, mute, solo, adjust the volume and reorder tracks
• Change the tempo from 50 to 180 BPM while the beat keeps playing
• Gapless, drift-free looping

START FAST, KEEP YOUR WORK
• 8 ready-made starter songs to play with or build on
• Your song saves automatically; keep named copies in "My songs"
• Open the full-page studio for a bigger view that keeps playing in the background

PRIVATE BY DESIGN
• No account, no ads, no tracking
• All sounds are generated in your browser, with no downloads and no network requests
• Your songs are stored only on your device

Tip: sound stops when the toolbar popup closes. Click ⤢ to open the full studio in a tab for longer sessions.
```

**Category**
```
Entertainment
```
(In the newer category list: Lifestyle → Entertainment. "Fun" also fits.)

**Language**
```
English
```

**Graphic assets** (all in `store-assets/`)

| Field | File | Size |
| --- | --- | --- |
| Store icon | `public/icons/icon-128.png` | 128×128 |
| Screenshot 1 | `screenshot-1-sequencer.png`: a full song playing | 1280×800 |
| Screenshot 2 | `screenshot-2-filters.png`: combined filters + preview | 1280×800 |
| Screenshot 3 | `screenshot-3-popup.png`: the toolbar popup | 1280×800 |
| Small promo tile | `promo-tile-440x280.png` | 440×280 |
| Marquee promo tile (optional) | `promo-marquee-1400x560.png` | 1400×560 |
| Promo video (optional) | Upload `promo-video/out/vibemix-promo.mp4` to YouTube, then paste the link | — |

> The promo video is branded **VibeMix**. Only link it if the listing uses that name, or re-render
> it with `brand: "Music Box"` (see `promo-video/README.md`).

**Official URL / Homepage URL**: optional (e.g. your GitHub repo or website).
**Support URL**: optional (e.g. GitHub Issues).

---

## Privacy practices tab

**Single purpose description**
```
Music Box lets users make music in the browser by filtering a built-in library of loops, previewing them, and layering them in a 16-step sequencer.
```

**Permission justification: `storage`**
```
Used to save the user's songs and preferences (filters, settings) locally on their device with chrome.storage.local, so their work is restored when they reopen the extension. Nothing is sent anywhere.
```

**Are you using remote code?**
```
No, I am not using remote code.
```
(All JavaScript is bundled in the package. Sounds are generated locally with the Web Audio API.)

**Data usage**: what user data do you collect?
Leave **every category unchecked** (personally identifiable info, health, financial, authentication,
personal communications, location, web history, user activity, website content).

Tick all three certifications:
- [x] I do not sell or transfer user data to third parties, outside of the approved use cases
- [x] I do not use or transfer user data for purposes unrelated to my item's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL**
Host `store-assets/privacy-policy.html` publicly (GitHub Pages, a Gist, or your site) and paste its URL.

---

## Account tab (one-time)

- **Contact email**: your developer email (must be verified)
- **Developer fee**: US$5, one time
