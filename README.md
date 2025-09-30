# Jutta Horn - Künstlerin Website

Eine moderne, minimalistische Website für die Künstlerin Jutta Horn, entwickelt mit Vue 3, Vuetify 3 und TailwindCSS.

## 🎨 Über das Projekt

Diese Website wurde speziell für Jutta Horn entwickelt, eine 75-jährige Künstlerin, deren Werke von Lebenserfahrung, Naturverbundenheit und der Schönheit des Moments geprägt sind. Das Design ist bewusst minimalistisch und elegant gehalten, um den Fokus auf die Kunstwerke zu lenken.

## 🚀 Technologien

- **Vue 3** - Progressive JavaScript Framework
- **Vuetify 3** - Material Design Component Framework
- **TailwindCSS** - Utility-first CSS Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build Tool und Development Server
- **Vue Router** - Client-side Routing
- **Pinia** - State Management

## 📁 Projektstruktur

```
jutta-2025/
├── src/
│   ├── components/          # Wiederverwendbare Vue-Komponenten
│   │   ├── AppHeader.vue   # Hauptnavigation
│   │   └── AppFooter.vue   # Footer mit Kontaktinformationen
│   ├── views/              # Seiten-Komponenten
│   │   ├── HomeView.vue    # Startseite
│   │   ├── KunstView.vue   # Über die Kunst
│   │   ├── SchaffenView.vue # Kunstwerke Galerie
│   │   ├── AusstellungenView.vue # Ausstellungen
│   │   └── KontaktView.vue # Kontaktformular
│   ├── router/             # Vue Router Konfiguration
│   ├── assets/             # Statische Dateien
│   │   ├── css/           # TailwindCSS Styles
│   │   └── images/        # Bilder und Grafiken
│   └── main.ts            # App Einstiegspunkt
├── public/                # Öffentliche Dateien
├── tailwind.config.js     # TailwindCSS Konfiguration
├── vite.config.ts         # Vite Konfiguration
└── package.json           # Projekt Abhängigkeiten
```

## 🛠️ Installation und Setup

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

1. **Repository klonen:**

   ```bash
   git clone https://github.com/deepsoul/jutta-2025.git
   cd jutta-2025
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

3. **Development Server starten:**

   ```bash
   npm run dev
   ```

4. **Website im Browser öffnen:**
   ```
   http://localhost:5173
   ```

### Build für Produktion

```bash
npm run build
```

Die gebauten Dateien befinden sich im `dist/` Verzeichnis.

## 🎨 Design-Konzept

### Farbpalette

- **Primär:** Jutta-900 (#171717) - Tiefes Schwarz für Text und Akzente
- **Sekundär:** Jutta-600 (#525252) - Grau für Untertitel
- **Hintergrund:** Weiß und Jutta-50 (#fafafa) - Saubere, helle Flächen
- **Akzente:** Jutta-200 (#e5e5e5) - Subtile Rahmen und Trennlinien

### Typografie

- **Überschriften:** Playfair Display (Serif) - Elegant und zeitlos
- **Fließtext:** Inter (Sans-serif) - Gut lesbar und modern

### Layout-Prinzipien

- **Minimalistisch:** Viel Weißraum, klare Struktur
- **Fokus auf Kunst:** Bilder stehen im Mittelpunkt
- **Responsive:** Optimiert für alle Bildschirmgrößen
- **Accessibility:** Barrierefreie Navigation und Kontraste

## 📱 Seiten-Übersicht

### 🏠 Home

- Hero-Sektion mit Porträt und Einführung
- Über die Kunst (Philosophie)
- Ausgewählte Werke
- Call-to-Action für Kontakt

### 🎨 Meine Kunst

- Künstlerische Philosophie
- Verwendete Techniken (Öl, Aquarell, Mischtechnik)
- Inspirationsquellen
- Atelier-Einblicke

### 🖼️ Mein Schaffen

- Galerie aller Kunstwerke
- Filter nach Techniken
- Detailansicht mit Geschichten
- Responsive Grid-Layout

### 🏛️ Ausstellungen

- Aktuelle Ausstellungen
- Vergangene Präsentationen
- Kontakt für Ausstellungsanfragen

### 📞 Kontakt

- Kontaktinformationen
- Kontaktformular
- Atelier-Besuche
- Weitere Informationen

## 🖼️ Bilder

Die Website verwendet Platzhalter-Bilder. Für die Produktion sollten folgende Bilder hinzugefügt werden:

- `jutta-portrait.jpg` - Porträt von Jutta Horn
- `atelier.jpg` - Atelier-Ansicht
- `werk-1.jpg` bis `werk-6.jpg` - Kunstwerke
- `ausstellung-1.jpg` bis `ausstellung-4.jpg` - Ausstellungsfotos
- `oelmalerei.jpg`, `aquarell.jpg`, `mischtechnik.jpg` - Technik-Beispiele

## 🚀 Deployment

### GitHub Pages

1. Build erstellen:

   ```bash
   npm run build
   ```

2. `dist/` Ordner Inhalt zu GitHub Pages deployen

### Netlify/Vercel

1. Repository mit Netlify/Vercel verbinden
2. Build-Kommando: `npm run build`
3. Output-Ordner: `dist`

## 📝 Anpassungen

### Inhalte bearbeiten

- **Texte:** Direkt in den Vue-Komponenten in `src/views/`
- **Kontaktdaten:** In `src/components/AppFooter.vue` und `src/views/KontaktView.vue`
- **Kunstwerke:** In `src/views/SchaffenView.vue` (Array `works`)

### Styling anpassen

- **Farben:** `tailwind.config.js` (Jutta-Farbpalette)
- **Komponenten-Styles:** `src/assets/css/main.css`
- **Vuetify-Theme:** `src/main.ts`

### Neue Seiten hinzufügen

1. Neue Vue-Komponente in `src/views/`
2. Route in `src/router/index.ts` hinzufügen
3. Navigation in `src/components/AppHeader.vue` erweitern

## 🤝 Beitragen

1. Fork des Repositories
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` Datei für Details.

## 👥 Kontakt

- **Website:** [juttahorn.de](https://juttahorn.de)
- **E-Mail:** info@juttahorn.de
- **GitHub:** [@deepsoul](https://github.com/deepsoul)

---

Entwickelt mit ❤️ für Jutta Horn
