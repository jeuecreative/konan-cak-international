# Konan Cak International — Website

Erstellt von Eue Design · Stand 23.10.2026

Statische Website aus handgeschriebenem HTML, CSS und JavaScript.
Kein Redaktionssystem, keine Frameworks, keine externen Dienste.
Läuft auf jedem gängigen Webhosting.

**Neu in dieser Fassung:** Die Website ist zweisprachig. Unter `/en/` liegt die
englische Fassung aller acht Seiten, in der Kopfzeile steht ein Sprachumschalter,
und der Cookie-Banner erscheint automatisch in der Sprache der Seite.

---

## 1. Ordnerstruktur — bitte genau so übernehmen

```
konan-cak-international/
├── index.html              Startseite            ← deutsche Fassung
├── leistungen.html         Behandlungsbereiche
├── ablauf.html             Ablauf in sechs Etappen
├── faq.html                Häufige Fragen
├── ueber-uns.html          Über uns
├── kontakt.html            Kontakt und Anfrageformular
├── impressum.html
├── datenschutz.html
├── en/                                           ← englische Fassung
│   ├── index.html          Home
│   ├── treatments.html     Treatments
│   ├── process.html        How it works
│   ├── faq.html            FAQ
│   ├── about.html          About us
│   ├── contact.html        Contact
│   ├── imprint.html        Imprint
│   └── privacy.html        Privacy
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js         Navigation, Einblendungen, Formular
    │   ├── suche.js        Behandlungssuche
    │   └── consent.js      Einwilligungsverwaltung
    └── images/
        ├── logo-emblem.webp / .png     Kopf- und Fußzeile
        ├── logo-voll.webp / .png       Vollständiges Logo
        ├── logo-wortmarke.webp / .png  Wortmarke einzeln
        ├── logo.jpg                    Originaldatei
        ├── og-startseite.jpg           Vorschaubild für soziale Netzwerke
        ├── favicon.ico
        ├── apple-touch-icon.png
        └── wappen-*.svg                Symbole der Behandlungsbereiche
```

**Wichtig:** Die Verzeichnisse müssen erhalten bleiben. Wenn alle Dateien flach
in einem Ordner liegen, findet keine Seite ihr Stylesheet, ihre Skripte oder
ihre Bilder — die Seite erscheint dann unformatiert und ohne Logo. Der Ordner
`en` muss neben `index.html` liegen, nicht darin: Die englischen Seiten greifen
mit `../assets/` auf dieselben Bilder, Stile und Skripte zu wie die deutschen.

---

## 2. Auf den Server bringen

1. Das ZIP-Archiv entpacken.
2. Den **Inhalt** des Ordners `konan-cak-international` in das Wurzelverzeichnis
   des Webspace laden, meist `httpdocs`, `public_html` oder `www` — nicht den
   Ordner selbst, sonst liegt die Seite unter `/konan-cak-international/`.
3. Prüfen, dass `index.html` direkt im Wurzelverzeichnis liegt.
4. TLS-Zertifikat aktivieren und eine Weiterleitung von HTTP auf HTTPS einrichten.
5. Eine Weiterleitung zwischen `example.de` und `www.example.de` festlegen,
   damit nur eine Variante erreichbar ist.

Lokal lässt sich die Seite durch Doppelklick auf `index.html` öffnen. Es wird
kein Server benötigt, weil keine externen Ressourcen geladen werden.

---

## 3. Vor dem Livegang anzupassen

### 3.1 Offene Angaben in eckigen Klammern

Im sichtbaren Text stehen noch **34 Platzhalter in eckigen Klammern**. Sie
markieren Fakten, die nur der Auftraggeber kennt. Jeder davon muss vor dem
Livegang ersetzt oder der Satz gestrichen werden.

| Seite | Was fehlt |
|---|---|
| index.html, leistungen.html, faq.html | `[und weiteren Ländern]` — nur stehen lassen, wenn es stimmt, sonst streichen |
| leistungen.html | Kontrollintervalle Haartransplantation `[3, 6, 12]`, Gültigkeit des Röntgenbildes `[6]`, Nachsorgedauer `[12]` |
| ablauf.html | Höhe der Anzahlung `[X %]` |
| ueber-uns.html | Sitz `[Stadt]`, Gründungsjahr `[Jahr]`, Gründungsgeschichte, vier Meilensteine, drei Teammitglieder mit Namen und Funktion, Städte der Partnerkliniken, Akkreditierungen, Auswahlkriterien |
| kontakt.html | Anfahrt: Haltestelle, Autobahnabfahrt, Parkmöglichkeiten |
| faq.html | Prüfkriterien der Partnerkliniken |
| impressum.html, datenschutz.html | sämtliche Rechtstexte |

