# All-Inkl E-Mail Konfiguration für Vercel

## All-Inkl SMTP Einstellungen

All-Inkl verwendet spezielle SMTP-Server je nach Domain. Hier sind die korrekten Einstellungen:

### Umgebungsvariablen in Vercel setzen

Gehen Sie zu Ihrem Vercel Dashboard und setzen Sie folgende Umgebungsvariablen:

#### SMTP Server Konfiguration

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@juttahorn.de
SMTP_PASS=ihr-email-passwort
```

#### E-Mail Adressen

```
SMTP_FROM=info@juttahorn.de
CONTACT_EMAIL=info@juttahorn.de
```

## All-Inkl Domain-spezifische Einstellungen

### Für juttahorn.de Domain:

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=587
SMTP_SECURE=false
```

### Alternative All-Inkl SMTP-Server (falls mail.juttahorn.de nicht funktioniert):

```
SMTP_HOST=smtp.all-inkl.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Oder mit SSL (Port 465):

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=465
SMTP_SECURE=true
```

## Schritt-für-Schritt Anleitung

### 1. All-Inkl E-Mail-Account vorbereiten

- ✅ **E-Mail-Account erstellen** in Ihrem All-Inkl Control Panel
- ✅ **E-Mail-Adresse:** info@juttahorn.de (oder Ihre gewünschte Adresse)
- ✅ **Passwort:** Starkes Passwort setzen
- ✅ **E-Mail-Weiterleitung** einrichten (falls gewünscht)

### 2. All-Inkl Control Panel Einstellungen

1. **Login** in Ihr All-Inkl Control Panel
2. **E-Mail** → **E-Mail-Accounts** auswählen
3. **Neuen Account erstellen** oder bestehenden konfigurieren
4. **SMTP aktivieren** (sollte standardmäßig aktiviert sein)

### 3. Vercel Umgebungsvariablen setzen

1. **Vercel Dashboard** öffnen: https://vercel.com/dashboard
2. **Ihr Projekt** auswählen
3. **Settings** → **Environment Variables** klicken
4. **Folgende Variablen hinzufügen:**

```
Name: SMTP_HOST
Value: mail.juttahorn.de

Name: SMTP_PORT
Value: 587

Name: SMTP_SECURE
Value: false

Name: SMTP_USER
Value: info@juttahorn.de

Name: SMTP_PASS
Value: ihr-email-passwort

Name: SMTP_FROM
Value: info@juttahorn.de

Name: CONTACT_EMAIL
Value: info@juttahorn.de
```

### 4. Deploy und Testen

1. **Projekt deployen** (automatisch nach Git Push)
2. **Kontaktformular testen**
3. **E-Mails überprüfen** (Posteingang und Spam-Ordner)

## Häufige All-Inkl Probleme und Lösungen

### Problem: "Authentication failed"

**Lösung:**

- ✅ E-Mail-Adresse und Passwort überprüfen
- ✅ SMTP in All-Inkl Control Panel aktiviert?
- ✅ Korrekte Domain verwenden (mail.juttahorn.de)

### Problem: "Connection timeout"

**Lösung:**

- ✅ Port 587 statt 465 versuchen
- ✅ SMTP_SECURE auf false setzen
- ✅ Alternative SMTP-Hosts testen

### Problem: "Relay denied"

**Lösung:**

- ✅ SMTP_USER muss vollständige E-Mail-Adresse sein
- ✅ E-Mail-Account muss in All-Inkl aktiviert sein

## Alternative SMTP-Hosts für All-Inkl

Falls `mail.juttahorn.de` nicht funktioniert, versuchen Sie:

### Option 1: All-Inkl Standard

```
SMTP_HOST=smtp.all-inkl.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Option 2: Mit SSL

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=465
SMTP_SECURE=true
```

### Option 3: Alternative Ports

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=25
SMTP_SECURE=false
```

## Test-Konfigurationen

### Test 1: Standard All-Inkl

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@juttahorn.de
SMTP_PASS=ihr-passwort
```

### Test 2: Mit SSL

```
SMTP_HOST=mail.juttahorn.de
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@juttahorn.de
SMTP_PASS=ihr-passwort
```

### Test 3: All-Inkl Standard Server

```
SMTP_HOST=smtp.all-inkl.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@juttahorn.de
SMTP_PASS=ihr-passwort
```

## Sicherheitshinweise

- ✅ **Starkes Passwort** verwenden
- ✅ **Regelmäßig Passwort ändern**
- ✅ **E-Mail-Account nur für Website** verwenden
- ✅ **Spam-Filter** in All-Inkl konfigurieren

## Support

Falls Probleme auftreten:

1. **All-Inkl Support** kontaktieren
2. **SMTP-Einstellungen** in Control Panel überprüfen
3. **Alternative Konfigurationen** testen
4. **Vercel Logs** überprüfen

## Erfolgreiche Konfiguration testen

Nach dem Setzen der Umgebungsvariablen:

1. **Projekt deployen**
2. **Kontaktformular ausfüllen**
3. **E-Mail an info@juttahorn.de** sollte ankommen
4. **Bestätigungs-E-Mail** an Absender sollte ankommen

Die E-Mail-Funktionalität ist dann vollständig einsatzbereit! 🎉
