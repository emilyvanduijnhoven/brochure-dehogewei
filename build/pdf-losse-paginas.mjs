// Exporteert de brochure als losse pagina's van 240 x 330 mm, in plaats van
// spreads van 480 x 330 mm. Bedoeld voor Canva en andere tools die elke
// pagina apart willen inlezen.
//
//   npm run pdf:los            -> export/de-hoge-wei-fase-c-losse-paginas.pdf
//   npm run pdf:los -- --clean -> zonder placeholder-arcering
//
// Werkwijze: de pagina wordt eerst als spread-PDF gerenderd en daarna wordt
// elk vel doormidden gesneden. Zo blijft beeld dat over de bladspiegel heen
// loopt gewoon kloppen: de linkerhelft komt op de ene pagina, de rechterhelft
// op de volgende. Cover en achterkant staan alleen op de linkerhelft van hun
// vel; van die vellen wordt de lege rechterhelft weggelaten.
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, existsSync, readdirSync, writeFileSync } from 'node:fs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const clean = process.argv.includes('--clean');
const out = join(root, 'export', clean
  ? 'de-hoge-wei-fase-c-losse-paginas-clean.pdf'
  : 'de-hoge-wei-fase-c-losse-paginas.pdf');

mkdirSync(join(root, 'export'), { recursive: true });

function vindChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!base || !existsSync(base)) return undefined;
  for (const d of readdirSync(base).filter(n => n.startsWith('chromium-')).sort().reverse()) {
    const bin = join(base, d, 'chrome-linux', 'chrome');
    if (existsSync(bin)) return bin;
  }
  return undefined;
}

const browser = await chromium.launch({ executablePath: vindChromium() });
const page = await browser.newPage();
await page.goto(pathToFileURL(join(root, 'index.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.body.classList.add('los'));
if (clean) await page.evaluate(() => document.body.classList.add('clean'));

// welke vellen bevatten een losse pagina in plaats van een spread?
const enkel = await page.evaluate(() => [...document.querySelectorAll('section')]
  .map((s, i) => s.classList.contains('single') ? i : -1).filter(i => i >= 0));

const spreads = await page.pdf({ printBackground: true, preferCSSPageSize: true });
await browser.close();

const bron = await PDFDocument.load(spreads);
const doel = await PDFDocument.create();
const enkelSet = new Set(enkel);
let n = 0;

for (let i = 0; i < bron.getPageCount(); i++) {
  const { width, height } = bron.getPage(i).getSize();
  const half = width / 2;
  // een enkele pagina staat links op het vel; de rechterhelft is leeg
  const helften = enkelSet.has(i) ? [0] : [0, half];
  for (const x of helften) {
    const [kopie] = await doel.copyPages(bron, [i]);
    kopie.setMediaBox(x, 0, half, height);
    kopie.setCropBox(x, 0, half, height);
    doel.addPage(kopie);
    n++;
  }
}

writeFileSync(out, await doel.save());
console.log(`PDF geschreven naar ${out} — ${n} losse pagina's uit ${bron.getPageCount()} vellen`);
