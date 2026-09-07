# Performatic Intelligence – Projektkontext

Diese Datei dokumentiert Ziel, Stand und technische Logik des Projekts, damit zukünftige
Arbeitssitzungen (mit oder ohne Claude) den Kontext nicht neu erfragen müssen.

## 1. Geschäftsidee

Jonas ist Performance-Marketing-Manager bei einem deutschen Sport-Equipment-E-Commerce-Shop
und baut nebenbei eine eigene Marketing-Consulting-Marke auf: **Performatic Intelligence**.

Zielgruppe: kleine und mittlere Unternehmen (v. a. E-Commerce), die Performance Marketing
(Google Ads, Meta Ads) mit sauberem Tracking (GA4) betreiben oder damit starten wollen.

**Funnel-Logik (3 Stufen + Einstiegsangebot):**

1. **Account-Audit** – kostenlos, vier Module (Tracking & Datenqualität, Kontostruktur & Kanalwahl,
   Zielgruppen-Match, Steuerung & Skalierbarkeit) mit je 5 Unterpunkten à max. 5 Punkten, Ergebnis
   als Score 0–100. Dient als Lead-Magnet und Vertrauensaufbau. Internes Scoring-Tool dafür:
   `audit-score-dashboard.html` (Checkbox-basiertes Punktesystem, Donut-Visualisierung, lokal
   nutzbar, bewusst nicht in der Hauptnavigation verlinkt).
2. **Audit** – 499 € einmalig. Tiefenanalyse inkl. Creatives, Landingpages, Wettbewerb,
   endet mit priorisiertem Maßnahmenplan + Ergebnis-Call.
3. **Betreuung** – 249 € / Monat. Laufende Optimierung, monatlicher Review, monatlich kündbar.
4. **Starter-Begleitung** – 799 € einmalig. Hand-Holding-Angebot für Unternehmen ohne
   jede Erfahrung mit Online-Marketing: gemeinsamer Aufbau der ersten Kampagnen + Tracking von
   Grund auf, Schritt für Schritt erklärt.

## 2. Aktueller Geschäftsphase (Stand: Marktsondierung)

- **Kein Gewerbe angemeldet.** Es wird bewusst nur das kostenlose Account-Audit angeboten,
  um Marktinteresse zu testen, bevor eine Anmeldung erfolgt.
- Audit (499 €), Betreuung (249 €/Monat) und Starter-Begleitung (799 €) werden auf der
  Website bereits gezeigt, aber überall mit **"Bald verfügbar" / "In Kürze verfügbar"**-
  Badges (`.soon`, `.soon-inline`) markiert und ohne buchbare CTA-Buttons (kein
  "Jetzt kaufen", nur informativ).
- Ein `.phase-banner` oben auf jeder Seite (index, leistungen, alle vier `leistung-*.html`)
  weist Besucher explizit auf diesen Status hin.
- **Wichtig für später:** Sobald die Bezahlangebote live gehen, müssen folgende Stellen
  angepasst werden:
  - `phase-banner`-Text in `index.html`, `leistungen.html` und den vier `leistung-*.html`-Seiten
  - `.soon` / `.soon-inline` Badges auf den Preis-Karten entfernen, CTA-Buttons einfügen
  - FAQ-Eintrag "Bietest du aktuell auch das Audit oder eine Betreuung an?" anpassen/entfernen
  - Impressum: Es fehlt aktuell noch komplett ein Umsatzsteuer-ID-Abschnitt (siehe
    Abschnitt 7, offener Punkt) – bei Gewerbeanmeldung ergänzen
  - Ggf. Gewerbe anmelden + ggf. Nebentätigkeit beim Arbeitgeber melden (auch wenn zunächst
    unentgeltlich – rechtlich empfohlen, sobald geschäftsmäßig aufgetreten wird)

## 3. Tech-Stack

