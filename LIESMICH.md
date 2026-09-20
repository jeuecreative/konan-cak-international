# Konan Cak International — Website

Erstellt von Eue Design · Stand 20.09.2026

Statische Website aus handgeschriebenem HTML, CSS und JavaScript.
Kein Redaktionssystem, keine Frameworks, keine externen Dienste.
Läuft auf jedem gängigen Webhosting.

---

## 1. Ordnerstruktur — bitte genau so übernehmen

```
konan-cak-international/
├── index.html              Startseite
├── leistungen.html         Behandlungsbereiche
├── ablauf.html             Ablauf in sechs Etappen
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

### 3.1 Domain eintragen

In allen sieben HTML-Dateien steht die Platzhalterdomain
`https://www.konancak-international.com`. Sie kommt vor in:

- `<link rel="canonical" …>`
- `<meta property="og:url" …>` und `<meta property="og:image" …>`
- den strukturierten Daten in `index.html` (`application/ld+json`)
- `robots.txt`
- `sitemap.xml`

Am einfachsten über Suchen und Ersetzen in allen Dateien.

### 3.2 Kontaktdaten ersetzen

| Platzhalter | kommt vor in |
|---|---|
| `+49 (0)000 000 000` | Kopfzeile, Fußzeile, Kontaktseite, strukturierte Daten |
| `kontakt@konancak-international.com` | Kopfzeile, Fußzeile, Kontaktseite |
| `Musterstraße 1, 00000 Musterstadt` | Fußzeile, Kontaktseite, Impressum |
| `wa.me/490000000000` | Kontaktseite |

### 3.3 Texte

Sämtlicher Fließtext ist Lorem-Ipsum-Platzhalter. Die Überschriften sind
inhaltlich gemeint und geben vor, was in den jeweiligen Abschnitt gehört.
Die Länge der Platzhalter entspricht ungefähr der benötigten Textmenge.

### 3.4 Bilder

Die grauen Flächen im Layout sind beschriftet mit Dateiname, Motiv,
Seitenverhältnis und Auflösung. Benötigt werden neun Bilder:

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

Beim Einsetzen bitte `width`, `height`, `alt` und `loading="lazy"` setzen —
`alt` beschreibt, was zu sehen ist, sonst geht die Barrierefreiheit verloren.

### 3.5 Rechtstexte

`impressum.html` und `datenschutz.html` sind Gerüste mit korrekter Gliederung,
aber ohne verbindlichen Inhalt. Da über das Formular Gesundheitsdaten nach
Artikel 9 DSGVO eingehen können, ist eine anwaltliche Prüfung vor dem Livegang
erforderlich. Eue Design erstellt keine Rechtstexte.

### 3.6 Formularversand

Das Anfrageformular ist vollständig gestaltet und geprüft, versendet aber noch
nicht. Für den Versand wird ein serverseitiges Skript oder ein Formulardienst
mit Auftragsverarbeitungsvertrag benötigt. Die Stelle ist in
`assets/js/main.js` im Abschnitt „Formulare" kommentiert.

Medizinische Unterlagen sollten nicht per unverschlüsselter E-Mail übertragen
werden. Dafür ist ein gesonderter, gesicherter Upload nötig.

### 3.7 Patientenstimmen

Falls der Bereich genutzt wird: Erfundene oder nicht überprüfbare Bewertungen
sind wettbewerbsrechtlich unzulässig. Ohne echte Bewertungen entfällt der
Abschnitt ersatzlos.

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

## 5. Barrierefreiheit

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

## 6. Nach dem Livegang

- Google Search Console einrichten und `sitemap.xml` einreichen
- Google Unternehmensprofil anlegen
- Darstellung auf einem echten Mobilgerät prüfen
- Ladezeiten mit PageSpeed Insights messen
- Formularversand mit einer echten Anfrage testen

---

## 7. Technische Eckdaten

| | |
|---|---|
| Seiten | 7 |
| Externe Requests | 0 |
| JavaScript | 3 Dateien, zusammen rund 18 KB, mit `defer` geladen |
| Schriften | Systemschriften, keine Webfonts |
| Breakpoints geprüft | 320, 375, 390, 430, 768, 1024, 1440, 1920 px |
| Browser | alle aktuellen; das Logo hat für ältere Umgebungen einen PNG-Rückfall |
