# 🖼️ Anleitung: Bilder von juttahorn.de herunterladen

## Methode 1: Automatisches Skript (Empfohlen)

### Python-Skript verwenden:

```bash
# Python installieren (falls nicht vorhanden)
# macOS: brew install python3
# Ubuntu: sudo apt install python3-pip

# Requests-Bibliothek installieren
pip3 install requests

# Skript ausführen
python3 download_images.py
```

### Shell-Skript verwenden:

```bash
# Skript ausführbar machen (bereits erledigt)
chmod +x download_images.sh

# Skript ausführen
./download_images.sh
```

## Methode 2: Manueller Download über Browser

### Schritt 1: Bilder in der Netzwerk-Ansicht finden

1. Öffnen Sie https://juttahorn.de/ in Chrome/Firefox
2. Öffnen Sie die Entwicklertools (F12)
3. Gehen Sie zum "Network" Tab
4. Laden Sie die Seite neu
5. Filtern Sie nach "Images" oder "Img"
6. Suchen Sie nach URLs die mit `a.storyblok.com` beginnen

### Schritt 2: Bilder herunterladen

1. Rechtsklick auf jedes Bild in der Netzwerk-Ansicht
2. "Open in new tab" wählen
3. Rechtsklick auf das Bild → "Bild speichern unter"
4. Speichern Sie es in `src/assets/images/`

## Methode 3: Browser-Extension verwenden

### Image Downloader Extension:

1. Installieren Sie eine Browser-Extension wie "Image Downloader" oder "Bulk Image Downloader"
2. Besuchen Sie https://juttahorn.de/
3. Lassen Sie die Extension alle Bilder der Seite finden
4. Filtern Sie nach Storyblok-URLs
5. Laden Sie alle Bilder herunter

## Methode 4: Wget/Curl für alle Bilder

### Alle Bilder einer Seite herunterladen:

```bash
# Mit wget (alle Bilder von der Seite)
wget -r -l1 -H -t1 -nd -N -np -A.jpg,.jpeg,.png -P src/assets/images/ https://juttahorn.de/

# Mit curl (einzelne URLs)
curl -L -o "src/assets/images/jutta_horn_art_32.jpg" "https://a.storyblok.com/f/119691/2152x2096/23feabfb58/jutta_horn_art_32.jpg"
```

## Bekannte Bild-URLs (zum manuellen Download)

### Hauptbilder:

- `https://a.storyblok.com/f/119691/2152x2096/23feabfb58/jutta_horn_art_32.jpg`

### Weitere URLs finden Sie in der Browser-Netzwerk-Ansicht:

1. Öffnen Sie https://juttahorn.de/
2. F12 → Network Tab
3. Filtern Sie nach "Img" oder "Images"
4. Suchen Sie nach URLs mit `a.storyblok.com`

## Nach dem Download

### Bilder in der Website verwenden:

```vue
<!-- Beispiel in Vue-Komponenten -->
<img
  src="/src/assets/images/jutta_horn_art_32.jpg"
  alt="Jutta Horn Kunstwerk"
/>
```

### Bilder optimieren (optional):

```bash
# Mit ImageMagick (falls installiert)
mogrify -resize 1920x1080^ -gravity center -extent 1920x1080 src/assets/images/*.jpg
```

## Troubleshooting

### Problem: Bilder werden nicht angezeigt

- Überprüfen Sie die Pfade in den Vue-Komponenten
- Stellen Sie sicher, dass die Bilder im `src/assets/images/` Ordner sind
- Überprüfen Sie die Dateinamen (Groß-/Kleinschreibung)

### Problem: Download schlägt fehl

- Überprüfen Sie Ihre Internetverbindung
- Versuchen Sie es mit einem anderen Browser
- Verwenden Sie die manuelle Methode

### Problem: Zu viele Bilder

- Verwenden Sie die Browser-Extension mit Filtern
- Laden Sie nur die wichtigsten Bilder manuell herunter
- Fokussieren Sie sich auf die Hauptbilder der Website

## Nächste Schritte

Nach dem Download der Bilder:

1. Überprüfen Sie, ob alle Bilder korrekt angezeigt werden
2. Optimieren Sie die Bildgrößen falls nötig
3. Aktualisieren Sie die Bildpfade in den Vue-Komponenten
4. Testen Sie die Website lokal
