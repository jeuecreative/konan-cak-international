# Konan Cak International — Website

Erstellt von Eue Design · Stand 21.10.2026

Statische Website aus handgeschriebenem HTML, CSS und JavaScript.
Kein Redaktionssystem, keine Frameworks, keine externen Dienste.
Läuft auf jedem gängigen Webhosting.

**Neu in dieser Fassung:** Alle Blindtexte sind durch die redaktionellen Texte
aus dem Dokument „Website-Texte Konan Cak International" ersetzt. Dazu ist die
Seite `faq.html` hinzugekommen.

---

## 1. Ordnerstruktur — bitte genau so übernehmen

```
konan-cak-international/
├── index.html              Startseite
├── leistungen.html         Behandlungsbereiche
├── ablauf.html             Ablauf in sechs Etappen
├── faq.html                Häufige Fragen
├── ueber-uns.html          Über uns
├── kontakt.html            Kontakt und Anfrageformular
├── impressum.html
├── datenschutz.html
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
ihre Bilder — die Seite erscheint dann unformatiert und ohne Logo.

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

In allen acht HTML-Dateien steht die Platzhalterdomain
`https://www.konancak-international.com`. Sie kommt vor in:

- `<link rel="canonical" …>`
- `<meta property="og:url" …>` und `<meta property="og:image" …>`
- den strukturierten Daten in `index.html` (`application/ld+json`)
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

## 7. Englische Fassung

Das Textdokument enthält neben dem deutschen auch einen englischen Reiter.
Eingebaut ist bisher nur die deutsche Fassung. Eine englische Version braucht
eigene Dateien unter `/en/`, `hreflang`-Auszeichnung in allen Seiten und eine
Sprachumschaltung in der Kopfzeile. Das ist ein eigener Arbeitsschritt und
nicht Teil dieser Lieferung.

---

## 8. Nach dem Livegang

- Google Search Console einrichten und `sitemap.xml` einreichen
- Google Unternehmensprofil anlegen
- Darstellung auf einem echten Mobilgerät prüfen
- Ladezeiten mit PageSpeed Insights messen
- Formularversand mit einer echten Anfrage testen

---

## 9. Technische Eckdaten

| | |
|---|---|
| Seiten | 8 |
| Externe Requests | 0 |
| JavaScript | 3 Dateien, zusammen rund 18 KB, mit `defer` geladen |
| Schriften | Systemschriften, keine Webfonts |
| Breakpoints geprüft | 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px |
| Browser | alle aktuellen; das Logo hat für ältere Umgebungen einen PNG-Rückfall |
