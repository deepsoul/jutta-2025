#!/usr/bin/env python3
"""
Skript zum Herunterladen von Bildern von juttahorn.de
"""

import requests
import os
from urllib.parse import urlparse
import time

# Basis-URL für Storyblok CDN
STORYBLOK_BASE = "https://a.storyblok.com/f/119691/"

# Bekannte Bild-URLs von juttahorn.de
KNOWN_IMAGES = [
    "2152x2096/23feabfb58/jutta_horn_art_32.jpg",
    # Weitere Bilder können hier hinzugefügt werden
]

# Zielverzeichnis
TARGET_DIR = "src/assets/images"

def download_image(url, filename):
    """Lädt ein einzelnes Bild herunter"""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        # Vollständigen Pfad erstellen
        filepath = os.path.join(TARGET_DIR, filename)
        
        # Verzeichnis erstellen falls es nicht existiert
        os.makedirs(TARGET_DIR, exist_ok=True)
        
        # Bild speichern
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Heruntergeladen: {filename} ({len(response.content)} bytes)")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Fehler beim Herunterladen von {url}: {e}")
        return False
    except Exception as e:
        print(f"❌ Unerwarteter Fehler: {e}")
        return False

def main():
    """Hauptfunktion"""
    print("🖼️  Lade Bilder von juttahorn.de herunter...")
    print(f"📁 Zielverzeichnis: {TARGET_DIR}")
    print("-" * 50)
    
    success_count = 0
    total_count = len(KNOWN_IMAGES)
    
    for image_path in KNOWN_IMAGES:
        url = STORYBLOK_BASE + image_path
        filename = os.path.basename(image_path)
        
        print(f"📥 Lade herunter: {filename}")
        
        if download_image(url, filename):
            success_count += 1
        
        # Kurze Pause zwischen Downloads
        time.sleep(0.5)
    
    print("-" * 50)
    print(f"✅ Erfolgreich heruntergeladen: {success_count}/{total_count} Bilder")
    
    if success_count < total_count:
        print("\n💡 Tipp: Überprüfen Sie die URLs in der Browser-Netzwerk-Ansicht")
        print("   und fügen Sie weitere Bild-URLs zum KNOWN_IMAGES Array hinzu.")

if __name__ == "__main__":
    main()
