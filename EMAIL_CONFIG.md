# E-Mail Konfiguration für Vercel

## Umgebungsvariablen in Vercel setzen

Gehen Sie zu Ihrem Vercel Dashboard und setzen Sie folgende Umgebungsvariablen:

### SMTP Server Konfiguration

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### E-Mail Adressen

```
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=info@juttahorn.de
```

## Gmail Setup (Empfohlen)

1. **2-Faktor-Authentifizierung aktivieren**

   - Gehen Sie zu https://myaccount.google.com/security
   - Aktivieren Sie "2-Step Verification"

2. **App-Passwort erstellen**

   - Gehen Sie zu https://myaccount.google.com/apppasswords
   - Erstellen Sie ein neues App-Passwort für "Mail"
   - Verwenden Sie dieses Passwort als `SMTP_PASS`

3. **Umgebungsvariablen in Vercel setzen**
   - Gehen Sie zu Ihrem Vercel Dashboard
   - Wählen Sie Ihr Projekt aus
   - Gehen Sie zu "Settings" > "Environment Variables"
   - Fügen Sie alle Variablen hinzu

## Alternative E-Mail-Provider

### All-Inkl (Deutscher Provider)

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@juttahorn.de
SMTP_PASS=ihr-email-passwort
```

**Detaillierte Anleitung:** Siehe `ALL_INKL_CONFIG.md`

### Outlook/Hotmail

```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo

```
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Custom SMTP

Verwenden Sie die Einstellungen Ihres E-Mail-Providers.

## Testen

Nach dem Setzen der Umgebungsvariablen:

1. Deployen Sie das Projekt auf Vercel
2. Testen Sie das Kontaktformular
3. Überprüfen Sie, ob E-Mails ankommen

## Sicherheit

- Verwenden Sie niemals Ihr Haupt-Passwort
- Verwenden Sie App-Passwörter oder spezielle E-Mail-Accounts
- Die Umgebungsvariablen sind sicher in Vercel gespeichert
