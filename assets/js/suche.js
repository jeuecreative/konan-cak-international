/* =====================================================================
   KONAN CAK INTERNATIONAL — suche.js
   Behandlungssuche im Hero.

   Arbeitsweise:
   Die Suche läuft vollständig im Browser gegen eine feste Liste von
   Behandlungen mit Synonymen. Es wird nichts an einen Server gesendet
   und kein externer Dienst eingebunden.

   Ergebnis: Sprung auf den passenden Abschnitt der Leistungsseite.
   Ohne Treffer: Hinweis mit Verweis auf das Kontaktformular.

   PFLEGE:
   Neue Behandlungen in BEHANDLUNGEN ergänzen. "begriffe" enthält alles,
   wonach Patientinnen und Patienten tatsächlich suchen — auch
   umgangssprachliche Bezeichnungen und häufige Schreibfehler.
   ===================================================================== */
(function () {
  'use strict';

  /* Sprache der Seite bestimmt Datensatz, Ziele und Oberflächentexte. */
  var SPRACHE = (document.documentElement.lang || 'de').slice(0, 2).toLowerCase();
  if (SPRACHE !== 'en') SPRACHE = 'de';

  /* Von einer englischen Seite aus liegen die Bilder eine Ebene höher. */
  var BILDER = SPRACHE === 'en' ? '../assets/images/' : 'assets/images/';

  var SEITEN = {
    de: { leistungen: 'leistungen.html', kontakt: 'kontakt.html#anfrage' },
    en: { leistungen: 'treatments.html', kontakt: 'contact.html#enquiry' }
  }[SPRACHE];

  var ANKER = {
    de: { haar: 'haartransplantation', zahn: 'zahnmedizin', aesthetik: 'plastische-chirurgie',
          auge: 'augenheilkunde', ortho: 'orthopaedie', bariatrie: 'adipositas' },
    en: { haar: 'hair-transplant', zahn: 'dentistry', aesthetik: 'plastic-surgery',
          auge: 'ophthalmology', ortho: 'orthopaedics', bariatrie: 'bariatric' }
  }[SPRACHE];

  var TEXTE = {
    de: {
      keinTreffer: 'Dazu haben wir keinen passenden Eintrag. <a href="' + SEITEN.kontakt + '">Schildern Sie uns Ihr Anliegen</a> — wir melden uns zurück.',
      keinerGefunden: 'Keine passende Behandlung gefunden.',
      einVorschlag: '1 Vorschlag gefunden.',
      mehrereVorschlaege: ' Vorschläge gefunden.'
    },
    en: {
      keinTreffer: 'We have no matching entry for that. <a href="' + SEITEN.kontakt + '">Tell us what you need</a> — we will get back to you.',
      keinerGefunden: 'No matching treatment found.',
      einVorschlag: '1 suggestion found.',
      mehrereVorschlaege: ' suggestions found.'
    }
  }[SPRACHE];

  function ziel(schluessel) {
    return SEITEN.leistungen + '#' + ANKER[schluessel];
  }

  /* Die Suchbegriffe sind je Sprache gepflegt. Neue Begriffe hier
     ergänzen — es ist bewusst eine einfache Liste, damit sie auch ohne
     Programmierkenntnisse erweitert werden kann.                      */
  var DATEN = {
    de: [
      { name: 'Haartransplantation', bereich: 'Haar', schluessel: 'haar', wappen: 'wappen-haar.svg',
        begriffe: ['haar', 'haare', 'haartransplantation', 'haarausfall', 'fue', 'dhi', 'saphir', 'grafts', 'haarverpflanzung', 'glatze', 'geheimratsecken', 'barthaare', 'augenbrauen', 'prp'] },
      { name: 'Zahnimplantate', bereich: 'Zahnmedizin', schluessel: 'zahn', wappen: 'wappen-dental.svg',
        begriffe: ['zahn', 'zähne', 'zahne', 'implantat', 'implantate', 'zahnimplantat', 'krone', 'kronen', 'brücke', 'bruecke', 'zahnersatz', 'knochenaufbau'] },
      { name: 'Veneers und Zahnästhetik', bereich: 'Zahnmedizin', schluessel: 'zahn', wappen: 'wappen-dental.svg',
        begriffe: ['veneer', 'veneers', 'hollywood', 'smile', 'bleaching', 'zahnästhetik', 'zahnaesthetik', 'verblendschalen', 'weiße zähne'] },
      { name: 'Nasenkorrektur', bereich: 'Ästhetik', schluessel: 'aesthetik', wappen: 'wappen-aesthetik.svg',
        begriffe: ['nase', 'nasenkorrektur', 'rhinoplastik', 'rhinoplastie', 'nasen op', 'höcker', 'nasenscheidewand', 'septum'] },
      { name: 'Ästhetisch-plastische Chirurgie', bereich: 'Ästhetik', schluessel: 'aesthetik', wappen: 'wappen-aesthetik.svg',
        begriffe: ['facelift', 'lidstraffung', 'augenlid', 'brust', 'bruststraffung', 'brustvergrößerung', 'bauchdeckenstraffung', 'fettabsaugung', 'liposuktion', 'bodycontouring', 'straffung', 'schönheits op', 'plastische chirurgie', 'ästhetik', 'aesthetik'] },
      { name: 'Augenlasern', bereich: 'Augenheilkunde', schluessel: 'auge', wappen: 'wappen-auge.svg',
        begriffe: ['auge', 'augen', 'augenlasern', 'lasik', 'femto', 'smile', 'prk', 'brille', 'kurzsichtig', 'weitsichtig', 'dioptrien', 'sehschwäche'] },
      { name: 'Linsenchirurgie und Katarakt', bereich: 'Augenheilkunde', schluessel: 'auge', wappen: 'wappen-auge.svg',
        begriffe: ['linse', 'linsen', 'kunstlinse', 'katarakt', 'grauer star', 'icl', 'multifokal'] },
      { name: 'Knie- und Hüftprothese', bereich: 'Orthopädie', schluessel: 'ortho', wappen: 'wappen-orthopaedie.svg',
        begriffe: ['knie', 'hüfte', 'huefte', 'prothese', 'endoprothese', 'gelenk', 'arthrose', 'orthopädie', 'orthopaedie', 'arthroskopie', 'meniskus', 'wirbelsäule', 'bandscheibe', 'schulter'] },
      { name: 'Schlauchmagen und Magenbypass', bereich: 'Adipositas', schluessel: 'bariatrie', wappen: 'wappen-bariatrie.svg',
        begriffe: ['magen', 'schlauchmagen', 'sleeve', 'bypass', 'magenbypass', 'magenballon', 'adipositas', 'abnehmen', 'übergewicht', 'uebergewicht', 'bariatrisch', 'bmi', 'magenverkleinerung'] },
      { name: 'Vorsorge-Check-up', bereich: 'Weitere', schluessel: null, wappen: 'wappen-mehr.svg',
        begriffe: ['check', 'checkup', 'check-up', 'vorsorge', 'untersuchung', 'ganzkörper', 'screening', 'zweitmeinung'] }
    ],
    en: [
      { name: 'Hair transplant', bereich: 'Hair', schluessel: 'haar', wappen: 'wappen-haar.svg',
        begriffe: ['hair', 'hair transplant', 'hair loss', 'balding', 'bald', 'fue', 'dhi', 'sapphire', 'grafts', 'receding hairline', 'beard', 'eyebrows', 'prp', 'hairline'] },
      { name: 'Dental implants', bereich: 'Dentistry', schluessel: 'zahn', wappen: 'wappen-dental.svg',
        begriffe: ['tooth', 'teeth', 'dental', 'dentist', 'implant', 'implants', 'crown', 'crowns', 'bridge', 'bridges', 'dentures', 'bone graft', 'missing teeth'] },
      { name: 'Veneers and cosmetic dentistry', bereich: 'Dentistry', schluessel: 'zahn', wappen: 'wappen-dental.svg',
        begriffe: ['veneer', 'veneers', 'hollywood smile', 'whitening', 'bleaching', 'cosmetic dentistry', 'white teeth', 'smile makeover'] },
      { name: 'Rhinoplasty', bereich: 'Aesthetics', schluessel: 'aesthetik', wappen: 'wappen-aesthetik.svg',
        begriffe: ['nose', 'nose job', 'rhinoplasty', 'septum', 'septoplasty', 'nasal hump', 'nose surgery'] },
      { name: 'Aesthetic plastic surgery', bereich: 'Aesthetics', schluessel: 'aesthetik', wappen: 'wappen-aesthetik.svg',
        begriffe: ['facelift', 'eyelid', 'blepharoplasty', 'breast', 'breast lift', 'breast augmentation', 'tummy tuck', 'abdominoplasty', 'liposuction', 'body contouring', 'arm lift', 'plastic surgery', 'cosmetic surgery', 'aesthetic'] },
      { name: 'Laser eye surgery', bereich: 'Ophthalmology', schluessel: 'auge', wappen: 'wappen-auge.svg',
        begriffe: ['eye', 'eyes', 'laser eye', 'lasik', 'femto', 'smile', 'prk', 'glasses', 'short sighted', 'long sighted', 'astigmatism', 'vision', 'eyesight'] },
      { name: 'Lens surgery and cataract', bereich: 'Ophthalmology', schluessel: 'auge', wappen: 'wappen-auge.svg',
        begriffe: ['lens', 'lenses', 'artificial lens', 'cataract', 'icl', 'multifocal', 'intraocular'] },
      { name: 'Knee and hip replacement', bereich: 'Orthopaedics', schluessel: 'ortho', wappen: 'wappen-orthopaedie.svg',
        begriffe: ['knee', 'hip', 'joint', 'prosthesis', 'replacement', 'arthritis', 'osteoarthritis', 'orthopaedic', 'orthopedic', 'arthroscopy', 'meniscus', 'spine', 'disc', 'shoulder'] },
      { name: 'Gastric sleeve and bypass', bereich: 'Bariatrics', schluessel: 'bariatrie', wappen: 'wappen-bariatrie.svg',
        begriffe: ['stomach', 'gastric', 'sleeve', 'bypass', 'gastric bypass', 'gastric balloon', 'obesity', 'weight loss', 'lose weight', 'bariatric', 'bmi', 'overweight'] },
      { name: 'Preventive check-up', bereich: 'More', schluessel: null, wappen: 'wappen-mehr.svg',
        begriffe: ['check', 'checkup', 'check-up', 'screening', 'preventive', 'examination', 'second opinion', 'full body'] }
    ]
  }[SPRACHE];

  var BEHANDLUNGEN = DATEN.map(function (e) {
    return {
      name: e.name,
      bereich: e.bereich,
      ziel: e.schluessel ? ziel(e.schluessel) : SEITEN.kontakt,
      wappen: BILDER + e.wappen,
      begriffe: e.begriffe
    };
  });

  var formular = document.querySelector('[data-suche]');
  if (!formular) return;

  var feld = formular.querySelector('input');
  var liste = formular.querySelector('[data-vorschlaege]');
  if (!feld || !liste) return;

  var meldung = formular.querySelector('[data-suchmeldung]');
  var aktuelleTreffer = [];
  var markiert = -1;

  // Screenreader erfahren ueber diesen Bereich, wie viele Vorschlaege es gibt.
  function melden(text) {
    if (meldung) meldung.textContent = text;
  }

  function normalisieren(text) {
    return text
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function suchen(eingabe) {
    var q = normalisieren(eingabe);
    if (q.length < 2) return [];

    var treffer = [];
    BEHANDLUNGEN.forEach(function (b) {
      var punkte = 0;
      var name = normalisieren(b.name);
      if (name.indexOf(q) === 0) punkte += 6;
      else if (name.indexOf(q) > -1) punkte += 4;

      b.begriffe.forEach(function (begriff) {
        var n = normalisieren(begriff);
        if (n === q) punkte += 8;
        else if (n.indexOf(q) === 0) punkte += 5;
        else if (n.indexOf(q) > -1) punkte += 2;
      });

      if (punkte > 0) treffer.push({ eintrag: b, punkte: punkte });
    });

    treffer.sort(function (a, b) { return b.punkte - a.punkte; });

    // Doppelte Ziele zusammenfassen
    var gesehen = {};
    var ergebnis = [];
    treffer.forEach(function (t) {
      var schluessel = t.eintrag.name;
      if (gesehen[schluessel]) return;
      gesehen[schluessel] = true;
      ergebnis.push(t.eintrag);
    });

    return ergebnis.slice(0, 6);
  }

  function zeichnen(treffer, eingabe) {
    liste.innerHTML = '';
    markiert = -1;

    if (!eingabe || eingabe.trim().length < 2) {
      liste.hidden = true;
      melden('');
      return;
    }

    if (!treffer.length) {
      var leer = document.createElement('li');
      leer.className = 'suche-leer';
      leer.innerHTML = TEXTE.keinTreffer;
      liste.appendChild(leer);
      liste.hidden = false;
      melden(TEXTE.keinerGefunden);
      return;
    }

    treffer.forEach(function (b) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = b.ziel;

      var bild = document.createElement('img');
      bild.src = b.wappen;
      bild.alt = '';
      bild.width = 26;
      bild.height = 31;
      bild.loading = 'lazy';

      var name = document.createElement('span');
      name.textContent = b.name;

      var bereich = document.createElement('span');
      bereich.className = 'treffer-bereich';
      bereich.textContent = b.bereich;

      a.appendChild(bild);
      a.appendChild(name);
      a.appendChild(bereich);
      li.appendChild(a);
      liste.appendChild(li);
    });

    liste.hidden = false;
    melden(treffer.length === 1
      ? TEXTE.einVorschlag
      : treffer.length + TEXTE.mehrereVorschlaege);
  }

  function markierungSetzen(richtung) {
    var punkte = liste.querySelectorAll('li a');
    if (!punkte.length) return;
    markiert += richtung;
    if (markiert < 0) markiert = punkte.length - 1;
    if (markiert >= punkte.length) markiert = 0;
    for (var i = 0; i < punkte.length; i++) {
      punkte[i].parentNode.classList.toggle('ist-aktiv', i === markiert);
    }
    punkte[markiert].focus();
  }

  feld.addEventListener('input', function () {
    aktuelleTreffer = suchen(feld.value);
    zeichnen(aktuelleTreffer, feld.value);
  });

  feld.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); markierungSetzen(1); }
    if (e.key === 'Escape') { liste.hidden = true; melden(''); }
  });

  liste.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); markierungSetzen(1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); markierungSetzen(-1); }
    if (e.key === 'Escape') {
      liste.hidden = true;
      melden('');
      feld.focus();
    }
  });

  formular.addEventListener('submit', function (e) {
    e.preventDefault();
    var treffer = suchen(feld.value);
    if (treffer.length) {
      window.location.href = treffer[0].ziel;
    } else if (feld.value.trim().length) {
      window.location.href = SEITEN.kontakt;
    } else {
      feld.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (formular.contains(e.target)) return;
    liste.hidden = true;
    melden('');
  });

  // Beispiel-Begriffe unter der Suche
  var beispiele = document.querySelectorAll('[data-suchbegriff]');
  for (var i = 0; i < beispiele.length; i++) {
    beispiele[i].addEventListener('click', function () {
      feld.value = this.getAttribute('data-suchbegriff');
      feld.focus();
      aktuelleTreffer = suchen(feld.value);
      zeichnen(aktuelleTreffer, feld.value);
    });
  }
})();
