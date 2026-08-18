// Genereert de brochure als PDF uit index.html.
//   npm run pdf            -> export/de-hoge-wei-fase-c.pdf (met placeholders)
//   npm run pdf -- --clean -> zonder placeholder-arcering en zonder notities
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const clean = process.argv.includes('--clean');
const out = join(root, 'export', clean
  ? 'de-hoge-wei-fase-c-clean.pdf'
  : 'de-hoge-wei-fase-c.pdf');

mkdirSync(join(root, 'export'), { recursive: true });

// De omgeving levert een voorgeinstalleerde Chromium die niet altijd de
// versie is die Playwright zelf verwacht. Val daarom terug op de aanwezige
// binary in plaats van er een te downloaden.
function vindChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!base || !existsSync(base)) return undefined;
  const map = readdirSync(base).filter((d) => d.startsWith('chromium-')).sort().reverse();
  for (const d of map) {
    const bin = join(base, d, 'chrome-linux', 'chrome');
    if (existsSync(bin)) return bin;
  }
  return undefined;
}

const browser = await chromium.launch({ executablePath: vindChromium() });
const page = await browser.newPage();
await page.goto(pathToFileURL(join(root, 'index.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
if (clean) await page.evaluate(() => document.body.classList.add('clean'));

// preferCSSPageSize gebruikt @page{size:480mm 330mm} = spread van 2x 240x330 mm
await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('PDF geschreven naar', out);
