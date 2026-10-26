/* =====================================================================
   KONAN CAK INTERNATIONAL — main.js
   Vanilla JavaScript, keine Abhängigkeiten.
   Funktionen:
   1. Header-Höhe als CSS-Variable (für Mobile-Menü-Positionierung)
   2. Mobile-Navigation (Toggle, Esc, Klick außerhalb, Resize)
   3. Aktiven Menüpunkt markieren
   4. Scroll-Reveal via IntersectionObserver (respektiert reduced motion)
   5. Anfrageformular: baut aus den Feldern eine fertige E-Mail
   ===================================================================== */
(function () {
  'use strict';

  /* -- 1. Header-Höhe ------------------------------------------------ */
  var header = document.querySelector('.header');

  function headerHoeheSetzen() {
    if (!header) return;
    document.documentElement.style.setProperty('--header-hoehe', header.offsetHeight + 'px');
  }

  /* -- 2. Mobile-Navigation ------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hauptnavigation');

  function menueSchliessen() {
    if (!toggle || !nav) return;
    nav.classList.remove('ist-offen');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var offen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!offen));
      nav.classList.toggle('ist-offen', !offen);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('ist-offen')) {
        menueSchliessen();
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('ist-offen')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      menueSchliessen();
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') menueSchliessen();
    });
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      headerHoeheSetzen();
      if (window.innerWidth > 960) menueSchliessen();
    }, 120);
  });

  /* -- 3. Aktiven Menüpunkt markieren -------------------------------- */
  (function aktivenLinkMarkieren() {
    var pfad = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-liste a');
    for (var i = 0; i < links.length; i++) {
      var ziel = links[i].getAttribute('href');
      if (ziel === pfad) links[i].setAttribute('aria-current', 'page');
    }
  })();

  /* -- 4. Scroll-Reveal ---------------------------------------------- */
  (function reveal() {
    var elemente = document.querySelectorAll('.reveal');
    if (!elemente.length) return;

    var reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduziert || !('IntersectionObserver' in window)) {
      for (var i = 0; i < elemente.length; i++) elemente[i].classList.add('ist-sichtbar');
      return;
    }

    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (eintrag) {
        if (!eintrag.isIntersecting) return;
        eintrag.target.classList.add('ist-sichtbar');
        beobachter.unobserve(eintrag.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    for (var j = 0; j < elemente.length; j++) beobachter.observe(elemente[j]);
  })();

  /* -- 5. Anfrageformular → vorbereitete E-Mail ----------------------- */
  /* Die Website versendet selbst nichts. Beim Absenden baut das Skript
     aus den Feldern Betreff und Text einer E-Mail und öffnet damit das
     E-Mail-Programm der Besucherin.

     Das hat drei Vorteile: kein Server und kein Formulardienst nötig,
     keine Gesundheitsdaten laufen über die Website, und die Absenderin
     sieht vor dem Versand genau, was sie verschickt.

     Die Empfängeradresse steht im Attribut data-mailto am Formular,
     nicht hier im Skript — so lässt sie sich ohne Programmierkenntnisse
     ändern. Ohne JavaScript greift der mailto-Versand aus dem
     action-Attribut; die E-Mail ist dann schlichter formatiert.      */
  (function anfrageAlsMail() {
    var forms = document.querySelectorAll('form[data-formular]');
    if (!forms.length) return;

    /* Konservative Obergrenze: ältere E-Mail-Programme schneiden
       längere mailto-Adressen stillschweigend ab.                    */
    var MAXLAENGE = 1900;

    var sprache = (document.documentElement.lang || 'de').slice(0, 2).toLowerCase();
    if (sprache !== 'en') sprache = 'de';

    var T = {
      de: {
        betreff: 'Anfrage Ersteinschätzung',
        kopf: 'Anfrage über das Formular auf konancak-international.com',
        consent: 'Datenschutzerklärung gelesen und akzeptiert: ja',
        leer: '—',
        gekuerzt: '[Text gekürzt — bitte im E-Mail-Programm ergänzen]',
        geoeffnet: 'Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage. Bitte prüfen Sie die Angaben und senden Sie die E-Mail ab.',
        ersatz: 'Falls sich kein E-Mail-Programm öffnet, schreiben Sie uns bitte direkt an ',
        kopieren: 'Angaben in die Zwischenablage kopieren',
        kopiert: 'Die Angaben liegen in der Zwischenablage. Sie können sie jetzt in eine E-Mail einfügen.',
        kopierfehler: 'Das Kopieren hat nicht geklappt. Bitte markieren Sie Ihre Angaben im Formular und kopieren Sie sie von Hand.',
        fuss: 'Diese Nachricht wurde aus dem Anfrageformular der Website erzeugt.'
      },
      en: {
        betreff: 'Request for an initial assessment',
        kopf: 'Enquiry via the form on konancak-international.com',
        consent: 'Privacy policy read and accepted: yes',
        leer: '—',
        gekuerzt: '[text shortened — please complete it in your email programme]',
        geoeffnet: 'Your email programme is opening with the completed enquiry. Please check the details and send the email.',
        ersatz: 'If no email programme opens, please write to us directly at ',
        kopieren: 'Copy details to clipboard',
        kopiert: 'The details are on your clipboard. You can now paste them into an email.',
        kopierfehler: 'Copying did not work. Please select your details in the form and copy them by hand.',
        fuss: 'This message was generated from the enquiry form on the website.'
      }
    }[sprache];

    Array.prototype.forEach.call(forms, function (form) {
      var adresse = form.getAttribute('data-mailto');
      if (!adresse) return;

      var status = form.querySelector('[data-formstatus]');
      var kopierknopf = null;

      /* Die Beschriftung kommt aus dem zugehörigen <label>. Ein neues
         Feld im Formular landet dadurch automatisch in der E-Mail —
         am Skript muss nichts geändert werden.                       */
      function beschriftung(feld) {
        var label = feld.id ? form.querySelector('label[for="' + feld.id + '"]') : null;
        var text = label ? label.textContent : (feld.name || '');
        return text.replace(/\s*\*\s*$/, '').replace(/\s+/g, ' ').trim();
      }

      function nachrichtBauen() {
        var felder = form.querySelectorAll('input, select, textarea');
        var zeilen = [T.kopf, ''];
        var absaetze = [];

        Array.prototype.forEach.call(felder, function (feld) {
          if (feld.type === 'checkbox' || feld.type === 'submit' || feld.type === 'button') return;
          var inhalt = (feld.value || '').trim();
          if (feld.tagName === 'TEXTAREA') {
            absaetze.push(beschriftung(feld) + ':\n' + (inhalt || T.leer));
          } else {
            zeilen.push(beschriftung(feld) + ': ' + (inhalt || T.leer));
          }
        });

        if (absaetze.length) zeilen.push('', absaetze.join('\n\n'));
        if (form.querySelector('input[type="checkbox"]:checked')) zeilen.push('', T.consent);
        zeilen.push('', '--', T.fuss);
        return zeilen.join('\n');
      }

      function betreffBauen() {
        var teile = [T.betreff];
        var bereich = form.querySelector('[name="bereich"]');
        var vorname = form.querySelector('[name="vorname"]');
        var nachname = form.querySelector('[name="nachname"]');
        if (bereich && bereich.value) teile.push(bereich.value);
        var person = ((vorname ? vorname.value : '') + ' ' + (nachname ? nachname.value : '')).trim();
        if (person) teile.push(person);
        return teile.join(' – ');
      }

      function mailBauen() {
        var betreff = betreffBauen();
        var text = nachrichtBauen();
        var marker = '';

        function url(inhalt) {
          return 'mailto:' + adresse
            + '?subject=' + encodeURIComponent(betreff)
            + '&body=' + encodeURIComponent(inhalt);
        }

        var ziel = url(text);
        while (ziel.length > MAXLAENGE && text.length > 240) {
          text = text.slice(0, text.length - 120);
          marker = '\n' + T.gekuerzt;
          ziel = url(text + marker);
        }
        return { url: ziel, text: text + marker };
      }

      /* Ersatzweg für Geräte ohne eingerichtetes E-Mail-Programm:
         ein Knopf, der dieselben Angaben in die Zwischenablage legt. */
      function kopierknopfZeigen(text) {
        if (!kopierknopf) {
          kopierknopf = document.createElement('button');
          kopierknopf.type = 'button';
          kopierknopf.className = 'btn btn-linie btn-block form-ersatz';
          kopierknopf.textContent = T.kopieren;
          kopierknopf.addEventListener('click', function () {
            kopieren(kopierknopf.getAttribute('data-text') || '');
          });
          if (status && status.parentNode) {
            status.parentNode.insertBefore(kopierknopf, status.nextSibling);
          } else {
            form.appendChild(kopierknopf);
          }
        }
        kopierknopf.setAttribute('data-text', text);
      }

      function kopieren(text) {
        function melden(erfolg) {
          if (!status) return;
          status.textContent = erfolg ? T.kopiert : T.kopierfehler;
          status.hidden = false;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { melden(true); },
                                                   function () { melden(altKopieren(text)); });
          return;
        }
        melden(altKopieren(text));
      }

      function altKopieren(text) {
        var feld = document.createElement('textarea');
        feld.value = text;
        feld.setAttribute('readonly', '');
        feld.className = 'kopierfeld';
        document.body.appendChild(feld);
        feld.select();
        var erfolg = false;
        try { erfolg = document.execCommand('copy'); } catch (e) { erfolg = false; }
        document.body.removeChild(feld);
        return erfolg;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var mail = mailBauen();

        if (status) {
          /* Nur eigene Texte und die Empfängeradresse — keine Eingaben
             der Besucherin, damit hier kein Markup entstehen kann.    */
          status.innerHTML = T.geoeffnet + ' ' + T.ersatz
            + '<a href="mailto:' + adresse + '">' + adresse + '</a>.';
          status.hidden = false;
        }

        kopierknopfZeigen(mail.text);
        window.location.href = mail.url;
      });
    });
  })();

  /* -- Start ---------------------------------------------------------- */
  headerHoeheSetzen();
  window.addEventListener('load', headerHoeheSetzen);
})();
