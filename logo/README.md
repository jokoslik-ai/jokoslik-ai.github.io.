# Performatic Intelligence — Logo-Export

Alle Dateien sind SVG, Farben aus dem Industry-Design-System.

| Datei | Verwendung |
| --- | --- |
| logo-2c-lockup-light.svg | 2c Balkenmarke + Wortmarke, transparent, für hellen Grund |
| logo-2c-lockup-dark.svg | 2c auf Anthrazit |
| logo-2c-mark-light.svg / -dark.svg | nur die drei Balken (App-Icon, Social-Avatar) |
| logo-3a-lockup-light.svg | 3a Balken im Passerquadrat + Wortmarke, heller Grund |
| logo-3a-lockup-dark.svg | 3a auf Anthrazit |
| logo-3a-mark-light.svg / -dark.svg | quadratische Bildmarke |
| favicon-3a.svg | Favicon (identisch zu logo-3a-mark-dark) |

## Farben

```
Papier      #f2f2f3
Anthrazit   #2b2b2d
Tinte       #1d1f20
Akzent      #5980a6
Akzent 700  #416180
Akzent 400  #94bce3
Akzent 300  #b5d9fd
Neutral 500 #98989b
Neutral 700 #5d5d60
Neutral 100 #f5f5f8
```

## Schriften

Barlow Condensed 700 (Wortmarke), Barlow 500 (Zusatz).

Wichtig: ein per `<img>` eingebundenes SVG kann keine Webfonts nachladen. Die Lockup-SVGs
greifen daher auf lokal installierte Schriften zurück und fallen sonst auf eine schmale
System-Schrift zurück. Für Web-Einsatz deshalb das Lockup in HTML aufbauen (Bildmarke als
SVG + echter Text, Snippet unten) oder die Textpfade einmalig in Kurven umwandeln.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Barlow+Condensed:wght@700&display=swap">

<a class="brand" href="/">
  <img src="logo-3a-mark-light.svg" alt="" width="48" height="48">
  <span>
    <b>Performatic</b>
    <i>Intelligence</i>
  </span>
</a>

<style>
.brand { display:flex; align-items:center; gap:14px; text-decoration:none; color:#1d1f20; }
.brand span { display:block; line-height:1.05; }
.brand b { display:block; font-family:'Barlow Condensed',sans-serif; font-weight:700;
           font-size:27px; letter-spacing:.02em; text-transform:uppercase; }
.brand i { display:block; font-family:'Barlow',sans-serif; font-weight:500; font-style:normal;
           font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:#5d5d60; }
</style>
```

## Einbau

```html
<img src="logo-3a-lockup-light.svg" alt="Performatic Intelligence" height="64">
<link rel="icon" type="image/svg+xml" href="favicon-3a.svg">
```

Mindestgröße der Bildmarke: 22 px. Schutzraum: eine Balkenbreite auf allen Seiten.
