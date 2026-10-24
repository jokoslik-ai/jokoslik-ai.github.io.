# Performatic Intelligence – Projektkontext

Diese Datei dokumentiert Ziel, Stand und technische Logik des Projekts, damit zukünftige
Arbeitssitzungen (mit oder ohne Claude) den Kontext nicht neu erfragen müssen.

## 1. Geschäftsidee

Jonas ist Performance-Marketing-Manager bei einem deutschen Sport-Equipment-E-Commerce-Shop
und baut nebenbei eine eigene Marketing-Consulting-Marke auf: **Performatic Intelligence**.

Zielgruppe: kleine und mittlere Unternehmen (v. a. E-Commerce), die Performance Marketing
(Google Ads, Meta Ads) mit sauberem Tracking (GA4) betreiben oder damit starten wollen.

**Funnel-Logik (3 Stufen + Einstiegsangebot):**

1. **Account-Audit** – kostenlos, vier Prüfbereiche (Tracking & Datenqualität, Kontostruktur & Kanalwahl,
   Zielgruppen-Match, Steuerung & Skalierbarkeit) mit je 5 Unterpunkten à max. 5 Punkten, Ergebnis
   als Score 0–100. Deckt Google Ads, Microsoft Ads und Meta Ads ab. Dient als Lead-Magnet und Vertrauensaufbau. Internes Scoring-Tool dafür:
   `audit-score-dashboard.html` (Checkbox-basiertes Punktesystem, Donut-Visualisierung, lokal
   nutzbar, bewusst nicht in der Hauptnavigation verlinkt).
2. **Tiefenaudit** – 499 € einmalig (bis 2026-09-07 nur "Audit" genannt; umbenannt zur
   klaren Abgrenzung vom kostenlosen Account-Audit). Tiefenanalyse inkl. Creatives,
   Landingpages, Wettbewerb, endet mit priorisiertem Maßnahmenplan + Ergebnis-Call.
3. **Betreuung** – ab 249 € / Monat, Preis nach Aufwand (je nach betreuten Kanälen/Modulen).
   Laufende Optimierung, monatlicher Review, monatlich kündbar.
4. **Starter-Begleitung** – 799 € einmalig. Hand-Holding-Angebot für Unternehmen ohne
   jede Erfahrung mit Online-Marketing: gemeinsamer Aufbau der ersten Kampagnen + Tracking von
   Grund auf, Schritt für Schritt erklärt.

**Begriffe:** Die vier Stufen oben = "Zusammenarbeit & Preise" (das *Wie*). Die inhaltlichen
Leistungen = **sechs Module** (das *Was*): 01 Search Ads (Google & Microsoft Ads), 02 Meta Ads,
03 Google Analytics 4 Audit, 04 Google Tag Manager Audit, 05 Datenanbindung (Marketing-Tool-Daten
mit GA4 verbinden, Shop/CRM, Offline-Conversions, Server-Side-Tagging), 06 Datenvisualisierung
(Looker-Studio-Dashboard, KPI-Definitionen). Die vier Teile des Account-Audits heißen
**Prüfbereiche** (nicht "Module"), um Verwechslung zu vermeiden – Ausnahme: das interne
`audit-score-dashboard.html` nutzt noch "Modul".

**Bedarfslogik:** Welche Module/Stufe passt, hängt von der Ausgangslage ab. Abgebildet in
`leistungen.html#einstieg` ("Welcher Einstieg passt zu dir?": kein Setup → Starter-Begleitung;
Kanäle laufen, Qualität unklar → Account-Audit/Tiefenaudit; Setup steht → Betreuung) und im
Kontaktformular (Felder "Aktive Kanäle" und "Ausgangslage" zur Vorqualifizierung).

## 2. Aktueller Geschäftsphase (Stand: Marktsondierung)

- **Kein Gewerbe angemeldet.** Es wird bewusst nur das kostenlose Account-Audit angeboten,
  um Marktinteresse zu testen, bevor eine Anmeldung erfolgt.
