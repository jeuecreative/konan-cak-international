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

  var BEHANDLUNGEN = [
    {
      name: 'Haartransplantation',
      bereich: 'Haar',
      ziel: 'leistungen.html#haartransplantation',
      wappen: 'assets/images/wappen-haar.svg',
      begriffe: ['haar', 'haare', 'haartransplantation', 'haarausfall', 'fue', 'dhi', 'saphir', 'grafts', 'haarverpflanzung', 'glatze', 'geheimratsecken', 'barthaare', 'augenbrauen', 'prp']
    },
    {
      name: 'Zahnimplantate',
      bereich: 'Zahnmedizin',
      ziel: 'leistungen.html#zahnmedizin',
      wappen: 'assets/images/wappen-dental.svg',
      begriffe: ['zahn', 'zähne', 'zahne', 'implantat', 'implantate', 'zahnimplantat', 'krone', 'kronen', 'brücke', 'bruecke', 'zahnersatz', 'knochenaufbau']
    },
    {
      name: 'Veneers und Zahnästhetik',
      bereich: 'Zahnmedizin',
      ziel: 'leistungen.html#zahnmedizin',
      wappen: 'assets/images/wappen-dental.svg',
      begriffe: ['veneer', 'veneers', 'hollywood', 'smile', 'bleaching', 'zahnästhetik', 'zahnaesthetik', 'verblendschalen', 'weiße zähne']
    },
    {
      name: 'Nasenkorrektur',
      bereich: 'Ästhetik',
      ziel: 'leistungen.html#plastische-chirurgie',
      wappen: 'assets/images/wappen-aesthetik.svg',
      begriffe: ['nase', 'nasenkorrektur', 'rhinoplastik', 'rhinoplastie', 'nasen op', 'höcker', 'nasenscheidewand', 'septum']
    },
    {
      name: 'Ästhetisch-plastische Chirurgie',
      bereich: 'Ästhetik',
      ziel: 'leistungen.html#plastische-chirurgie',
      wappen: 'assets/images/wappen-aesthetik.svg',
      begriffe: ['facelift', 'lidstraffung', 'augenlid', 'brust', 'bruststraffung', 'brustvergrößerung', 'bauchdeckenstraffung', 'fettabsaugung', 'liposuktion', 'bodycontouring', 'straffung', 'schönheits op', 'plastische chirurgie', 'ästhetik', 'aesthetik']
    },
    {
      name: 'Augenlasern',
      bereich: 'Augenheilkunde',
      ziel: 'leistungen.html#augenheilkunde',
      wappen: 'assets/images/wappen-auge.svg',
      begriffe: ['auge', 'augen', 'augenlasern', 'lasik', 'femto', 'smile', 'prk', 'brille', 'kurzsichtig', 'weitsichtig', 'dioptrien', 'sehschwäche']
    },
    {
      name: 'Linsenchirurgie und Katarakt',
      bereich: 'Augenheilkunde',
      ziel: 'leistungen.html#augenheilkunde',
      wappen: 'assets/images/wappen-auge.svg',
      begriffe: ['linse', 'linsen', 'kunstlinse', 'katarakt', 'grauer star', 'icl', 'multifokal']
    },
    {
      name: 'Knie- und Hüftprothese',
      bereich: 'Orthopädie',
      ziel: 'leistungen.html#orthopaedie',
      wappen: 'assets/images/wappen-mehr.svg',
      begriffe: ['knie', 'hüfte', 'huefte', 'prothese', 'endoprothese', 'gelenk', 'arthrose', 'orthopädie', 'orthopaedie', 'arthroskopie', 'meniskus', 'wirbelsäule', 'bandscheibe', 'schulter']
    },
    {
      name: 'Schlauchmagen und Magenbypass',
      bereich: 'Adipositas',
      ziel: 'leistungen.html#adipositas',
      wappen: 'assets/images/wappen-bariatrie.svg',
      begriffe: ['magen', 'schlauchmagen', 'sleeve', 'bypass', 'magenbypass', 'magenballon', 'adipositas', 'abnehmen', 'übergewicht', 'uebergewicht', 'bariatrisch', 'bmi', 'magenverkleinerung']
    },
    {
      name: 'Vorsorge-Check-up',
      bereich: 'Weitere',
      ziel: 'kontakt.html#anfrage',
      wappen: 'assets/images/wappen-mehr.svg',
      begriffe: ['check', 'checkup', 'check-up', 'vorsorge', 'untersuchung', 'ganzkörper', 'screening', 'zweitmeinung']
    }
  ];

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
      leer.innerHTML = 'Dazu haben wir keinen passenden Eintrag. <a href="kontakt.html#anfrage">Schildern Sie uns Ihr Anliegen</a> — wir melden uns zurück.';
      liste.appendChild(leer);
      liste.hidden = false;
      melden('Keine passende Behandlung gefunden.');
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
      ? '1 Vorschlag gefunden.'
      : treffer.length + ' Vorschläge gefunden.');
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
      window.location.href = 'kontakt.html#anfrage';
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
