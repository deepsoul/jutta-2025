# 🚀 Vercel Deployment Guide für Jutta Horn Website

## Automatisches Deployment

### 1. Vercel CLI Installation

```bash
# Vercel CLI installieren
npm i -g vercel

# Oder mit yarn
yarn global add vercel
```

### 2. Login bei Vercel

```bash
vercel login
```

### 3. Projekt deployen

```bash
# Im Projektverzeichnis
vercel

# Für Produktions-Deployment
vercel --prod
```

## GitHub Integration (Empfohlen)

### 1. GitHub Repository verknüpfen

1. Gehen Sie zu [vercel.com](https://vercel.com)
2. Klicken Sie auf "New Project"
3. Wählen Sie Ihr GitHub Repository: `deepsoul/jutta-2025`
4. Vercel erkennt automatisch Vue.js + Vite

### 2. Build-Einstellungen

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Environment Variables (Optional)

Fügen Sie in Vercel Dashboard hinzu:

```
VITE_APP_TITLE=Jutta Horn - Künstlerin
VITE_APP_DESCRIPTION=Website für die Künstlerin Jutta Horn
VITE_CONTACT_EMAIL=info@juttahorn.de
VITE_CONTACT_PHONE=+4915233644324
```

## Manuelles Deployment

### 1. Build erstellen

```bash
npm run build
```

### 2. Vercel deployen

```bash
vercel --prod
```

## Domain Setup

### 1. Custom Domain hinzufügen

1. Gehen Sie zu Vercel Dashboard
2. Wählen Sie Ihr Projekt
3. Gehen Sie zu "Settings" → "Domains"
4. Fügen Sie Ihre Domain hinzu: `juttahorn.de`

### 2. DNS-Einstellungen

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## Performance Optimierung

### 1. Bildoptimierung

- Alle Bilder sind bereits optimiert
- Vercel optimiert automatisch Bilder
- WebP-Format wird automatisch generiert

### 2. Caching

- Statische Assets: 1 Jahr Cache
- Bilder: 1 Jahr Cache
- HTML: 1 Stunde Cache

### 3. CDN

- Vercel Edge Network
- Globale Verteilung
- Automatische HTTPS

## Monitoring

### 1. Analytics

- Vercel Analytics ist aktiviert
- Performance-Metriken verfügbar
- Real User Monitoring

### 2. Logs

```bash
# Logs anzeigen
vercel logs

# Live Logs
vercel logs --follow
```

## Troubleshooting

### Problem: Build schlägt fehl

```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install

# Build testen
npm run build
```

### Problem: Bilder werden nicht angezeigt

- Überprüfen Sie die Pfade in den Vue-Komponenten
- Stellen Sie sicher, dass Bilder im `src/assets/images/` Ordner sind
- Testen Sie lokal: `npm run preview`

### Problem: Routing funktioniert nicht

- Überprüfen Sie die `vercel.json` Konfiguration
- Rewrites sind korrekt konfiguriert

## Automatische Deployments

### GitHub Integration

- Jeder Push zu `main` Branch löst automatisches Deployment aus
- Preview-Deployments für Pull Requests
- Rollback-Funktion verfügbar

### Branch-Strategie

```
main → Production (jutta-horn-2025.vercel.app)
develop → Preview (jutta-horn-2025-git-develop.vercel.app)
feature/* → Preview (jutta-horn-2025-git-feature-*.vercel.app)
```

## Sicherheit

### 1. Environment Variables

- Sensible Daten nur in Vercel Dashboard
- Nicht in Git committen
- `.env.local` in `.gitignore`

### 2. HTTPS

- Automatisch aktiviert
- Let's Encrypt Zertifikate
- HTTP → HTTPS Redirect

## Kosten

### Vercel Free Tier

- ✅ Unbegrenzte Personal-Projekte
- ✅ 100GB Bandwidth/Monat
- ✅ Unbegrenzte Deployments
- ✅ Custom Domains
- ✅ HTTPS

### Pro Tier (Optional)

- $20/Monat
- Erweiterte Analytics
- Priority Support
- Team Collaboration

## Support

### Vercel Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Projekt-spezifisch

- GitHub Issues: [deepsoul/jutta-2025](https://github.com/deepsoul/jutta-2025)
- README.md für technische Details