- **Reines statisches HTML/CSS/JS**, kein Build-Step, kein Framework, kein Backend.
- Formular-Versand über **Formspree** (`https://formspree.io/f/xppzlnbe`, fest in
  `index.html` und `leistungen.html` eingetragen). JS in `script.js` nutzt `fetch()` mit
  `FormData`-Body und `Accept: application/json`-Header gegen diesen Endpoint und zeigt
  eine Inline-Statusmeldung anhand des HTTP-Status (`response.ok`) an.
- **Hosting: GitHub Pages mit Custom Domain `performatic-intelligence.de`** – `CNAME`-Datei
  liegt bereits im Repo-Root, `robots.txt` und `sitemap.xml` verweisen live auf die Domain.
  Domain ist also bereits gekauft/eingetragen (Registrar unbekannt). Ob die DNS-Records
  (A/AAAA) und "Enforce HTTPS" in den GitHub-Pages-Settings tatsächlich gesetzt sind, lässt
  sich aus dem Repo-Inhalt nicht prüfen – auf Wunsch A-Records auf
  `185.199.108.153/.109.153/.110.153/.111.153`, AAAA auf `2606:50c0:8000::153` usw. verwenden.
- **Tracking/Consent:** Google Tag Manager (`GTM-TL4WCD8P`) + darüber Google Analytics 4
  eingebunden (Snippet auf allen acht HTML-Seiten mit Content, siehe Abschnitt 4).
  Personalisierte Werbung/Google Signals ist
  aktiv, GA4-Datenaufbewahrung auf 14 Monate gestellt, AVV mit Google abgeschlossen.
  Einwilligung läuft über **Klaro** (Kiprotect, gehostete Config unter
  `api.kiprotect.com/.../klaro.js`) mit drei Kategorien: "Notwendig", "Statistik" (GTM/GA4
  reine Reichweitenmessung → steuert `analytics_storage`) und "Werbung" (Google Signals/
  personalisierte Werbung → steuert `ad_storage`, `ad_user_data`, `ad_personalization`).
  Die Kategorie "Werbung" ist in der Klaro-Config bei Kiprotect noch anzulegen (liegt
  außerhalb dieses Repos).
  Ein `gtag('consent','default', {...alle Typen: 'denied'})` steht als eigenständiges,
  synchrones Inline-Script vor dem Klaro-Script in allen acht HTML-Seiten – wichtig, weil
  Klaro selbst per `defer` geladen wird und sein "denied" sonst zu spät käme (per
  GTM-Debugger bestätigt: vorher feuerte ein `gtag`-Call ganz ohne Consent-State). Klaro
  ruft danach bei Zustimmung `gtag('consent','update', ...)` auf – laut Test funktioniert
  das Update korrekt.
  **Noch offen (liegt außerhalb des Repos):** Klaro-Kategorie "Werbung" in der
  Kiprotect-Config anlegen, und die GTM-Tags (GA4 etc.) müssen im Container selbst
  "Consent Settings" (Built-in Consent Checks) aktiviert haben, sonst ignorieren sie den
  Consent-Status.

## 4. Dateistruktur (Repo-Root, kein Unterordner)

