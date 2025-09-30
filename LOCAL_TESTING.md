# Lokales Testen des Kontaktformulars

## 🚀 Schnelle Lösung: Lokales PHP-Skript

### Option 1: Lokales PHP-Skript verwenden

1. **PHP-Server starten:**
```bash
cd /Users/bhorn/DEV/rocksoul/jutta-2025/php
php -S localhost:8000
```

2. **Frontend anpassen (temporär):**
```javascript
// In KontaktView.vue temporär ändern:
const response = await fetch('http://localhost:8000/local-test.php', {
  // ... rest bleibt gleich
});
```

3. **Testen:**
- Formular ausfüllen und absenden
- Siehe `contact-log.txt` für empfangene Daten
- Keine echten E-Mails werden gesendet

### Option 2: CORS-Problem umgehen

**Browser mit deaktiviertem CORS starten:**

**Chrome (macOS):**
```bash
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

**Chrome (Windows):**
```bash
chrome.exe --user-data-dir="c:/temp/chrome_dev_test" --disable-web-security
```

**Firefox:**
1. `about:config` öffnen
2. `security.fileuri.strict_origin_policy` auf `false` setzen

### Option 3: Vite Proxy verwenden

**vite.config.ts anpassen:**
```typescript
export default defineConfig({
  // ... existing config
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'https://www.juttahorn.de',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

**Frontend anpassen:**
```javascript
const response = await fetch('/api/contact-form-simple.php', {
  // ... rest bleibt gleich
});
```

## 🔧 CORS-Problem beheben

### Problem:
```
Access to fetch at 'https://www.juttahorn.de/contact-form-simple.php' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

### Lösung 1: PHP-Skript aktualisieren
Das PHP-Skript wurde bereits aktualisiert und unterstützt jetzt:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`
- `http://localhost:3003`
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:5175`
- `http://127.0.0.1:*` (alle Ports)

### Lösung 2: Lokales Test-Skript
Verwenden Sie `local-test.php` für lokales Testen ohne E-Mail-Versand.

## 📝 Testen ohne E-Mail-Versand

### Lokales Test-Skript verwenden:

1. **PHP-Server starten:**
```bash
cd php
php -S localhost:8000
```

2. **Frontend temporär anpassen:**
```javascript
// In KontaktView.vue
const response = await fetch('http://localhost:8000/local-test.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: form.value.name,
    email: form.value.email,
    subject: form.value.subject,
    message: form.value.message,
  }),
});
```

3. **Ergebnis:**
- ✅ Formular-Validierung funktioniert
- ✅ Keine CORS-Probleme
- ✅ Daten werden in `contact-log.txt` gespeichert
- ✅ Keine echten E-Mails werden gesendet

## 🚀 Produktions-Deployment

### Nach dem Testen:

1. **PHP-Skript auf www.juttahorn.de hochladen**
2. **Frontend auf ursprüngliche URL zurücksetzen:**
```javascript
const response = await fetch('https://www.juttahorn.de/contact-form-simple.php', {
  // ... rest bleibt gleich
});
```

3. **Vercel deployen** - funktioniert sofort

## 🛠️ Debugging

### CORS-Fehler prüfen:
1. Browser-Entwicklertools öffnen
2. Network-Tab prüfen
3. Request-Headers überprüfen
4. Response-Headers prüfen

### PHP-Fehler prüfen:
1. PHP-Error-Logs überprüfen
2. `contact-log.txt` für lokale Tests
3. Browser-Konsole für JavaScript-Fehler

## ✅ Vorteile der lokalen Lösung

- **Schnelles Testen** - keine Server-Uploads nötig
- **Keine CORS-Probleme** - lokaler Server
- **Sichere Tests** - keine echten E-Mails
- **Einfache Entwicklung** - sofortige Ergebnisse
