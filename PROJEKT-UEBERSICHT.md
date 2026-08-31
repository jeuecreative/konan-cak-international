# Konan Cak International — Beispiel-Website (Layout-Fassung)

**Erstellt von:** Eue Design · **Stand:** 20.08.2026
**Fassung:** Fließtext durchgängig als Lorem-Ipsum-Platzhalter. Alle Überschriften, Navigations-, Button- und Formularbeschriftungen sind echt und inhaltlich gemeint.

---

## 1. Was in dieser Fassung echt ist und was nicht

| Element | Status |
|---|---|
| Überschriften H1 – H4, Sektionstitel | **echt** — inhaltliche Vorgabe für die Texterstellung |
| Navigation, Buttons, Formularlabels, Eyebrows | **echt** |
| Meta-Titles und Descriptions | **echt strukturiert**, Description als Platzhaltertext markiert |
| Sämtlicher Fließtext, Karten-Texte, FAQ-Antworten, Zitate | **Lorem Ipsum** |
| Kontaktdaten, Adresse, Telefonnummer | **Platzhalter** |
| Rechtstexte | **Gerüst** — anwaltlich zu prüfen |
| Bilder | **Platzhalterflächen** mit Pfad, Motiv, Format und Auflösung |

---

## 2. Sitemap — 15 Seiten, kein Onepager

```
/
├── index.html                            Startseite
├── leistungen.html                       Übersicht aller Bereiche
│   ├── leistung-haartransplantation.html
│   ├── leistung-zahnmedizin.html
│   ├── leistung-plastische-chirurgie.html
│   ├── leistung-augenheilkunde.html
│   ├── leistung-orthopaedie.html
│   └── leistung-adipositas.html
├── ablauf.html                           Prozess, Kosten, Checkliste
├── ratgeber.html                         Beitragsübersicht
│   └── ratgeber-beitrag.html             Beitragsvorlage
├── ueber-uns.html                        Positionierung, Team, Meilensteine, Karriere
├── kontakt.html                          Formular, Anfahrt, FAQ
├── impressum.html                        noindex
└── datenschutz.html                      noindex
```

Jede Behandlung hat jetzt eine eigene URL. Das ist die Voraussetzung dafür, dass für „Haartransplantation Türkei" und „Zahnimplantate Ausland" überhaupt eigene Rankings entstehen können — eine Sammelseite bedient sechs Suchintentionen und gewinnt bei keiner.

---

## 3. Inhaltsflächen je Seite

Damit genug Raum für echte Inhalte bleibt, hat jede Seite mehr befüllbare Blöcke als die erste Fassung:

**Startseite** — Hero mit Formular · Faktenleiste (4) · Problemliste (4) · Behandlungsbereiche (6) · Etappen-Rail (6) · USP (4) · Auswahlkriterien Kliniken (4) · **Zertifizierungen & Partner (5 Logoplätze)** · Patientenstimmen (3) · **Ratgeber-Teaser (3)** · FAQ (6) · CTA

**Leistungs-Unterseite** (Vorlage, 6×) — Seitenkopf · Überblick mit Datenblatt (5 Zeilen) · Verfahren (3) · Ablauf-Rail (4) · Kostenplan-Positionen (3) · FAQ (4) · CTA

**Ablauf** — Rail (6) · sechs Etappenblöcke mit Ergebnis-Box und Datenblatt · Kosten & Zahlung (3) · **Checkliste vor der Abreise (5)** · CTA

**Über uns** — Story (3 Absätze) · Regeln (4) · **Meilenstein-Rail (4)** · Team (3) · Netzwerk-Datenblatt (4) · **Karriere** · CTA

**Kontakt** — großes Formular · Kontakt-Datenblatt (6) · **Anfahrt (3)** · Karten-Platzhalter · FAQ (4)

**Ratgeber** — 6 Beitragskarten · Themenübersicht (4) · CTA
**Beitragsvorlage** — Lede, Beitragsbild, 5 H2-Abschnitte, Merk-Box, Liste, verwandte Beiträge

Alles, was hier in Klammern steht, ist neu gegenüber der ersten Fassung.

---

## 4. Neue Komponenten im Design-System

- `.logostreifen` — Raster für Partner- und Zertifizierungslogos (5 / 3 / 2 Spalten)
- `.rail-4` — Etappen-Rail in der Vier-Stationen-Variante für Unterseiten
- Beitragskarte (Ratgeber) auf Basis der bestehenden `.karte`
- Beitrags-Layout über `.fliesstext` mit Merk-Box

Farben, Typografie, Buttons, Formulare und Abstände unverändert aus der ersten Fassung.

---

## 5. SEO-Struktur

| Seite | Title | Fokus | Suchintention |
|---|---|---|---|
| index.html | Medizinische Behandlung im Ausland \| Konan Cak International | behandlung im ausland | kommerziell |
| leistungen.html | Behandlungsbereiche im Ausland \| Konan Cak International | behandlungen im ausland | Vergleich |
| leistung-*.html | \<Behandlung\> im Ausland \| Konan Cak International | je Behandlung eigenes Keyword-Set | kommerziell |
| ablauf.html | Ablauf: Behandlung im Ausland organisieren \| Konan Cak | ablauf medizintourismus | informational |
| ratgeber.html | Ratgeber zur Behandlung im Ausland \| Konan Cak International | ratgeber themen | informational |
| ratgeber-beitrag.html | Vor der Behandlung im Ausland klären \| Konan Cak | je Beitrag eigenes Longtail | informational |
| ueber-uns.html | Über uns \| Konan Cak International | markenname | navigational |
| kontakt.html | Kontakt & Ersteinschätzung \| Konan Cak International | ersteinschätzung anfordern | transaktional |
| impressum / datenschutz | — | — | noindex, follow |

Titles und Descriptions bitte final erst schreiben, wenn die Keyword-Recherche vorliegt. Die H1 jeder Unterseite ist bewusst der Behandlungsname, nicht ein Werbeclaim.

---

## 6. Nächste Schritte

1. **Texte**: Überschriften stehen — Fließtext je Block liefern oder von uns texten lassen. Der Umfang pro Block ist am Lorem-Text ablesbar.
2. **Bilder**: Liste der Motive steht in jeder Platzhalterfläche direkt im Layout.
3. **Logo als SVG oder PNG mit Alphakanal** — die aktuelle Fassung ist ein Freisteller aus der JPEG-Datei.
4. **Rechtstexte** anwaltlich prüfen lassen (Art. 9 DSGVO, Gesundheitsdaten).
5. **Formularversand** serverseitig anbinden, sicherer Upload-Weg für Befunde.
6. Erst danach: Consent-Tool, Tracking, ggf. Google Ads.

---

## 7. Selbstprüfung

| Kriterium | Ergebnis |
|---|---|
| 15 Seiten: HTML-Struktur, offene Tags, doppelte IDs | fehlerfrei |
| Genau eine H1 pro Seite | erfüllt |
| Interne Links und Sprungmarken | alle Ziele vorhanden |
| Overflow-Test 15 Seiten × 8 Breakpoints (320 – 1920 px) | 0 Fehler |
| JSON-LD | valide |
| Externe Requests | null |
| Inline-Styles | keine |
| Tastatur, Focus, `prefers-reduced-motion` | umgesetzt |

Nicht prüfbar in dieser Umgebung: Lighthouse-Messung auf der Zieldomain.
