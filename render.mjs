// Renders Chrome Web Store images from the built extension (run `npm run build` first).
// Usage (from repo root): node store-assets/render.mjs [--name "VibeMix"]
// Uses the Playwright copy installed in promo-video/ (cd promo-video && npm install).
import { chromium } from '../promo-video/node_modules/playwright/index.mjs';
import { createHash } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const ext = path.resolve(here, '../dist');
const out = (f) => path.join(here, f);
const nameArg = process.argv.indexOf('--name');
const name = nameArg > 0 ? process.argv[nameArg + 1] : 'Music Box';
// Chrome derives an unpacked extension's id from its absolute path.
const id = [...createHash('sha256').update(ext).digest('hex').slice(0, 32)].map((c) => String.fromCharCode(97 + parseInt(c, 16))).join('');

const profile = mkdtempSync(path.join(tmpdir(), 'mb-store-'));
const ctx = await chromium.launchPersistentContext(profile, {
  headless: false,
  args: ['--headless=new', `--disable-extensions-except=${ext}`, `--load-extension=${ext}`],
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();
await page.goto(`chrome-extension://${id}/studio.html`);
await page.waitForSelector('.loop-list');

// 1 — a full song playing.
await page.getByRole('button', { name: /Upbeat house/ }).click();
await page.getByRole('button', { name: 'Play (Space)' }).click();
await page.waitForTimeout(4200); // let the toast fade
await page.screenshot({ path: out('screenshot-1-sequencer.png') });

// 2 — filters combined, previewing a sound in time with the song.
await page.getByRole('button', { name: 'House', exact: true }).click();
await page.getByRole('button', { name: 'Happy', exact: true }).click();
await page.getByRole('button', { name: 'Fast · 120+' }).click();
await page.locator('.panel-scroll').first().evaluate((el) => (el.scrollTop = 120));
await page.getByRole('button', { name: 'Preview Diva Vox Hook' }).click();
await page.mouse.move(1270, 790);
await page.waitForTimeout(600);
await page.screenshot({ path: out('screenshot-2-filters.png') });
await page.keyboard.press('Escape');
await page.getByRole('button', { name: 'Pause (Space)' }).click();

// 3 — the toolbar popup, framed on a 1280×800 canvas.
const popup = await ctx.newPage();
await popup.setViewportSize({ width: 800, height: 600 });
await popup.goto(`chrome-extension://${id}/popup.html`);
await popup.waitForSelector('.track');
await popup.waitForTimeout(500);
const popupPng = (await popup.screenshot()).toString('base64');
await popup.close();
const frame = await ctx.newPage();
await frame.setViewportSize({ width: 1280, height: 800 });
await frame.setContent(`<!doctype html><style>
  @font-face { font-family: SG; src: url(${pathToFileURL(path.join(here, 'src/fonts/space-grotesk-latin-700-normal.woff2'))}); }
  body { margin: 0; width: 1280px; height: 800px; background: radial-gradient(110% 110% at 90% 0%, #4d350f, #14171d 50%, #090a0d); display: grid; place-items: center; }
  h2 { font: 700 40px SG, sans-serif; color: #fff; margin: 0 0 28px; text-align: center; letter-spacing: -0.01em; }
  h2 span { color: #f5a524; }
  img { width: 800px; height: 600px; border-radius: 14px; box-shadow: 0 30px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08); display: block; }
</style><div><h2>Right in your <span>toolbar</span></h2><img src="data:image/png;base64,${popupPng}"></div>`);
await frame.evaluate(() => document.fonts.ready);
await frame.screenshot({ path: out('screenshot-3-popup.png') });

await ctx.close();

// Promo tiles: a plain browser opened at each exact size (resizing a page mid-session in the
// extension profile produced tiling artifacts).
const browser = await chromium.launch();
for (const [size, w, h] of [['tile', 440, 280], ['marquee', 1400, 560]]) {
  const tile = await browser.newPage({ viewport: { width: w, height: h } });
  await tile.goto(`${pathToFileURL(path.join(here, 'src/tile.html'))}?size=${size}&name=${encodeURIComponent(name)}`);
  await tile.evaluate(() => document.fonts.ready);
  await tile.screenshot({ path: out(`promo-${size}-${w}x${h}.png`) });
  await tile.close();
}
await browser.close();
rmSync(profile, { recursive: true, force: true });
console.log('Wrote store images to', here);
