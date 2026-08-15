# TRIDEV CORE HQ — सनातन ज्ञान पोर्टल

World's Sanatan Dharma knowledge portal.  
Live: **https://tridevcoreofficial.github.io/knowledge/**

---

## Folder Structure (easy to edit)

```
knowledge/
├── index.html          ← page content (HTML only)
├── css/
│   └── style.css       ← all styles / colors / layout
├── js/
│   └── main.js         ← language, theme, search, PWA
├── images/
│   ├── logo.png        ← circular logo
│   ├── tridevcore.png  ← banner
│   ├── Pashupatinath.webp
│   ├── Muktinath.jpg
│   └── everest.jfif
├── manifest.json       ← PWA (Add to Home Screen)
├── sw.js               ← offline cache
├── sitemap.xml         ← Google Search Console
└── robots.txt
```

---

## How to edit

| Want to change… | Edit this file |
|-----------------|----------------|
| Text / sections | `index.html` |
| Colors, spacing, cards | `css/style.css` |
| Language / theme / search | `js/main.js` |
| Logo / photos | `images/` folder |
| App name (PWA) | `manifest.json` |

### Colors (dark theme)
Open `css/style.css` → top `:root { ... }`

```css
--bg: #0a0a0a;      /* page background */
--gold: #c9a84c;    /* headings / links */
--text: #f0d080;    /* main text */
```

Light theme is under `[data-theme=light]`.

---

## Deploy

GitHub Pages serves the `main` branch root.  
After any push, site updates in ~1–2 minutes.

---

© TRIDEV CORE HQ | Gaurab Barakoti  
🇳🇵 जय नेपाल | 🕉 हर हर महादेव
