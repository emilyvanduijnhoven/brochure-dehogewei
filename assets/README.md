# Waar upload ik wat?

Alles wat de brochure nodig heeft staat in deze map. Sleep bestanden in GitHub
naar de juiste submap (**Add file → Upload files**) of upload ze via de
GitHub-webinterface direct in de map.

| Map | Wat hoort hier | Formaat |
|---|---|---|
| `assets/logos/` | Logo De Hoge Wei, AH Projectontwikkeling, JG Timmer, Joop van Mourik, Karens, Rozeboom, aannemer/infra | SVG (voorkeur) of PNG met transparantie |
| `assets/renders/` | Exterieur- en interieurimpressies fase C, vogelvlucht, straatbeelden | JPG, min. 300 dpi op ware grootte |
| `assets/fotografie/` | Sfeerbeelden Kesteren, omgeving, uiterwaarden, portretten voor de interviews | JPG, min. 300 dpi |
| `assets/tekeningen/` | Situatietekening, indelingsplattegronden, gevelaanzichten, parkeer-/bergingtekening | PDF of SVG (vector), anders PNG 600 dpi |
| `assets/illustraties/` | Botanische fruit-illustraties, patronen, iconen uit het bestaande merkmateriaal | SVG of PNG met transparantie |
| `assets/fonts/` | De merkfonts als webfont (`.woff2`) **en** als OTF/TTF voor de designer | woff2 + otf/ttf |
| `docs/huisstijl/` | Huisstijlhandboek, kleurenkaart, logo-richtlijnen (pdf) | PDF |
| `docs/referentie/` | Brochures fase A en fase B als referentie | PDF |

## Naamgeving

Gebruik kleine letters, koppeltekens, geen spaties of accenten:

```
fasec-exterieur-hoofdbeeld.jpg
fasec-interieur-woonkamer-01.jpg
kesteren-uiterwaarden-01.jpg
logo-jg-timmer.svg
plattegrond-appartement-type-a.pdf
```

Zet er bij renders/foto's `-liggend` of `-staand` achter als het uitmaakt voor
de plek in de opmaak.

## Rechten

Zet per map, als dat speelt, een `CREDITS.md` neer met fotograaf/bron en of het
beeld vrij gebruikt mag worden. Dat scheelt de designer later uitzoekwerk.

## En dan?

Zodra beeld hier staat, geef je in de chat door welk bestand op welke plek
hoort (bijvoorbeeld: "`fasec-exterieur-hoofdbeeld.jpg` op de cover"). De
placeholder in `index.html` wordt dan vervangen door het echte beeld. Zolang
je niets doorgeeft blijven de placeholders staan — dat is de bedoeling.
