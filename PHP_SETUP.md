# PHP-Setup für Kontaktformular

## 📁 Dateien hochladen

Laden Sie die folgenden Dateien auf `www.juttahorn.de` hoch:

### 1. Hauptdatei: `contact-form-simple.php`
- **Pfad:** `/contact-form-simple.php` (im Root-Verzeichnis)
- **Zweck:** E-Mail-Versand und Validierung
- **Funktionen:** 
  - Empfängt Formulardaten von der Website
  - Sendet E-Mail an info@juttahorn.de
  - Sendet Bestätigungs-E-Mail an Absender

### 2. Erweiterte Version: `contact-form.php`
- **Pfad:** `/contact-form.php` (im Root-Verzeichnis)
- **Zweck:** E-Mail-Versand mit HTML-Templates
- **Funktionen:** 
  - Professionelle HTML-E-Mails
  - Erweiterte Formatierung
  - Bessere Darstellung

## 🔧 Konfiguration

### E-Mail-Einstellungen
Das PHP-Skript verwendet die Standard-PHP `mail()` Funktion mit folgenden Einstellungen:

```php
$to = 'info@juttahorn.de';           // Empfänger
$from = 'noreply@juttahorn.de';      // Absender
$replyTo = $email;                   // Antwort an Absender
```

### CORS-Konfiguration
Das Skript ist für die Vercel-Website konfiguriert:
```php
header('Access-Control-Allow-Origin: https://juttahorn-2025-relaunch.vercel.app');
```

## 🚀 Installation

### Schritt 1: Dateien hochladen
1. Laden Sie `contact-form-simple.php` auf `www.juttahorn.de` hoch
2. Stellen Sie sicher, dass die Datei im Root-Verzeichnis liegt
3. Setzen Sie die Berechtigungen auf 644

### Schritt 2: Testen
1. Besuchen Sie `https://www.juttahorn.de/contact-form-simple.php`
2. Sie sollten eine JSON-Antwort sehen: `{"error":"Method not allowed"}`
3. Das ist normal - das Skript funktioniert nur mit POST-Requests

### Schritt 3: Website-Integration
1. Die Vercel-Website ist bereits konfiguriert
2. Das Kontaktformular sendet automatisch an das PHP-Skript
3. E-Mails werden über All-Inkl versendet

## 📧 E-Mail-Funktionen

### Benachrichtigungs-E-Mail (an Jutta)
- **Empfänger:** info@juttahorn.de
- **Betreff:** "Kontaktformular: [Betreff]"
- **Inhalt:** 
  - Kontaktdaten des Absenders
  - Nachricht
  - Strukturierte Formatierung

### Bestätigungs-E-Mail (an Absender)
- **Empfänger:** E-Mail-Adresse des Absenders
- **Betreff:** "Bestätigung: Ihre Nachricht wurde gesendet"
- **Inhalt:**
  - Bestätigung des Erhalts
  - Zusammenfassung der Nachricht
  - Kontaktdaten von Jutta

## 🔒 Sicherheit

### Validierung
- **E-Mail-Format:** Überprüfung mit `filter_var()`
- **Pflichtfelder:** Alle Felder werden validiert
- **XSS-Schutz:** `htmlspecialchars()` für alle Eingaben
- **CSRF-Schutz:** CORS-Header für sichere Requests

### Fehlerbehandlung
- **Validierungsfehler:** 400 Bad Request
- **Server-Fehler:** 500 Internal Server Error
- **Method-Fehler:** 405 Method Not Allowed
- **JSON-Responses:** Strukturierte Fehlermeldungen

## 🛠️ Wartung

### Logs überprüfen
- PHP-Error-Logs in All-Inkl Control Panel
- E-Mail-Versand-Status überwachen
- CORS-Fehler in Browser-Konsole prüfen

### Updates
- Bei Änderungen an der Website: CORS-Header anpassen
- Bei Domain-Änderungen: URLs in PHP-Skript aktualisieren
- Bei E-Mail-Änderungen: `$to` und `$from` Variablen anpassen

## 📞 Support

### Häufige Probleme
1. **CORS-Fehler:** Origin in PHP-Skript prüfen
2. **E-Mail nicht ankommen:** All-Inkl E-Mail-Konfiguration prüfen
3. **500-Fehler:** PHP-Error-Logs überprüfen
4. **Validierungsfehler:** Formular-Daten prüfen

### Debugging
- Browser-Entwicklertools für Netzwerk-Requests
- PHP-Error-Logs für Server-Probleme
- E-Mail-Client für E-Mail-Versand-Status

## ✅ Vorteile der PHP-Lösung

- **Zuverlässig:** Bewährte PHP-Technologie
- **Einfach:** Keine komplexen Dependencies
- **Sicher:** Server-seitige Validierung
- **Professionell:** E-Mails von der Domain
- **Wartbar:** Standard-PHP ohne Frameworks
- **Performant:** Direkte Server-Verbindung
