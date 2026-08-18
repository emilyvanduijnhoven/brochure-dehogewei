# Brochure De Hoge Wei — Verkoopfase C

Voorbeeldbrochure als HTML-template, bedoeld als blauwdruk die de designer
**nabouwt in InDesign**. De opbouw is overgenomen van de brochures van fase A
en B; teksten en beeld staan er als placeholder in.

## Formaat

| | |
|---|---|
| Pagina | **240 × 330 mm** staand (24 cm breed, 33 cm hoog) |
| Spread | 480 × 330 mm |
| Marge (bladspiegel) | 18 mm |
| Afloop | nog toe te voegen in InDesign (advies 3 mm) |

De PDF wordt per **spread** geëxporteerd; de cover en de achterkant staan als
losse pagina gecentreerd op een spread-vel.

## Bestanden

```
index.html          de brochure — open in de browser
build/pdf.mjs       exporteert index.html naar PDF
export/             de gegenereerde PDF
assets/             al het beeldmateriaal (zie assets/README.md)
docs/huisstijl/     huisstijlhandboek, kleuren, fonts
docs/referentie/    brochures fase A en B ter vergelijking
```

## Waar upload ik mijn materiaal?

Zie **[`assets/README.md`](assets/README.md)** — daar staat per map wat erin
hoort, welk bestandsformaat en hoe je bestanden noemt.

Kort:

- logo's → `assets/logos/`
- renders/impressies → `assets/renders/`
- foto's → `assets/fotografie/`
- plattegronden en tekeningen → `assets/tekeningen/`
- illustraties en patronen → `assets/illustraties/`
- fonts → `assets/fonts/`
- huisstijlhandboek → `docs/huisstijl/`
- brochures fase A en B → `docs/referentie/`

Uploaden kan in GitHub via **Add file → Upload files** in de betreffende map.

## Bekijken en exporteren

```bash
npm install               # eenmalig
npm run pdf               # -> export/de-hoge-wei-fase-c.pdf — spreads, 31 vellen
npm run pdf:los           # -> export/de-hoge-wei-fase-c-losse-paginas.pdf — 60 losse pagina's
npm run pdf -- --clean    # zonder placeholder-arcering (werkt ook op pdf:los)
```

**Welke van de twee?** De spread-export toont de brochure zoals je hem
openslaat en is het formaat voor de drukker en de designer. De losse-pagina's
export snijdt elk vel doormidden tot pagina's van 240 × 330 mm; gebruik die
voor Canva en andere tools die elke pagina apart willen inlezen. Beeld dat
over de bladspiegel heen loopt wordt netjes over twee pagina's verdeeld.

Of open `index.html` in de browser. De balk bovenin heeft knoppen om de
placeholders te dimmen, om direct naar PDF te printen, en een zoomregeling —
die schaalt bij het openen automatisch zodat een hele spread in beeld past.
De zoom geldt alleen voor het scherm; print en PDF blijven op ware grootte.

## Huisstijl

De merkfonts (Neue Haas Display, Calluna Italic, Filmotype LaCrosse) en het
logo zijn ingebouwd. Zie [`docs/huisstijl/README.md`](docs/huisstijl/README.md)
voor de rolverdeling per font en de openstaande vraag over de merkkleur.

## Placeholders

Twee soorten, allebei bewust zichtbaar gelaten:

- **Gearceerde vlakken** — hier komt beeld. Het label vertelt wát voor beeld
  en in welke oriëntatie.
- **Oranje gemarkeerde tekst** zoals `[AANTAL]` — hier moet inhoud ingevuld
  worden.

Ze blijven staan tot er per stuk input komt.
