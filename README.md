# Performatic Intelligence – Website

Statische Website (HTML/CSS/JS) für `performatic-intelligence.de`, gehostet auf GitHub Pages.
GitHub Pages baut sie mit dem eingebauten Jekyll; es gibt keine eigene Build-Action und keine CI.

Ausführlicher Projektkontext (Geschäftsmodell, Phase, Design, Recht, offene Punkte): `CLAUDE.md`.

## Aufbau

- Seiten im Repo-Root (`index.html`, `leistungen.html`, `leistung-*.html`, `impressum.html`,
  `datenschutz.html`; `audit-score-dashboard.html` ist ein internes, nicht verlinktes Tool).
- Wiederkehrende Blöcke (Header, Footer, Modul-Karten, Preise, Kontaktformular) liegen nur einmal in
  `_includes/` – **Änderungen daran dort vornehmen**, nicht in den Seiten.
- Design: `tokens.css` (Design-Tokens) und `styles.css` (Komponenten), Schriften in `fonts/`
  (selbst gehostet, kein Google-Fonts-CDN).
- Formular: Formspree (Endpoint in `_includes/kontakt.html`), Logik in `script.js`.

## Lokale Vorschau

Ein Doppelklick auf eine HTML-Datei zeigt nur die `{% include %}`-Platzhalter. Stattdessen:

```
gem install jekyll -v 3.10.0   # Version wie GitHub Pages
jekyll serve                   # im Repo-Root, dann http://localhost:4000
```

## Design-System

Das Design wird primär in Claude Design gebaut und angepasst (Designsystem „Performatic Intelligence“)
und danach ins Repo übertragen (`tokens.css`), damit die Definitionen von dort automatisch und
dynamisch live gehen können. Quelle der Wahrheit ist Claude Design; Änderungen an den Tokens dort
vornehmen und dann übertragen.

## Pflege

- `sitemap.xml`: `lastmod` bei Änderungen an einer Seite anpassen. `audit-score-dashboard.html` bleibt
  bewusst draußen.
- Offene Punkte (Impressum, Consent-Konfiguration, Gewerbe-Start): `CLAUDE.md`, Abschnitt 7.