```
index.html        Startseite (Hero, Leistungen-Teaser, Messgrundlage-Argument,
                   Preise, Kontaktformular, FAQ)
leistungen.html    Übersichtsseite aller Leistungen (Google Ads, Meta Ads,
                   Datenanbindung, GA4-/GTM-Audit, Starter-Begleitung, Preise
                   im Überblick, eigenes Kontaktformular) mit Links auf die
                   vier Detailseiten unten
leistung-account-audit.html
                   Detailseite Account-Audit (kostenlos)
leistung-audit.html
                   Detailseite Audit (499 €)
leistung-betreuung.html
                   Detailseite Betreuung (249 €/Monat)
leistung-starter-begleitung.html
                   Detailseite Starter-Begleitung (799 €)
styles.css         Gesamtes Styling, Design-Tokens, alle Komponenten
script.js          Mobile-Nav-Toggle, Formspree-Submit-Handling
impressum.html     Impressum – **Anschrift ist aktuell nur "Deutschland" (keine
                   Straße), Telefonnummer ist Platzhalter, kein Umsatzsteuer-
                   Abschnitt, und Zeile 55 hat eine überzählige Klammer
                   ("Anschrift wie oben]") – siehe offene Punkte in Abschnitt 7**
datenschutz.html   Datenschutzerklärung (DSGVO, Formspree-Hinweis, Tracking-Hinweis);
                   Name und E-Mail sind eingetragen, Anschrift fehlt noch
audit-score-dashboard.html
                   Internes Tool (nicht verlinkt): berechnet den Account-Audit-Score aus
                   Checkboxen (4 Module × 5 Unterpunkte × max. 5 Punkte = 100), Donut-Chart-
                   Visualisierung pro Modul, eigenständig/offline nutzbar
favicon.svg        Favicon
robots.txt         Verweist auf sitemap.xml unter der Live-Domain
sitemap.xml        Listet aktuell nur index/leistungen/impressum/datenschutz –
                   die vier leistung-*.html-Detailseiten und
                   audit-score-dashboard.html fehlen (Stand der Prüfung)
CNAME              Enthält `performatic-intelligence.de` – Custom Domain ist
                   im Repo bereits hinterlegt
images/            Bildmaterial (u. a. Beispiel-Score-Screenshot), eigenes README.md
logo/              Logo-Varianten (2c/3a, Lockup/Mark, hell/dunkel) + OG-Bild
                   (`og-3a.png`), eigenes README.md
README.md          Ursprüngliche Kurzanleitung (aus erster Version, ggf. veraltet)
```

**Achtung – kaputte Font-Einbindung:** `styles.css` und die HTML-Seiten referenzieren
`fonts/barlow-400-latin.woff2` und `fonts/barlow-condensed-600-latin.woff2`
(`@font-face`, `<link rel="preload">`), aber es gibt **keinen `fonts/`-Ordner im Repo**
(auch nicht in der Git-Historie) – die Font-Dateien fehlen komplett, die Links sind
aktuell 404. Muss noch behoben werden (Dateien ergänzen oder Fallback-Stack anpassen).

## 5. Design-System ("Blueprint"-Ästhetik, Variante "1a")

Herkunft: aus einem Claude-Design-Canvas-Entwurf übernommen und auf die neue Marke
"Performatic Intelligence" umgetextet.

- **Farben:** neutrale Basis (`--color-bg:#f2f2f3`, `--color-text:#1d1f20`) + ein
  gedämpfter Blauton als Akzent (`--color-accent:#5980a6`), dazu 9-stufige Neutral- und
  Akzent-Farbramps (100–900) für Kontrastvarianten (helle/dunkle Bänder).
- **Schriften:** "Barlow" (Fließtext, 400) und "Barlow Condensed" (Überschriften/Buttons,
  600), sollen lokal als `.woff2` eingebunden sein – **bewusst kein Google-Fonts-CDN**, aus
  Datenschutzgründen (IP-Übertragung an Google beim Seitenaufruf). Die `.woff2`-Dateien
  fehlen aber aktuell im Repo (siehe Abschnitt 4, kaputte Font-Einbindung).
- **Signature-Komponente:** `.blueprint` / `.corner` – dünner Rahmen + kleine Eckmarkierungen
  ("Konstruktionsplan"-Look), wird auf Karten (`.bp-card`), dem Hero-Datenblatt
  (`.datasheet`) und dem Starter-Callout (`.starter-card`) verwendet.
- **Layout-Bausteine:** `.section`, `.card-grid` (4er/3er-Raster), `.band-dark` /
  `.band-accent` (Kontrastbänder für Messgrundlage-Argument bzw. Kontaktformular),
  `.leistung-block` / `.tier-block` (für die Leistungsseiten).