- Tiefenaudit (499 €), Betreuung (ab 249 €/Monat) und Starter-Begleitung (799 €) werden auf der
  Website bereits gezeigt, aber überall mit **"Bald verfügbar" / "In Kürze verfügbar"**-
  Badges (`.soon`, `.soon-inline`) markiert und ohne buchbare CTA-Buttons (kein
  "Jetzt kaufen", nur informativ).
- Ein `.phase-banner` oben auf jeder Seite (index, leistungen, alle vier `leistung-*.html`)
  weist Besucher explizit auf diesen Status hin.
- **Wichtig für später:** Sobald die Bezahlangebote live gehen, müssen folgende Stellen
  angepasst werden:
  - `phase-banner`-Text in `_includes/header.html` (gilt für alle sechs Seiten)
  - `.soon` / `.soon-inline` Badges entfernen (Preis-Karten in `_includes/preise.html`,
    Einstiegs-Karten in `leistungen.html#einstieg`, `leistung-*.html`), CTA-Buttons einfügen
  - FAQ-Eintrag "Bietest du aktuell auch das Tiefenaudit oder eine Betreuung an?" anpassen/entfernen
  - Impressum: Es fehlt aktuell noch komplett ein Umsatzsteuer-ID-Abschnitt (siehe
    Abschnitt 7, offener Punkt) – bei Gewerbeanmeldung ergänzen
  - Ggf. Gewerbe anmelden + ggf. Nebentätigkeit beim Arbeitgeber melden (auch wenn zunächst
    unentgeltlich – rechtlich empfohlen, sobald geschäftsmäßig aufgetreten wird)

## 3. Tech-Stack

- **Statisches HTML/CSS/JS**, kein Framework, kein Backend. **Seit 2026-10-24 mit Jekyll-Includes:**
  GitHub Pages baut die Seite mit Jekyll (eingebaut, keine eigene Action). Wiederkehrende Blöcke
  liegen genau einmal in `_includes/` und werden per `{% include … %}` eingesetzt:
  `header.html` (Phase-Banner + Kopfzeile; auf `index.html` mit `home=true`, sonst verlinken Logo/
  FAQ auf `index.html#…`), `footer.html`, `module-karten.html` (Parameter `prefix`: Linkziel der
  Modul-Karten), `preise.html` ("Zusammenarbeit & Preise"), `kontakt.html` (Kontaktformular).
  **Änderungen an diesen Blöcken nur in `_includes/` vornehmen.** Seiten mit Includes brauchen
  Front Matter (`---`/`---` in den ersten zwei Zeilen); `impressum.html`, `datenschutz.html` und
  `audit-score-dashboard.html` haben keins und werden unverändert kopiert. `_config.yml`
  schließt die `.md`-Dateien (u. a. diese Datei) von der Veröffentlichung aus.
  **Lokale Vorschau:** Doppelklick auf eine HTML-Datei zeigt nur die `{% include %}`-Platzhalter.
  Stattdessen `gem install jekyll -v 3.10.0` (Version wie GitHub Pages) und `jekyll serve` im
  Repo-Root, dann http://localhost:4000 öffnen.
- Formular-Versand über **Formspree** (`https://formspree.io/f/xppzlnbe`, fest in
  `_includes/kontakt.html` eingetragen, eingebunden in `index.html` und `leistungen.html`). JS in `script.js` nutzt `fetch()` mit
  `FormData`-Body und `Accept: application/json`-Header gegen diesen Endpoint und zeigt
  eine Inline-Statusmeldung anhand des HTTP-Status (`response.ok`) an. Die Checkboxen
  `kanaele` werden vor dem Senden zu einem kommagetrennten Feld zusammengefasst.
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
index.html        Startseite (Hero einspaltig, Vorstellung/"Für wen" (`#ueber`), 6 Modul-Karten, Messgrundlage-Argument,
                   Zusammenarbeit & Preise, Kontaktformular, FAQ)
