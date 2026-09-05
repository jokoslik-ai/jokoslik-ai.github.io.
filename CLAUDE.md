# Performatic Intelligence – Projektkontext

Diese Datei dokumentiert Ziel, Stand und technische Logik des Projekts, damit zukünftige
Arbeitssitzungen (mit oder ohne Claude) den Kontext nicht neu erfragen müssen.

## 1. Geschäftsidee

Jonas ist Performance-Marketing-Manager bei einem deutschen Sport-Equipment-E-Commerce-Shop
und baut nebenbei eine eigene Marketing-Consulting-Marke auf: **Performatic Intelligence**.

Zielgruppe: kleine und mittlere Unternehmen (v. a. E-Commerce), die Performance Marketing
(Google Ads, Meta Ads) mit sauberem Tracking (GA4) betreiben oder damit starten wollen.

**Funnel-Logik (3 Stufen + Einstiegsangebot):**

1. **Account-Audit** – kostenlos, 14 Prüfpunkte zu Kontostruktur/Tracking/Datenqualität.
   Dient als Lead-Magnet und Vertrauensaufbau.
2. **Audit** – 499 € einmalig. Tiefenanalyse inkl. Creatives, Landingpages, Wettbewerb,
   endet mit priorisiertem Maßnahmenplan + Ergebnis-Call.
3. **Betreuung** – 249 € / Monat. Laufende Optimierung, monatlicher Review, monatlich kündbar.
4. **Starter-Begleitung** (neu, ohne festen Preis) – Hand-Holding-Angebot für Unternehmen ohne
   jede Erfahrung mit Online-Marketing: gemeinsamer Aufbau der ersten Kampagnen + Tracking von
   Grund auf, Schritt für Schritt erklärt.

## 2. Aktueller Geschäftsphase (Stand: Marktsondierung)

- **Kein Gewerbe angemeldet.** Es wird bewusst nur das kostenlose Account-Audit angeboten,
  um Marktinteresse zu testen, bevor eine Anmeldung erfolgt.
- Audit (499 €), Betreuung (249 €/Monat) und Starter-Begleitung werden auf der Website
  bereits gezeigt, aber überall mit **"Bald verfügbar"**-Badges markiert und ohne
  buchbare CTA-Buttons (kein "Jetzt kaufen", nur informativ).
- Ein `.phase-banner` oben auf jeder Seite weist Besucher explizit auf diesen Status hin.
- **Wichtig für später:** Sobald die Bezahlangebote live gehen, müssen folgende Stellen
  angepasst werden:
  - `phase-banner`-Text in `index.html` und `leistungen.html`
  - `.soon` / `.soon-inline` Badges auf den Preis-Karten entfernen, CTA-Buttons einfügen
  - FAQ-Eintrag "Bietest du aktuell auch das Audit oder eine Betreuung an?" anpassen/entfernen
  - Impressum: Umsatzsteuer-ID-Abschnitt ausfüllen (aktuell Platzhalter mit Hinweis
    "Aktuell kein Gewerbe angemeldet")
  - Ggf. Gewerbe anmelden + ggf. Nebentätigkeit beim Arbeitgeber melden (auch wenn zunächst
    unentgeltlich – rechtlich empfohlen, sobald geschäftsmäßig aufgetreten wird)

## 3. Tech-Stack

- **Reines statisches HTML/CSS/JS**, kein Build-Step, kein Framework, kein Backend.
- Formular-Versand über **FormSubmit.co** (AJAX-Endpoint
  `https://formsubmit.co/ajax/kontakt@performatic-intelligence.de`, fest in `index.html`
  und `leistungen.html` eingetragen). JS in `script.js` nutzt `fetch()` gegen diesen
  Endpoint und zeigt das JSON-Ergebnis als Inline-Statusmeldung an. Beim allerersten
  Submit verschickt FormSubmit.co eine Aktivierungs-E-Mail an die Zieladresse – erst nach
  Bestätigung werden weitere Einsendungen zugestellt.
- Geplantes Hosting: **GitHub Pages** mit Custom Domain (A-Records auf
  `185.199.108.153/.109.153/.110.153/.111.153`, AAAA auf `2606:50c0:8000::153` usw.,
  `CNAME`-Datei im Repo-Root, "Enforce HTTPS" aktivieren).
- Domain-Kauf: über einen beliebigen Registrar (z. B. Namecheap, INWX, Cloudflare
  Registrar) – noch nicht final entschieden/gekauft.

## 4. Dateistruktur (im Ordner `performatic-website`)

```
index.html        Startseite (Hero, Leistungen-Teaser, Messgrundlage-Argument,
                   Preise, Kontaktformular, FAQ)
leistungen.html    NEU: ausführliche Leistungsseite (Google Ads, Meta Ads,
                   Datenanbindung, GA4-/GTM-Audit im Detail; Starter-Begleitung
                   ausführlich mit 3-Schritte-Ablauf; Preise im Detail; eigenes
                   Kontaktformular)
styles.css         Gesamtes Styling, Design-Tokens, alle Komponenten
script.js          Mobile-Nav-Toggle, FormSubmit.co-Submit-Handling
impressum.html     Impressum (Platzhalter für Name/Adresse/Telefon/E-Mail)
datenschutz.html   Datenschutzerklärung (DSGVO, FormSubmit.co-Hinweis, Tracking-Hinweis)
fonts/             Selbst gehostete Schriftdateien (kein Google-Fonts-CDN)
  barlow-400-latin.woff2
  barlow-condensed-600-latin.woff2
README.md          Ursprüngliche Kurzanleitung (aus erster Version, ggf. veraltet)
```

## 5. Design-System ("Blueprint"-Ästhetik, Variante "1a")