- Responsive Breakpoints bei 900px und 720px (Mobile-Nav wird zum Hamburger-Menü).
- **Navigation:** Hauptmenü hat einen "Leistungen"-Dropdown (`.nav-dropdown`) mit Links auf
  die vier `leistung-*.html`-Detailseiten (jeweils mit Preis-Tag) plus "Alle Leistungen
  ansehen"; daneben ein direkter CTA-Link "Kostenloses Account-Audit" und "FAQ". Der frühere
  Nav-Punkt "Preise" wurde durch "Kostenloses Account-Audit" ersetzt, ein separater
  CTA-Button wurde entfernt.

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
  entschieden werden, ob diese greift (beeinflusst Umsatzsteuer-Ausweis im Impressum –
  dort fehlt aktuell noch jeder Umsatzsteuer-Abschnitt, siehe Abschnitt 7).
- **Nebentätigkeit**: Meldepflicht beim Arbeitgeber prüfen, auch für zunächst unbezahlte
  Tätigkeit (aktuell nur kostenloses Audit).
- **Cookie-Consent / Google Consent Mode v2**: GTM + GA4 (inkl. personalisierter Werbung/
  Google Signals) sind eingebunden, Einwilligung läuft über Klaro mit drei getrennten
  Kategorien ("Notwendig", "Statistik", "Werbung" – siehe Abschnitt 3). Analyse und Werbung
  sind bewusst getrennte Opt-ins statt einer gemeinsamen Checkbox. Das `default denied`-
  Signal steht im Code (synchrones Inline-Script vor Klaro/GTM in allen acht HTML-Seiten),
  `gtag('consent','update',...)` durch Klaro wurde per GTM-Debugger als funktionierend
  bestätigt. Offen bleibt nur noch, in der Kiprotect-Klaro-Config die Kategorie "Werbung"
  anzulegen und in GTM selbst die Consent Settings pro Tag zu aktivieren (beides außerhalb
  dieses Repos). In `datenschutz.html` ist dieser Zielzustand bereits beschrieben.
- Die Design-Vorlage enthielt einen "Ergebnisse"-Abschnitt mit Platzhalter-Kennzahlen
  (z. B. "+38 % ROAS", explizit als Platzhalter markiert). Dieser wurde **bewusst nicht
  übernommen**, um keine erfundenen Erfolgszahlen zu zeigen (Irreführungs-/UWG-Risiko).
  Kann später mit echten Case-Study-Zahlen ergänzt werden.

## 7. Offene / nächste Schritte

- [ ] **Fonts fehlen im Repo**: `fonts/barlow-400-latin.woff2` und
      `fonts/barlow-condensed-600-latin.woff2` werden referenziert, existieren aber nicht
      (auch nicht in der Git-Historie) → aktuell 404, Fallback-Font wird geladen
- [ ] **Impressum unvollständig/fehlerhaft**: Anschrift fehlt (nur "Deutschland" steht da),
      Telefonnummer ist Platzhalter, kein Umsatzsteuer-ID-Abschnitt vorhanden, und Zeile 55
      hat eine überzählige schließende Klammer ("Anschrift wie oben]")
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
- [ ] GitHub-Pages-Settings prüfen (DNS-Records, "Enforce HTTPS") – `CNAME` mit
      `performatic-intelligence.de` liegt zwar schon im Repo, aber ob die DNS-Records beim
      Registrar und die Pages-Settings selbst korrekt gesetzt sind, ist von hier aus nicht
      einsehbar (siehe Abschnitt 3)
- [ ] `sitemap.xml` aktualisieren: die vier `leistung-*.html`-Detailseiten fehlen noch darin
- [ ] Entscheiden, ob/wann Gewerbe angemeldet wird → danach Preis-Karten "scharf schalten"
      (siehe Abschnitt 2)
- [ ] `Konzept-Performatic.md` (separates Dokument, außerhalb dieses Ordners) ist noch auf
      dem alten Markennamen "Performatic" und alten Preisen (690 €/490–1290 €) – bei Bedarf
      auf "Performatic Intelligence" und aktuelle Preise (499 €/249 €/799 €) aktualisieren
- [ ] Optional: echte Case-Study-Zahlen für einen "Ergebnisse"-Abschnitt sammeln, sobald
      erste Kunden/Ergebnisse vorliegen (siehe Abschnitt 6)
