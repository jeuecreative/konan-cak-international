/* =====================================================================
   KONAN CAK INTERNATIONAL — main.js
   Vanilla JavaScript, keine Abhängigkeiten.
   Funktionen:
   1. Header-Höhe als CSS-Variable (für Mobile-Menü-Positionierung)
   2. Mobile-Navigation (Toggle, Esc, Klick außerhalb, Resize)
   3. Aktiven Menüpunkt markieren
   4. Scroll-Reveal via IntersectionObserver (respektiert reduced motion)
   5. Formular: Basisvalidierung + Statusmeldung ohne Seitenreload
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

  /* -- 5. Formulare --------------------------------------------------- */
  /* Hinweis: Der Versand benötigt ein serverseitiges Skript (z. B.
     /kontakt.php) oder einen Formulardienst. Bis dahin verhindert das
     Skript den Versand und zeigt eine Statusmeldung an.               */
  (function formulare() {
    var forms = document.querySelectorAll('form[data-formular]');
    if (!forms.length) return;

    Array.prototype.forEach.call(forms, function (form) {
      var status = form.querySelector('[data-formstatus]');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        if (status) {
          status.textContent = 'Formularversand ist noch nicht angebunden. Bitte serverseitiges Skript oder Formulardienst hinterlegen.';
          status.hidden = false;
        }
      });
    });
  })();

  /* -- Start ---------------------------------------------------------- */
  headerHoeheSetzen();
  window.addEventListener('load', headerHoeheSetzen);
})();