leistungen.html    Übersicht: dieselben 6 Modul-Karten wie die Startseite (verlinken
                   auf die Detailblöcke #search-ads, #meta-ads, #ga4-audit,
                   #gtm-audit, #datenanbindung, #datenvisualisierung), darunter
                   "Welcher Einstieg passt zu dir?" (#einstieg), dann
                   "Zusammenarbeit & Preise" (#preise) und Kontaktformular –
                   Module, Preise und Formular kommen aus `_includes/` und sind
                   damit automatisch identisch mit index.html
leistung-account-audit.html
                   Detailseite Account-Audit (kostenlos)
leistung-audit.html
                   Detailseite Tiefenaudit (499 €) – Dateiname bewusst unverändert
                   auf "audit" belassen (nur der angezeigte Produktname wurde zu
                   "Tiefenaudit" umbenannt, um URL/Sitemap-Verweise nicht zu brechen)
leistung-betreuung.html
                   Detailseite Betreuung (ab 249 €/Monat)
leistung-starter-begleitung.html
                   Detailseite Starter-Begleitung (799 €)
tokens.css         Design-Tokens (Farben hell/dunkel, Schriften, Größen, Abstände, Radien,
                   Schatten) – Quelle ist das Designsystem "Performatic Intelligence"
styles.css         Komponenten und Layout, nutzt nur Tokens aus tokens.css
fonts/             Barlow-Schriften (woff2) + OFL.txt
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
_includes/          Gemeinsame Blöcke (header, footer, module-karten, preise,
                   kontakt) – siehe Abschnitt 3
_config.yml        Jekyll-Konfiguration (schließt .md-Dateien vom Build aus)
favicon.svg        Favicon
robots.txt         Verweist auf sitemap.xml unter der Live-Domain
sitemap.xml        Listet alle acht öffentlichen Seiten (index, leistungen, die vier
                   leistung-*.html-Detailseiten, impressum, datenschutz) mit
                   `lastmod` aus der Git-Historie. `audit-score-dashboard.html` ist
                   bewusst NICHT gelistet (siehe oben: nicht in der Hauptnavigation
                   verlinktes internes Tool, soll nicht indexiert werden)
CNAME              Enthält `performatic-intelligence.de` – Custom Domain ist
                   im Repo bereits hinterlegt
images/            Bildmaterial (u. a. Beispiel-Score-Screenshot), eigenes README.md
logo/              Logo-Varianten (2c/3a, Lockup/Mark, hell/dunkel) + OG-Bild
                   (`og-3a.png`), eigenes README.md
README.md          Ursprüngliche Kurzanleitung (aus erster Version, ggf. veraltet)
```

**Schriften:** `fonts/` enthält vier selbst gehostete `woff2`-Dateien (Barlow 400/500,
Barlow Condensed 600/700, aus github.com/jpt/barlow, SIL OFL 1.1, Lizenztext `fonts/OFL.txt`).
`@font-face` steht in `tokens.css`. Kein Google-Fonts-CDN.

## 5. Design-System

**Quelle:** Das Designsystem "Performatic Intelligence" wurde in Claude gebaut; `tokens.css` wird von dort ins
Repo übernommen. Änderungen an Tokens zuerst im Designsystem vornehmen.

**Stand 2026-10-24:** Tokens liegen in `tokens.css` (Hell = Standard, Dunkel per
`prefers-color-scheme`; Kontrastflächen `.band-dark`/`.band-accent`/`.phase-banner` bleiben
immer dunkel). Primär-Button `accent-700` (Label `color-bg`), zwei Textstufen
(`color-text-secondary`/`-tertiary`), 8 Schriftgrößen (`--fs-xs`…`--fs-4xl`), Abstandsraster
4/8px (`--space-*`), ein Radius 4px auch für Karten, globaler Fokus-Ring, Statusmeldungen mit
✓/!, Marke 2c im Header. Die folgenden Detailangaben zu Farben/Schriften/Radius sind teils
überholt; maßgeblich sind `tokens.css` und das Designsystem.

**Akzent-Update (Variante A, kräftigeres Blau):** Akzent-Rampe 100–900 in `tokens.css` neu
(`accent-700` = `#295d99`, Farbton 212°). Neu: hervorgehobenes Wort in der Hero-Überschrift (`.hl`), Kontaktband in `accent-700`
(`.band-accent`), Hover-Rahmen auf Karten/FAQ, `.section-alt` (Abschnitt auf `color-surface`),
Barlow-Schriften auf Latin gekürzt (je ca. 33 KB), Logos/OG-Bild/Favicon im neuen Blau
(C2PA-Metadaten aus den SVGs entfernt, da die Dateien geändert wurden).

**Positionierung (2026-10-24):** Das Angebot richtet sich an Selbstständige, Einzelunternehmen und
KMU ohne eigene Performance-Marketing-Abteilung/-Expertise; Einstieg mit niedriger Hürde (Start:
Starter-Begleitung, Optimierung: kostenloses Account-Audit). Umgesetzt im Abschnitt `#ueber` auf
der Startseite (Variante A: Text + Karte "Für wen ist das?"). Hero-Text, Meta-Beschreibung und
Fußzeile nennen noch "kleine und mittlere Unternehmen" und sind noch nicht angeglichen.

**Module, Messgrundlage, Leistungen-Seite (2026-10-24):** Die sechs Modul-Karten (`_includes/module-karten.html`)
haben Linien-Piktogramme (`.card-top` + `.ico`, Inline-SVG, `currentColor`). Das Messgrundlage-Band ist
`.band-dark.band-blue` (`accent-800`), damit es sich in Hell und Dunkel von Fläche und Preisen abhebt;
Beschriftungen und Texte darin einheitlich (`accent-300` / `neutral-100`, Barlow 15px). Auf
`leistungen.html` liegen die Modul-Karten (`section-alt`) und die Detailblöcke (`#details`) in getrennten
Abschnitten mit unterschiedlichem Hintergrund.

**Handy-Leiste und Score-Grafik:** `.cta-bar` (in `_includes/footer.html`, Logik in `script.js`)
ist nur ≤720px sichtbar und wird ausgeblendet, solange `.hero-actions`, `.product-cta-band`,
`#kontakt` oder `.site-footer` im Bild sind oder das Menü offen ist. Der Beispiel-Score auf
`leistung-account-audit.html` ist jetzt `images/beispielscore.svg` (transparent, Hell/Dunkel
im SVG per `prefers-color-scheme`, Blautöne statt Grün/Lila/Gelb); das alte PNG wurde entfernt.

**Grundregel: immer Mobile First optimieren.** Layouts zuerst für Smartphone-Breite
entwerfen und prüfen, dann per `min-width`-Media-Queries für Tablet (ab 721px) und Desktop
(ab 901px) erweitern. Neue CSS-Regeln mobile-first schreiben (Basis = 1 Spalte).
Desktop-Raster: 6 Module als 3×2 (`.card-grid-3`: 1 → 2 → 3 Spalten), 4 Preisstufen in einer
Reihe (`.card-grid-4`: 1 → 2 → 4 Spalten). Kontaktformular (`.lead-form-grid`): Einleitungstext steht
über dem Formular (`.kontakt-stack`), Formular in voller Breite, mobil 1 Spalte, ab Tablet
2 Spalten; Selects mit `appearance: none` (entfernt die native 3D-/Verlaufsoptik
auf Desktop) und eigenem SVG-Pfeil. **Begründung:** Der Großteil des Traffics und der
Anfragen wird über Mobilgeräte erwartet. Hinweis: Große Teile des bestehenden `styles.css`
sind noch desktop-first (`max-width`-Queries) geschrieben; bei Überarbeitungen schrittweise
umstellen.

**Stil:** "Blueprint"-Ästhetik, Variante "1a".

Herkunft: aus einem Claude-Design-Canvas-Entwurf übernommen und auf die neue Marke
"Performatic Intelligence" umgetextet.

- **Farben:** neutrale Basis (`--color-bg:#f2f2f3`, `--color-text:#1d1f20`) + ein
  gedämpfter Blauton als Akzent (`--color-accent:#5980a6`), dazu 9-stufige Neutral- und
  Akzent-Farbramps (100–900) für Kontrastvarianten (helle/dunkle Bänder).
- **Schriften:** "Barlow" (Fließtext, 400) und "Barlow Condensed" (Überschriften/Buttons,
  600), beide lokal als `.woff2` eingebunden – **bewusst kein Google-Fonts-CDN**, aus
  Datenschutzgründen (IP-Übertragung an Google beim Seitenaufruf).
- **Signature-Komponente:** `.blueprint` – dünner Rahmen ("Konstruktionsplan"-Look), wird auf
  Karten (`.bp-card`) verwendet. Das frühere Hero-Datenblatt (`.datasheet`) wurde
  2026-10-24 entfernt (Hero ist jetzt einspaltig). Die ursprünglichen Eckmarkierungen (`.corner`, ein
  Plus-Symbol an jeder Ecke) wurden entfernt, nur der Rahmen ist geblieben.
- **Layout-Bausteine:** `.section`, `.card-grid` (4er/3er-Raster), `.band-dark` /
  `.band-accent` (Kontrastbänder für Messgrundlage-Argument bzw. Kontaktformular),
  `.leistung-block` (Detailblöcke auf `leistungen.html`), `.bp-card .card-link` (Textlink in
  Karten), `.bp-card .soon` ("In Kürze verfügbar"-Badge auf Karten), `.checkbox-group`
  (Checkboxen im Formular). `.tier-block` wurde entfernt (Preise jetzt als Karten).
- Responsive Breakpoints bei 900px und 720px (Mobile-Nav wird zum Hamburger-Menü).
- **Navigation:** Hauptmenü hat einen "Leistungen"-Dropdown (`.nav-dropdown`) mit Links auf
  die vier `leistung-*.html`-Detailseiten (jeweils mit Preis-Tag) plus "Alle Leistungen
  ansehen"; daneben ein direkter CTA-Link "Kostenloses Account-Audit" und "FAQ". Der frühere
  Nav-Punkt "Preise" wurde durch "Kostenloses Account-Audit" ersetzt, ein separater
  CTA-Button wurde entfernt. `.site-header`-Hintergrund ist bewusst `--color-neutral-200`
  statt `--color-neutral-100` (plus `box-shadow: var(--shadow-sm)`), damit sich die
  sticky Kopfzeile sichtbarer vom fast gleichfarbigen `--color-bg` abhebt.

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

- [x] Fonts ergänzt (`fonts/`, siehe Abschnitt 4)
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
- [x] `sitemap.xml` aktualisiert (2026-09-07): enthält jetzt alle acht öffentlichen Seiten
      inkl. der vier `leistung-*.html`-Detailseiten; `audit-score-dashboard.html` bewusst
      weiterhin ausgeschlossen
- [ ] Entscheiden, ob/wann Gewerbe angemeldet wird → danach Preis-Karten "scharf schalten"
      (siehe Abschnitt 2)
- [ ] `Konzept-Performatic.md` (separates Dokument, außerhalb dieses Ordners) ist noch auf
      dem alten Markennamen "Performatic" und alten Preisen (690 €/490–1290 €) – bei Bedarf
      auf "Performatic Intelligence" und aktuelle Preise (499 €/249 €/799 €) aktualisieren
- [ ] Optional: echte Case-Study-Zahlen für einen "Ergebnisse"-Abschnitt sammeln, sobald
      erste Kunden/Ergebnisse vorliegen (siehe Abschnitt 6)
