/* =====================================================================
   KONAN CAK INTERNATIONAL — consent.js
   Einwilligungsverwaltung nach § 25 TDDDG und DSGVO.

   Grundsatz: Vor der Einwilligung wird nichts geladen, was nicht
   technisch notwendig ist. Skripte werden erst nach Zustimmung
   nachgeladen.

   Aufbau:
   1. Konfiguration der Kategorien
   2. Speicherung der Entscheidung (First-Party-Cookie, 6 Monate)
   3. Google Consent Mode v2 (Standard: alles abgelehnt)
   4. Banner und Einstellungsdialog aufbauen
   5. Dienste nach Einwilligung nachladen
   6. Öffentliche Schnittstelle: window.KCConsent

   EINBAU VON DIENSTEN:
   Siehe Abschnitt 5. Dort werden die Platzhalter-IDs eingetragen.
   Ohne eingetragene IDs passiert nichts — die Kategorien bleiben
   leer und es wird kein externes Skript geladen.
   ===================================================================== */
(function () {
  'use strict';

  /* -- 1. Konfiguration ---------------------------------------------- */
  var COOKIE_NAME = 'kc_consent';
  var COOKIE_TAGE = 180;
  var VERSION = 1; // bei Änderung der Dienste erhöhen: erzwingt erneute Abfrage

  var KATEGORIEN = [
    {
      id: 'notwendig',
      titel: 'Notwendig',
      text: 'Erforderlich für den Betrieb der Website. Speichert ausschließlich Ihre Auswahl in diesem Fenster. Diese Kategorie lässt sich nicht abwählen.',
      pflicht: true
    },
    {
      id: 'statistik',
      titel: 'Statistik',
      text: 'Hilft uns zu verstehen, wie die Website genutzt wird. Wird nur mit Ihrer Einwilligung geladen.',
      pflicht: false
    },
    {
      id: 'marketing',
      titel: 'Marketing',
      text: 'Ermöglicht die Messung von Werbekampagnen. Wird nur mit Ihrer Einwilligung geladen.',
      pflicht: false
    },
    {
      id: 'extern',
      titel: 'Externe Inhalte',
      text: 'Karten und eingebettete Inhalte von Drittanbietern. Beim Laden wird Ihre IP-Adresse an den Anbieter übertragen.',
      pflicht: false
    }
  ];

  /* -- 2. Speicherung ------------------------------------------------- */
  function cookieLesen(name) {
    var teile = document.cookie.split('; ');
    for (var i = 0; i < teile.length; i++) {
      var paar = teile[i].split('=');
      if (paar[0] === name) return decodeURIComponent(paar.slice(1).join('='));
    }
    return null;
  }

  function cookieSchreiben(name, wert, tage) {
    var d = new Date();
    d.setTime(d.getTime() + tage * 864e5);
    var sicher = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(wert) +
      '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax' + sicher;
  }

  function standard() {
    return { notwendig: true, statistik: false, marketing: false, extern: false, version: VERSION };
  }

  /* Rückfalllösung: Wenn Cookies nicht verfügbar sind (etwa beim Öffnen
     der Dateien direkt von der Festplatte), wird localStorage genutzt.  */
  function speicherSchreiben(wert) {
    cookieSchreiben(COOKIE_NAME, wert, COOKIE_TAGE);
    if (cookieLesen(COOKIE_NAME) === wert) return;
    try { window.localStorage.setItem(COOKIE_NAME, wert); } catch (e) {}
  }

  function speicherLesen() {
    var wert = cookieLesen(COOKIE_NAME);
    if (wert) return wert;
    try { return window.localStorage.getItem(COOKIE_NAME); } catch (e) { return null; }
  }

  function speicherLoeschen() {
    cookieSchreiben(COOKIE_NAME, '', -1);
    try { window.localStorage.removeItem(COOKIE_NAME); } catch (e) {}
  }

  function entscheidungLesen() {
    var roh = speicherLesen();
    if (!roh) return null;
    try {
      var d = JSON.parse(roh);
      if (d.version !== VERSION) return null;
      return d;
    } catch (e) {
      return null;
    }
  }

  function entscheidungSpeichern(d) {
    d.notwendig = true;
    d.version = VERSION;
    d.zeitpunkt = new Date().toISOString();
    speicherSchreiben(JSON.stringify(d));
    consentModeAktualisieren(d);
    diensteLaden(d);
    document.dispatchEvent(new CustomEvent('kc:consent', { detail: d }));
  }

  /* -- 3. Google Consent Mode v2 -------------------------------------- */
  /* Standardwerte werden gesetzt, bevor ein Google-Skript lädt.        */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function consentModeAktualisieren(d) {
    gtag('consent', 'update', {
      ad_storage: d.marketing ? 'granted' : 'denied',
      ad_user_data: d.marketing ? 'granted' : 'denied',
      ad_personalization: d.marketing ? 'granted' : 'denied',
      analytics_storage: d.statistik ? 'granted' : 'denied'
    });
  }

  /* -- 4. Oberfläche --------------------------------------------------- */
  var wurzel, banner, dialog, letzterFokus;

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text) e.textContent = text;
    return e;
  }

  function bannerAufbauen() {
    banner = el('div', 'consent-banner');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'consent-titel');
    banner.setAttribute('aria-describedby', 'consent-text');

    var box = el('div', 'consent-box');

    var titel = el('h2', 'consent-titel', 'Datenschutzeinstellungen');
    titel.id = 'consent-titel';

    var text = el('p', 'consent-text');
    text.id = 'consent-text';
    text.innerHTML = 'Wir verwenden Cookies und vergleichbare Technologien. Notwendige Cookies sind für den Betrieb der Website erforderlich. Weitere Cookies setzen wir nur mit Ihrer Einwilligung. Ihre Auswahl können Sie jederzeit ändern. Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a>.';

    var aktionen = el('div', 'consent-aktionen');

    var alle = el('button', 'btn btn-rot', 'Alle akzeptieren');
    alle.type = 'button';
    alle.addEventListener('click', function () {
      entscheidungSpeichern({ notwendig: true, statistik: true, marketing: true, extern: true });
      bannerSchliessen();
    });

    var nur = el('button', 'btn btn-linie', 'Nur notwendige');
    nur.type = 'button';
    nur.addEventListener('click', function () {
      entscheidungSpeichern(standard());
      bannerSchliessen();
    });

    var einst = el('button', 'consent-link', 'Einstellungen');
    einst.type = 'button';
    einst.addEventListener('click', function () { dialogOeffnen(); });

    aktionen.appendChild(alle);
    aktionen.appendChild(nur);
    aktionen.appendChild(einst);

    box.appendChild(titel);
    box.appendChild(text);
    box.appendChild(aktionen);
    banner.appendChild(box);
    wurzel.appendChild(banner);

    window.setTimeout(function () { banner.classList.add('ist-sichtbar'); }, 300);
  }

  function bannerSchliessen() {
    if (!banner) return;
    banner.classList.remove('ist-sichtbar');
    window.setTimeout(function () {
      if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      banner = null;
    }, 260);
  }

  function dialogOeffnen() {
    if (dialog) return;
    letzterFokus = document.activeElement;
    var aktuell = entscheidungLesen() || standard();

    dialog = el('div', 'consent-overlay');

    var box = el('div', 'consent-dialog');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-labelledby', 'consent-dialog-titel');

    var kopf = el('div', 'consent-dialog-kopf');
    var titel = el('h2', null, 'Datenschutzeinstellungen');
    titel.id = 'consent-dialog-titel';
    var schliessen = el('button', 'consent-schliessen', '×');
    schliessen.type = 'button';
    schliessen.setAttribute('aria-label', 'Einstellungen schließen');
    schliessen.addEventListener('click', dialogSchliessen);
    kopf.appendChild(titel);
    kopf.appendChild(schliessen);

    var koerper = el('div', 'consent-dialog-body');
    var einleitung = el('p', 'consent-text', 'Entscheiden Sie, welche Kategorien Sie zulassen möchten. Ihre Auswahl gilt für sechs Monate und lässt sich jederzeit über den Link im Fußbereich ändern.');
    koerper.appendChild(einleitung);

    KATEGORIEN.forEach(function (k) {
      var zeile = el('div', 'consent-kategorie');

      var kopfzeile = el('div', 'consent-kategorie-kopf');
      var label = el('label', 'consent-schalter');
      var box2 = document.createElement('input');
      box2.type = 'checkbox';
      box2.id = 'consent-' + k.id;
      box2.checked = k.pflicht ? true : !!aktuell[k.id];
      box2.disabled = !!k.pflicht;
      box2.setAttribute('data-kategorie', k.id);
      var spanTitel = el('span', 'consent-kategorie-titel', k.titel);
      label.appendChild(box2);
      label.appendChild(spanTitel);
      kopfzeile.appendChild(label);
      if (k.pflicht) kopfzeile.appendChild(el('span', 'consent-pflicht', 'Immer aktiv'));

      zeile.appendChild(kopfzeile);
      zeile.appendChild(el('p', 'consent-kategorie-text', k.text));
      koerper.appendChild(zeile);
    });

    var fuss = el('div', 'consent-dialog-fuss');

    var speichern = el('button', 'btn btn-rot', 'Auswahl speichern');
    speichern.type = 'button';
    speichern.addEventListener('click', function () {
      var d = standard();
      var felder = box.querySelectorAll('input[data-kategorie]');
      for (var i = 0; i < felder.length; i++) {
        d[felder[i].getAttribute('data-kategorie')] = felder[i].checked;
      }
      entscheidungSpeichern(d);
      dialogSchliessen();
      bannerSchliessen();
    });

    var alle = el('button', 'btn btn-linie', 'Alle akzeptieren');
    alle.type = 'button';
    alle.addEventListener('click', function () {
      entscheidungSpeichern({ notwendig: true, statistik: true, marketing: true, extern: true });
      dialogSchliessen();
      bannerSchliessen();
    });

    var links = el('p', 'consent-dialog-links');
    links.innerHTML = '<a href="datenschutz.html">Datenschutzerklärung</a> · <a href="impressum.html">Impressum</a>';

    fuss.appendChild(speichern);
    fuss.appendChild(alle);

    box.appendChild(kopf);
    box.appendChild(koerper);
    box.appendChild(fuss);
    box.appendChild(links);
    dialog.appendChild(box);
    wurzel.appendChild(dialog);

    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', tastatur);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialogSchliessen(); });

    var erstes = box.querySelector('button, input:not([disabled])');
    if (erstes) erstes.focus();
  }

  function dialogSchliessen() {
    if (!dialog) return;
    document.removeEventListener('keydown', tastatur);
    document.documentElement.style.overflow = '';
    if (dialog.parentNode) dialog.parentNode.removeChild(dialog);
    dialog = null;
    if (letzterFokus && letzterFokus.focus) letzterFokus.focus();
  }

  function tastatur(e) {
    if (e.key === 'Escape') { dialogSchliessen(); return; }
    if (e.key !== 'Tab' || !dialog) return;
    var fokussierbar = dialog.querySelectorAll('button, input:not([disabled]), a[href]');
    if (!fokussierbar.length) return;
    var erstes = fokussierbar[0];
    var letztes = fokussierbar[fokussierbar.length - 1];
    if (e.shiftKey && document.activeElement === erstes) { e.preventDefault(); letztes.focus(); }
    else if (!e.shiftKey && document.activeElement === letztes) { e.preventDefault(); erstes.focus(); }
  }

  /* -- 5. Dienste nach Einwilligung ------------------------------------ */
  /* Hier werden die Tracking-Dienste eingetragen. Solange die IDs leer  */
  /* sind, wird nichts geladen — die Website bleibt frei von Drittdaten. */

  var IDS = {
    ga4: '',          // z. B. 'G-XXXXXXXXXX'
    ads: '',          // z. B. 'AW-XXXXXXXXX'
    gtm: ''           // z. B. 'GTM-XXXXXXX'  (Alternative zu ga4/ads)
  };

  var geladen = {};

  function skriptLaden(url, id) {
    if (geladen[id]) return;
    geladen[id] = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = url;
    document.head.appendChild(s);
  }

  function diensteLaden(d) {
    if (d.statistik && IDS.ga4) {
      skriptLaden('https://www.googletagmanager.com/gtag/js?id=' + IDS.ga4, 'ga4');
      gtag('js', new Date());
      gtag('config', IDS.ga4, { anonymize_ip: true });
    }

    if (d.marketing && IDS.ads) {
      skriptLaden('https://www.googletagmanager.com/gtag/js?id=' + IDS.ads, 'ads');
      gtag('js', new Date());
      gtag('config', IDS.ads);
    }

    if ((d.statistik || d.marketing) && IDS.gtm) {
      skriptLaden('https://www.googletagmanager.com/gtm.js?id=' + IDS.gtm, 'gtm');
    }

    /* Externe Inhalte: Platzhalter mit data-consent="extern" werden
       nach Einwilligung durch das echte Einbettungsziel ersetzt.
       Beispiel im Markup:
       <div class="media" data-consent="extern" data-src="https://www.google.com/maps/embed?pb=...">…</div> */
    if (d.extern) {
      var platzhalter = document.querySelectorAll('[data-consent="extern"][data-src]');
      for (var i = 0; i < platzhalter.length; i++) {
        var p = platzhalter[i];
        var rahmen = document.createElement('iframe');
        rahmen.src = p.getAttribute('data-src');
        rahmen.title = p.getAttribute('data-titel') || 'Externer Inhalt';
        rahmen.loading = 'lazy';
        rahmen.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        rahmen.className = 'consent-iframe';
        p.parentNode.replaceChild(rahmen, p);
      }
    }
  }

  /* -- 6. Öffentliche Schnittstelle ------------------------------------ */
  window.KCConsent = {
    oeffnen: dialogOeffnen,
    status: function () { return entscheidungLesen() || standard(); },
    erlaubt: function (kategorie) {
      var d = entscheidungLesen();
      return !!(d && d[kategorie]);
    },
    zuruecksetzen: function () {
      speicherLoeschen();
      location.reload();
    }
  };

  /* -- Start ------------------------------------------------------------ */
  function start() {
    wurzel = document.createElement('div');
    wurzel.className = 'consent-wurzel';
    document.body.appendChild(wurzel);

    var vorhanden = entscheidungLesen();
    if (vorhanden) {
      consentModeAktualisieren(vorhanden);
      diensteLaden(vorhanden);
    } else {
      bannerAufbauen();
    }

    var ausloeser = document.querySelectorAll('[data-consent-oeffnen]');
    for (var i = 0; i < ausloeser.length; i++) {
      ausloeser[i].addEventListener('click', function (e) {
        e.preventDefault();
        dialogOeffnen();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
