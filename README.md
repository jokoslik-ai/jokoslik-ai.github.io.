# Performatic – Website

Statische One-Page-Landingpage, komplett ohne Build-Prozess. Einfach die Dateien
in diesem Ordner (`index.html`, `styles.css`, `script.js`, `impressum.html`,
`datenschutz.html`) auf einen beliebigen Webspace/Hoster hochladen – fertig.

## 1. Vor dem Livegang unbedingt anpassen

- **Formular-Dienst:** In `index.html` im `<form ... action="...">` die
  Formspree-ID eintragen (siehe Abschnitt 3 unten). Ohne das kommen keine
  Anfragen bei dir an.
- **Impressum** (`impressum.html`): echten Namen, Adresse, Kontaktdaten,
  ggf. USt-ID eintragen. Rechtlich in Deutschland Pflicht.
- **Datenschutzerklärung** (`datenschutz.html`): Verantwortlichen eintragen,
  Formular-Dienst bestätigen/anpassen, Löschfrist eintragen.
- **Footer-E-Mail** in `index.html` (`mailto:kontakt@performatic-deinedomain.de`)
  auf deine echte Adresse anpassen.
- **Preise** in `index.html` (Abschnitt "Leistungen") ggf. an deine finale
  Kalkulation anpassen – Vorschläge stehen im Konzept-Dokument.

## 2. Hosting-Optionen

Da du dich noch nicht auf einen Hoster festgelegt hast, hier die drei
gängigsten Optionen – die Seite läuft mit **jeder** davon, ohne Anpassung:

### Option A – Netlify (kostenlos, empfohlen für den einfachsten Start)
1. Kostenlosen Account auf netlify.com anlegen.
2. Diesen Ordner per Drag & Drop in "Sites" hochladen (oder mit GitHub verbinden).
3. Fertig – Netlify vergibt automatisch eine `*.netlify.app`-Domain, eine eigene
   Domain kann später verbunden werden.
4. **Bonus:** Wenn du auf Netlify hostest, kannst du statt Formspree auch die
   eingebauten "Netlify Forms" nutzen (spart den externen Dienst). Dazu im
   `<form>`-Tag in `index.html` zusätzlich `data-netlify="true"` und
   `netlify-honeypot="bot-field"` ergänzen – melde dich, falls du das möchtest,
   dann baue ich das um.

### Option B – GitHub Pages (kostenlos)
1. Repository erstellen, diesen Ordner hochladen (Inhalt von `site/` direkt
   ins Repo-Root).
2. In den Repo-Einstellungen unter "Pages" den Branch aktivieren.
3. Formular läuft wie hier eingerichtet über Formspree (siehe unten).

### Option C – Klassisches Webhosting (z. B. IONOS, Strato, All-Inkl)
1. Dateien per FTP/SFTP in das öffentliche Verzeichnis (häufig `htdocs`,
   `www` oder `public_html`) hochladen.
2. Formular läuft ebenfalls über Formspree – kein PHP/Backend nötig.

## 3. Formspree einrichten (Formular-Dienst, ca. 5 Minuten)

Formspree fängt die Formulardaten ab und leitet sie dir per E-Mail zu –
ganz ohne eigenes Backend, funktioniert auf jedem der obigen Hosting-Optionen.

1. Kostenlosen Account auf formspree.io anlegen (bis 50 Anfragen/Monat gratis).
2. Neues Formular ("New Form") anlegen, deine E-Mail-Adresse bestätigen.
3. Formspree zeigt dir eine Endpoint-URL wie `https://formspree.io/f/xyzabcde`.
4. In `index.html` die Zeile

   ```html
   action="https://formspree.io/f/DEINE-FORMSPREE-ID"
   ```

   durch deine echte URL ersetzen.
5. Testanfrage über das Live-Formular senden und prüfen, ob die Mail ankommt.

## 4. Was technisch drinsteckt

- Reines HTML/CSS/JS, keine Frameworks, keine externen Font- oder
  Analytics-Requests standardmäßig (bewusst DSGVO-freundlich, siehe
  Konzept-Dokument Punkt 5).
- Formular funktioniert auch ohne JavaScript (klassischer POST-Fallback);
  mit JavaScript läuft die Übermittlung ohne Seitenneuladen (`script.js`).
- Responsive: mobile Navigation per Hamburger-Menü, alle Grids brechen auf
  Mobilgeräten auf eine Spalte um.

## 5. Optionale nächste Schritte

- Datenschutzfreundliches Analytics ergänzen (z. B. Plausible oder Fathom,
  beide ohne Cookie-Banner-Pflicht möglich) – nicht im Lieferumfang enthalten.
- Eigene Domain verbinden (z. B. `performatic.de`, `.io`, o. ä.).
- Favicon ergänzen (aktuell keins hinterlegt).
