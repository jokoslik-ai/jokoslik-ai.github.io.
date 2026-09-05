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
- Formular-Versand über **Formspree** (`https://formspree.io/f/xppzlnbe`, fest in
  `index.html` und `leistungen.html` eingetragen). JS in `script.js` nutzt `fetch()` mit
  `FormData`-Body und `Accept: application/json`-Header gegen diesen Endpoint und zeigt
  eine Inline-Statusmeldung anhand des HTTP-Status (`response.ok`) an.
- Geplantes Hosting: **GitHub Pages** mit Custom Domain (A-Records auf
  `185.199.108.153/.109.153/.110.153/.111.153`, AAAA auf `2606:50c0:8000::153` usw.,
  `CNAME`-Datei im Repo-Root, "Enforce HTTPS" aktivieren).
- Domain-Kauf: über einen beliebigen Registrar (z. B. Namecheap, INWX, Cloudflare
  Registrar) – noch nicht final entschieden/gekauft.
- **Tracking/Consent:** Google Tag Manager (`GTM-TL4WCD8P`) + darüber Google Analytics 4
  eingebunden (Snippet auf allen vier Seiten). Personalisierte Werbung/Google Signals ist
  aktiv, GA4-Datenaufbewahrung auf 14 Monate gestellt, AVV mit Google abgeschlossen.
  Einwilligung läuft über **Klaro** (Kiprotect, gehostete Config unter
  `api.kiprotect.com/.../klaro.js`) mit drei Kategorien: "Notwendig", "Statistik" (GTM/GA4
  reine Reichweitenmessung → steuert `analytics_storage`) und "Werbung" (Google Signals/
  personalisierte Werbung → steuert `ad_storage`, `ad_user_data`, `ad_personalization`).
  Die Kategorie "Werbung" ist in der Klaro-Config bei Kiprotect noch anzulegen (liegt
  außerhalb dieses Repos).
  Ein `gtag('consent','default', {...alle Typen: 'denied'})` steht als eigenständiges,
  synchrones Inline-Script vor dem Klaro-Script in allen vier HTML-Dateien – wichtig, weil
  Klaro selbst per `defer` geladen wird und sein "denied" sonst zu spät käme (per
  GTM-Debugger bestätigt: vorher feuerte ein `gtag`-Call ganz ohne Consent-State). Klaro
  ruft danach bei Zustimmung `gtag('consent','update', ...)` auf – laut Test funktioniert
  das Update korrekt.
  **Noch offen (liegt außerhalb des Repos):** Klaro-Kategorie "Werbung" in der
  Kiprotect-Config anlegen, und die GTM-Tags (GA4 etc.) müssen im Container selbst
  "Consent Settings" (Built-in Consent Checks) aktiviert haben, sonst ignorieren sie den
  Consent-Status.

## 4. Dateistruktur (im Ordner `performatic-website`)

```
index.html        Startseite (Hero, Leistungen-Teaser, Messgrundlage-Argument,
                   Preise, Kontaktformular, FAQ)
leistungen.html    NEU: ausführliche Leistungsseite (Google Ads, Meta Ads,
                   Datenanbindung, GA4-/GTM-Audit im Detail; Starter-Begleitung
                   ausführlich mit 3-Schritte-Ablauf; Preise im Detail; eigenes
                   Kontaktformular)
styles.css         Gesamtes Styling, Design-Tokens, alle Komponenten
script.js          Mobile-Nav-Toggle, Formspree-Submit-Handling
impressum.html     Impressum (Platzhalter für Name/Adresse/Telefon/E-Mail)
datenschutz.html   Datenschutzerklärung (DSGVO, Formspree-Hinweis, Tracking-Hinweis)
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
  wegen Formspree als Auftragsverarbeiter mit Sitz in den USA (Datenübermittlung
  Drittland – Hinweis in `datenschutz.html` enthalten, AVV mit Formspree noch abzuschließen).
- **Kleinunternehmerregelung (§ 19 UStG)**: sobald ein Gewerbe angemeldet wird, muss
  entschieden werden, ob diese greift (beeinflusst Umsatzsteuer-Ausweis im Impressum).
- **Nebentätigkeit**: Meldepflicht beim Arbeitgeber prüfen, auch für zunächst unbezahlte
  Tätigkeit (aktuell nur kostenloses Audit).
- **Cookie-Consent / Google Consent Mode v2**: GTM + GA4 (inkl. personalisierter Werbung/
  Google Signals) sind eingebunden, Einwilligung läuft über Klaro mit drei getrennten
  Kategorien ("Notwendig", "Statistik", "Werbung" – siehe Abschnitt 3). Analyse und Werbung
  sind bewusst getrennte Opt-ins statt einer gemeinsamen Checkbox. Das `default denied`-
  Signal steht im Code (synchrones Inline-Script vor Klaro/GTM in allen vier HTML-Dateien),
  `gtag('consent','update',...)` durch Klaro wurde per GTM-Debugger als funktionierend
  bestätigt. Offen bleibt nur noch, in der Kiprotect-Klaro-Config die Kategorie "Werbung"
  anzulegen und in GTM selbst die Consent Settings pro Tag zu aktivieren (beides außerhalb
  dieses Repos). In `datenschutz.html` ist dieser Zielzustand bereits beschrieben.
- Die Design-Vorlage enthielt einen "Ergebnisse"-Abschnitt mit Platzhalter-Kennzahlen
  (z. B. "+38 % ROAS", explizit als Platzhalter markiert). Dieser wurde **bewusst nicht
  übernommen**, um keine erfundenen Erfolgszahlen zu zeigen (Irreführungs-/UWG-Risiko).
  Kann später mit echten Case-Study-Zahlen ergänzt werden.

## 7. Offene / nächste Schritte

- [ ] Formspree-Formular (`xppzlnbe`) mit einer echten Einsendung testen und Zustellung
      an die im Formspree-Dashboard hinterlegte Empfänger-Adresse prüfen
- [ ] Echte Kontaktdaten in `impressum.html` eintragen (Adresse – siehe Abschnitt 6,
      ggf. c/o-Adresse –, Telefon). In `datenschutz.html` sind Name (Jonas Koslik) und
      E-Mail (`kontakt@performatic-intelligence.de`) bereits eingetragen, Adresse fehlt noch.
- [ ] Klaro-Kategorie "Werbung" in der Kiprotect-Config anlegen (aktuell nur "Notwendig"/
      "Statistik" vorhanden)
- [ ] In GTM je Tag (GA4 etc.) die "Consent Settings" (Built-in Consent Checks) auf
      `analytics_storage` bzw. `ad_storage`/`ad_user_data`/`ad_personalization` aktivieren –
      das `default denied`-Signal im Code allein reicht nicht, wenn die Tags selbst den
      Consent-Status nicht prüfen
- [ ] Domain kaufen + GitHub-Repo anlegen + GitHub Pages einrichten (DNS-Records siehe
      Abschnitt 3)
- [ ] Entscheiden, ob/wann Gewerbe angemeldet wird → danach Preis-Karten "scharf schalten"
      (siehe Abschnitt 2)
- [ ] `Konzept-Performatic.md` (separates Dokument, außerhalb dieses Ordners) ist noch auf
      dem alten Markennamen "Performatic" und alten Preisen (690 €/490–1290 €) – bei Bedarf
      auf "Performatic Intelligence" und 499 €/249 € aktualisieren
- [ ] Optional: echte Case-Study-Zahlen für einen "Ergebnisse"-Abschnitt sammeln, sobald
      erste Kunden/Ergebnisse vorliegen (siehe Abschnitt 6)