Herkunft: aus einem Claude-Design-Canvas-Entwurf übernommen und auf die neue Marke
"Performatic Intelligence" umgetextet.

- **Farben:** neutrale Basis (`--color-bg:#f2f2f3`, `--color-text:#1d1f20`) + ein
  gedämpfter Blauton als Akzent (`--color-accent:#5980a6`), dazu 9-stufige Neutral- und
  Akzent-Farbramps (100–900) für Kontrastvarianten (helle/dunkle Bänder).
- **Schriften:** "Barlow" (Fließtext, 400) und "Barlow Condensed" (Überschriften/Buttons,
  600), beide lokal als `.woff2` eingebunden – **bewusst kein Google-Fonts-CDN**, aus
  Datenschutzgründen (IP-Übertragung an Google beim Seitenaufruf).
- **Signature-Komponente:** `.blueprint` / `.corner` – dünner Rahmen + kleine Eckmarkierungen
  ("Konstruktionsplan"-Look), wird auf Karten (`.bp-card`), dem Hero-Datenblatt
  (`.datasheet`) und dem Starter-Callout (`.starter-card`) verwendet.
- **Layout-Bausteine:** `.section`, `.card-grid` (4er/3er-Raster), `.band-dark` /
  `.band-accent` (Kontrastbänder für Messgrundlage-Argument bzw. Kontaktformular),
  `.leistung-block` / `.tier-block` (neu, für die ausführliche Leistungsseite).
- Responsive Breakpoints bei 900px und 720px (Mobile-Nav wird zum Hamburger-Menü).

## 6. Rechtliche Eckpunkte (keine Rechtsberatung – Stand der Recherche)

- **Impressumspflicht** (§ 5 DDG, vormals TMG) gilt bereits, sobald die Seite
  "geschäftsmäßig" betrieben wird – unabhängig von einer Gewerbeanmeldung. Deshalb hat die
  Seite von Anfang an ein Impressum, auch ohne Gewerbe.
- **Ladungsfähige Anschrift nötig** – ein reines Postfach reicht nicht. Optionen für Jonas,
  um die private Adresse nicht zu veröffentlichen: c/o-Adresse bei Coworking-Space/
  Bürodienstleister, Adresse einer Kanzlei/eines Steuerberaters, oder ein echtes gemietetes
  Büro. Vor Kauf eines "virtuelle Geschäftsadresse"-Dienstes: Eignung für ladungsfähige
  Anschrift mit Anwalt/IHK/eRecht24 gegenprüfen (Rechtsprechung dazu ist uneinheitlich).
- **Datenschutzerklärung** nötig wegen Formular-Datenverarbeitung (Kontaktformular) und
  wegen FormSubmit.co als Auftragsverarbeiter (Datenübermittlung an Drittanbieter –
  Hinweis in `datenschutz.html` muss noch auf FormSubmit.co aktualisiert werden, AVV/
  Datenschutzbedingungen von FormSubmit.co prüfen).
- **Kleinunternehmerregelung (§ 19 UStG)**: sobald ein Gewerbe angemeldet wird, muss
  entschieden werden, ob diese greift (beeinflusst Umsatzsteuer-Ausweis im Impressum).
- **Nebentätigkeit**: Meldepflicht beim Arbeitgeber prüfen, auch für zunächst unbezahlte
  Tätigkeit (aktuell nur kostenloses Audit).
- **Cookie-Consent / Google Consent Mode v2**: Aktuell ist **kein** Analyse-Tool
  eingebunden (bewusst, um in der Testphase kein Consent-Banner zu brauchen). Sobald GA4/
  GTM ergänzt wird, ist ein Consent-Banner *vor* dem ersten Tag-Fire zwingend nötig – auch
  bei reinem GA4-Einsatz ohne Ads. In `datenschutz.html` bereits als Hinweis hinterlegt.
- Die Design-Vorlage enthielt einen "Ergebnisse"-Abschnitt mit Platzhalter-Kennzahlen
  (z. B. "+38 % ROAS", explizit als Platzhalter markiert). Dieser wurde **bewusst nicht
  übernommen**, um keine erfundenen Erfolgszahlen zu zeigen (Irreführungs-/UWG-Risiko).
  Kann später mit echten Case-Study-Zahlen ergänzt werden.

## 7. Offene / nächste Schritte

- [ ] FormSubmit.co-Aktivierungsmail an kontakt@performatic-intelligence.de bestätigen
      (wird bei der ersten Formular-Einsendung automatisch verschickt)
- [ ] `datenschutz.html` von Formspree- auf FormSubmit.co-Hinweis aktualisieren
- [ ] Echte Kontaktdaten in `impressum.html` und `datenschutz.html` eintragen (Name,
      Adresse – siehe Abschnitt 6, ggf. c/o-Adresse –, Telefon, E-Mail)
- [ ] Domain kaufen + GitHub-Repo anlegen + GitHub Pages einrichten (DNS-Records siehe
      Abschnitt 3)
- [ ] Entscheiden, ob/wann Gewerbe angemeldet wird → danach Preis-Karten "scharf schalten"
      (siehe Abschnitt 2)
- [ ] `Konzept-Performatic.md` (separates Dokument, außerhalb dieses Ordners) ist noch auf
      dem alten Markennamen "Performatic" und alten Preisen (690 €/490–1290 €) – bei Bedarf
      auf "Performatic Intelligence" und 499 €/249 € aktualisieren
- [ ] Optional: echte Case-Study-Zahlen für einen "Ergebnisse"-Abschnitt sammeln, sobald
      erste Kunden/Ergebnisse vorliegen (siehe Abschnitt 6)
