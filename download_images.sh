#!/bin/bash

# Skript zum Herunterladen von Bildern von juttahorn.de
# Verwendung: ./download_images.sh

echo "🖼️  Lade Bilder von juttahorn.de herunter..."

# Zielverzeichnis erstellen
mkdir -p src/assets/images

# Bekannte Bild-URLs
BASE_URL="https://a.storyblok.com/f/119691/"

# Bild 1: jutta_horn_art_32.jpg
echo "📥 Lade herunter: jutta_horn_art_32.jpg"
curl -L -o "src/assets/images/jutta_horn_art_32.jpg" "${BASE_URL}2152x2096/23feabfb58/jutta_horn_art_32.jpg"

# Weitere Bilder können hier hinzugefügt werden
# echo "📥 Lade herunter: bild2.jpg"
# curl -L -o "src/assets/images/bild2.jpg" "${BASE_URL}path/to/bild2.jpg"

echo "✅ Download abgeschlossen!"
echo "📁 Bilder gespeichert in: src/assets/images/"