Die drei Teamkarten auf „Über uns" sind besonders wichtig: echte Namen, Fotos
und Qualifikationen schaffen Vertrauen und helfen Suchmaschinen, die
medizinische Kompetenz einzuordnen.

### 3.2 Punkte für die rechtliche Prüfung

Die Texte sind bewusst zurückhaltend formuliert und enthalten keine
Heilversprechen. Folgende Stellen brauchen dennoch eine fachliche Freigabe,
bevor die Seite online geht:

| Thema | Wo | Worum es geht |
|---|---|---|
| Vergütungsmodell | ablauf.html (Kosten), faq.html („Was kostet Ihre Vermittlung?") | Es wird offengelegt, dass Beratung kostenfrei ist, aber nicht, wie Konan Cak verdient. Ob eine Offenlegungspflicht besteht, bitte prüfen lassen. |
| Antwortzeiten | ablauf.html Etappe 01, faq.html, Kopfzeile | „innerhalb eines Werktags" und „24–48 Stunden" sind Zusagen. Nur stehen lassen, wenn sie eingehalten werden. |
| Ästhetische Eingriffe | leistungen.html Bereich 03 | Werbung für Schönheitsoperationen unterliegt dem Heilmittelwerbegesetz. |
| Sicherheitsaussage | faq.html („Ist eine Behandlung im Ausland sicher?") | Risikodarstellung und Formulierung „Garantieren kann ein Behandlungsergebnis niemand". |
| Krankenkasse | faq.html | Aussage zur Kostenübernahme fachlich bestätigen lassen. |
| Reiseleistungen | ablauf.html Etappe 04 | Wer Flug, Hotel und Transfer gebündelt vermittelt, kann unter das Pauschalreiserecht fallen. |
| Versicherungshinweis | ablauf.html (Checkliste) | Aussage zu Auslandsreise-Krankenversicherungen prüfen. |
| Gesundheitsdaten | kontakt.html, datenschutz.html | Einwilligung und Weitergabe an Partnerärzte nach Artikel 9 DSGVO. |

### 3.3 Domain eintragen

In allen sechzehn HTML-Dateien steht die Platzhalterdomain
`https://www.konancak-international.com`. Sie kommt vor in:

- `<link rel="canonical" …>`
- `<meta property="og:url" …>` und `<meta property="og:image" …>`
- den `hreflang`-Zeilen jeder Seite
- den strukturierten Daten in `index.html` und `en/index.html` (`application/ld+json`)
- `robots.txt`
- `sitemap.xml`

Am einfachsten über Suchen und Ersetzen in allen Dateien.

### 3.4 Kontaktdaten ersetzen

| Platzhalter | kommt vor in |
|---|---|
| `+49 (0)000 000 000` | Kopfzeile, Fußzeile, Kontaktseite, strukturierte Daten |
| `kontakt@konancak-international.com` | Kopfzeile, Fußzeile, Kontaktseite |
| `Musterstraße 1, 00000 Musterstadt` | Fußzeile, Kontaktseite, Impressum |
| `wa.me/490000000000` | Kontaktseite |

### 3.5 Bilder

Die grauen Flächen im Layout sind beschriftet mit Dateiname, Motiv,
Seitenverhältnis und Auflösung. Benötigt werden zwölf Bilder:

| Datei | Motiv | Format |
|---|---|---|
| `hero.webp` | Beratung oder Klinik, ruhig und sachlich | 3:4 · 1200 × 1600 |
| `klinik-partner.webp` | Partnerklinik oder Behandlungszimmer | 3:4 · 1200 × 1600 |
| `haartransplantation.webp` | sachliches Klinikmotiv | 16:9 · 1600 × 900 |
| `zahnmedizin.webp` | Behandlungseinheit oder Planung am Röntgenbild | 16:9 · 1600 × 900 |
| `plastische-chirurgie.webp` | Sprechzimmer, keine Körperbilder | 16:9 · 1600 × 900 |
| `augenheilkunde.webp` | Diagnostikgerät | 16:9 · 1600 × 900 |
| `orthopaedie.webp` | Physiotherapie oder Frühmobilisation | 16:9 · 1600 × 900 |
| `adipositas.webp` | Beratungsgespräch, respektvoll | 16:9 · 1600 × 900 |
| `team-beratung.webp` | echte Beratungssituation | 3:4 · 1200 × 1600 |
| `team-01.webp` bis `team-03.webp` | Porträts der Ansprechpartner | 1:1 · 800 × 800 |

Beim Einsetzen bitte `width`, `height`, `alt` und `loading="lazy"` setzen —
`alt` beschreibt, was zu sehen ist, sonst geht die Barrierefreiheit verloren.

### 3.6 Formularversand

Das Anfrageformular ist vollständig gestaltet und geprüft, versendet aber noch
nicht. Für den Versand wird ein serverseitiges Skript oder ein Formulardienst
mit Auftragsverarbeitungsvertrag benötigt. Die Stelle ist in
`assets/js/main.js` im Abschnitt „Formulare" kommentiert.

Medizinische Unterlagen sollten nicht per unverschlüsselter E-Mail übertragen
werden. Dafür ist ein gesonderter, gesicherter Upload nötig.

---

## 4. Tracking nachrüsten

In der ausgelieferten Fassung ist kein Tracking eingebaut, und es werden keine
externen Schriften, Karten oder Bibliotheken geladen. Die Einwilligungs-
verwaltung ist bereits vorhanden und vollständig funktionsfähig.

Zum Aktivieren in `assets/js/consent.js` im Abschnitt 5 die IDs eintragen:

```js
var IDS = {
  ga4: '',   // z. B. 'G-XXXXXXXXXX'
  ads: '',   // z. B. 'AW-XXXXXXXXX'
  gtm: ''    // z. B. 'GTM-XXXXXXX'
};
```

Solange die Felder leer sind, wird kein externes Skript geladen. Nach dem
Eintragen laden die Dienste erst nach ausdrücklicher Einwilligung. Google
Consent Mode v2 ist eingerichtet, vor der Einwilligung stehen alle Signale
auf `denied`.

Die Google-Maps-Karte auf der Kontaktseite ist als Zwei-Klick-Lösung angelegt.
In `kontakt.html` das Attribut `data-src` durch die echte Einbettungsadresse
ersetzen.

Bei jeder Erweiterung muss der Abschnitt 5 der Datenschutzerklärung ergänzt
werden.

---

## 5. Suchmaschinen und KI-Suche

Jede Seite hat einen eigenen Title und eine eigene Description aus dem
Textdokument. Ergänzt sind:

- **Organisationsdaten** (`MedicalBusiness`) auf der Startseite, mit
  Beschreibung, Sprachen, Fachbereichen und Platzhaltern für Gründungsjahr und
  Profile in sozialen Netzwerken
- **FAQ-Daten** (`FAQPage`) auf `faq.html` mit allen zwölf Fragen, damit
  Suchmaschinen und KI-Assistenten die Antworten direkt übernehmen können
- `sitemap.xml` mit allen sechs indexierbaren Seiten; Impressum und
  Datenschutz stehen auf `noindex`

Die FAQ-Seite ist bewusst für KI-Suche gebaut: Jede Antwort steht für sich und
nennt den Firmennamen, statt nur auf den Kontext der Seite zu verweisen.

Vor dem Livegang die strukturierten Daten mit dem Google Rich Results Test
prüfen, nachdem die Platzhalter ersetzt sind.

**Hinweis zur Navigation:** Die FAQ-Seite ist über die Fußzeile und von der
Kontaktseite aus verlinkt, nicht über die Hauptnavigation. Das hält die
Navigation bei den vereinbarten vier Punkten. Soll die Seite prominenter
stehen, lässt sich der Punkt in `<ul class="nav-liste">` auf allen Seiten
ergänzen.

---

## 6. Barrierefreiheit

Die Seite wurde gegen WCAG 2.2 Stufe AA geprüft:

- alle Textkontraste erfüllen 4,5:1, große Schrift 3:1
- Fokusanzeige als doppelter Ring, auf hellem und dunklem Grund sichtbar
- vollständige Tastaturbedienung, Fokusfalle im Einwilligungsdialog,
  Escape schließt Dialog und Menü
- Zielgrößen mindestens 24 × 24 Pixel
- semantische Landmarks, saubere Überschriftenfolge, eine H1 je Seite
- Inhalte bleiben ohne JavaScript sichtbar
- lesbar bei 400 % Zoom und bei erhöhten Textabständen
- `prefers-reduced-motion` wird beachtet

**Beim Ergänzen von Inhalten bitte erhalten:** Alternativtexte für neue Bilder,
Überschriftenfolge ohne Sprünge, ausreichende Kontraste bei neuen Farben.

---

## 7. Zweisprachigkeit — wie der Sprachwechsel funktioniert

### 7.1 Aufbau

Die englische Fassung liegt in einem eigenen Ordner `/en/` und benutzt dieselben
Stile, Skripte und Bilder wie die deutsche. Es gibt also **keine zweite
Website**, sondern einen zweiten Satz HTML-Dateien über demselben Unterbau.

| Deutsch | Englisch |
|---|---|
| `/index.html` | `/en/index.html` |
| `/leistungen.html` | `/en/treatments.html` |
| `/ablauf.html` | `/en/process.html` |
| `/faq.html` | `/en/faq.html` |
| `/ueber-uns.html` | `/en/about.html` |
| `/kontakt.html` | `/en/contact.html` |
| `/impressum.html` | `/en/imprint.html` |
| `/datenschutz.html` | `/en/privacy.html` |

Die englischen Dateinamen sind absichtlich englisch: Suchmaschinen werten die
URL als Signal, und `/en/treatments.html` passt zu englischen Suchanfragen,
`/en/leistungen.html` nicht.

Auch die Sprungmarken sind übersetzt, etwa `leistungen.html#zahnmedizin` gegenüber
`treatments.html#dentistry`.

### 7.2 Der Umschalter

In der Kopfzeile jeder Seite steht rechts oben `DE | EN`. Er verweist nicht auf
die Startseite, sondern **auf dieselbe Seite in der anderen Sprache**: Wer auf
`ablauf.html` steht und auf EN klickt, landet auf `en/process.html`, nicht auf
`en/index.html`. Das ist der Unterschied zwischen einem brauchbaren und einem
ärgerlichen Sprachwechsel.

Im Markup sieht das so aus:

```html
<nav class="sprachwahl" aria-label="Sprache">
  <a href="ablauf.html" hreflang="de" lang="de" aria-current="true">DE</a>
  <a href="en/process.html" hreflang="en" lang="en">EN</a>
</nav>
```

Die aktive Sprache trägt `aria-current="true"` und ist hervorgehoben.
`hreflang` und `lang` sagen Screenreadern und Suchmaschinen, wohin der Link
führt und in welcher Sprache das Ziel ist.

**Beim Anlegen neuer Seiten** muss der Umschalter von Hand auf das richtige
Gegenstück zeigen. Er steht in jeder Datei direkt nach dem Block
`<div class="topbar-kontakt">`.

### 7.3 hreflang für Suchmaschinen

Jede Seite nennt im Kopf beide Sprachfassungen:

```html
<link rel="alternate" hreflang="de" href="https://…/ablauf.html">
<link rel="alternate" hreflang="en" href="https://…/en/process.html">
<link rel="alternate" hreflang="x-default" href="https://…/ablauf.html">
```

Das verhindert, dass Google die beiden Fassungen als doppelten Inhalt wertet,
und liefert Suchenden die passende Sprache aus. `x-default` zeigt auf die
deutsche Fassung — sie ist die Hauptsprache.

Dieselben Beziehungen stehen noch einmal in der `sitemap.xml`, jede URL mit
ihren Alternativen. Beides muss beim Anlegen neuer Seiten gepflegt werden,
sonst entsteht genau der Duplikatsverdacht, den hreflang verhindern soll.

### 7.4 Was die Sprache steuert

Maßgeblich ist das Attribut `lang` am `<html>`-Element: `lang="de"` oder
`lang="en"`. Daran erkennen Screenreader die Aussprache, Browser das Angebot
zum Übersetzen — und die drei Skripte, in welcher Sprache sie sprechen müssen:

| Datei | was davon abhängt |
|---|---|
| `consent.js` | Cookie-Banner, Einstellungsdialog, Kategorienamen, Links zu Datenschutz und Impressum |
| `suche.js` | Suchbegriffe, Trefferbezeichnungen, Sprungziele, Meldungen für Screenreader |
| `main.js` | Rückmeldung des Anfrageformulars |

Alle drei lesen die Sprache so aus:

```js
var SPRACHE = (document.documentElement.lang || 'de').slice(0, 2).toLowerCase();
```

Wird eine neue Seite angelegt, genügt also das richtige `lang`-Attribut — die
Skripte stellen sich selbst um. Es gibt keine getrennten Skriptdateien je
Sprache, und es muss nichts konfiguriert werden.

### 7.5 Der Cookie-Banner

Der Banner liegt auf **allen sechzehn Seiten** und erscheint in der Sprache der
jeweiligen Seite:

| | Deutsch | Englisch |
|---|---|---|
| Überschrift | Datenschutzeinstellungen | Privacy settings |
| Schaltflächen | Alle akzeptieren · Nur notwendige · Einstellungen | Accept all · Necessary only · Settings |
| Kategorien | Notwendig · Statistik · Marketing · Externe Inhalte | Necessary · Statistics · Marketing · External content |
| Rechtslinks | datenschutz.html · impressum.html | privacy.html · imprint.html |

**Die Einwilligung gilt sprachübergreifend.** Wer auf der deutschen Seite
zustimmt und dann auf EN wechselt, sieht den Banner kein zweites Mal. Das ist
so gewollt: Es ist dieselbe Website und dieselbe verantwortliche Stelle, und
eine zweite Abfrage wäre für Besucher nur lästig. Technisch liegt die
Entscheidung im Cookie `kc_consent` mit `path=/`, das damit für den gesamten
Auftritt gilt.

Geändert wird die Auswahl jederzeit über „Cookie-Einstellungen" beziehungsweise
„Cookie settings" in der Fußzeile.

Die Texte des Banners stehen gesammelt in `assets/js/consent.js` im Abschnitt 0
unter `TEXTE`, nach Sprache getrennt. Eine weitere Sprache ergänzt man dort als
zusätzlichen Block.

### 7.6 Eine dritte Sprache ergänzen

Nach demselben Muster, am Beispiel Türkisch:

1. Ordner `/tr/` anlegen, die acht Seiten hineinkopieren und übersetzen.
2. In jeder neuen Datei `<html lang="tr">` setzen.
3. Pfade zu Stilen, Skripten und Bildern auf `../assets/…` belassen.
4. `canonical`, `og:url` und die `hreflang`-Zeilen eintragen — in den neuen
   Dateien **und** in allen bestehenden, sonst kennt die neue Fassung niemand.
5. Im Umschalter jeder Seite einen dritten Eintrag ergänzen.
6. In `consent.js`, `suche.js` und `main.js` je einen `tr`-Block ergänzen.
7. Die `sitemap.xml` um die neuen URLs und Alternativen erweitern.

### 7.7 Was bei den englischen Seiten noch offen ist

- **Rechtstexte.** `en/imprint.html` und `en/privacy.html` sind übersetzte
  Gerüste. Eine englische Datenschutzerklärung ersetzt die deutsche nicht:
  Für ein deutsches Unternehmen bleibt die deutsche Fassung die maßgebliche.
  Beide Seiten weisen oben darauf hin. Bitte rechtlich prüfen lassen.
- **Telefonnummer und Antwortzeiten.** Englischsprachige Anfragen kommen aus
  anderen Zeitzonen. Falls die Erreichbarkeit „Mo – Fr, 9:00 – 18:00" für diese
  Zielgruppe nicht gilt, gehört das auf der englischen Kontaktseite angepasst.
- **Notrufnummer.** Auf der englischen Seite steht weiterhin die 112, gültig in
  der EU. Für Besucher außerhalb Europas ist der Hinweis zu ergänzen.
- **Die eckigen Platzhalter** stehen auch in der englischen Fassung und müssen
  dort ebenso ersetzt werden.

---

## 8. Nach dem Livegang

- Google Search Console einrichten und `sitemap.xml` einreichen
- In der Search Console prüfen, ob die hreflang-Paare erkannt werden
  (Berichte → Internationale Ausrichtung)
- Google Unternehmensprofil anlegen
- Darstellung auf einem echten Mobilgerät prüfen
- Ladezeiten mit PageSpeed Insights messen
- Formularversand mit einer echten Anfrage testen, in beiden Sprachen
- Sprachumschalter auf jeder Seite einmal durchklicken

---

## 9. Technische Eckdaten

| | |
|---|---|
| Seiten | 16 (8 deutsch, 8 englisch) |
| Externe Requests | 0 |
| JavaScript | 3 Dateien, zusammen rund 18 KB, mit `defer` geladen |
| Schriften | Systemschriften, keine Webfonts |
| Breakpoints geprüft | 320, 375, 390, 430, 768, 1024, 1440, 1920 px, beide Sprachen |
| Sprachen | Deutsch (Hauptsprache), Englisch unter /en/ |
| Browser | alle aktuellen; das Logo hat für ältere Umgebungen einen PNG-Rückfall |
