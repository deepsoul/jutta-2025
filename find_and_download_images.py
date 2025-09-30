#!/usr/bin/env python3
"""
Erweiterte Skript zum Finden und Herunterladen aller Bilder von juttahorn.de
"""

import requests
import os
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

# Zielverzeichnis
TARGET_DIR = "src/assets/images"

def find_images_on_page(url):
    """Findet alle Bilder auf einer Webseite"""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        images = []
        
        # Alle img-Tags finden
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                # Absolute URL erstellen
                absolute_url = urljoin(url, src)
                images.append(absolute_url)
        
        # CSS-Hintergrundbilder finden
        for style in soup.find_all(style=True):
            style_content = style['style']
            # background-image: url(...) finden
            bg_images = re.findall(r'background-image:\s*url\(["\']?([^"\']+)["\']?\)', style_content)
            for bg_img in bg_images:
                absolute_url = urljoin(url, bg_img)
                images.append(absolute_url)
        
        return images
        
    except Exception as e:
        print(f"❌ Fehler beim Analysieren von {url}: {e}")
        return []

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
        
    except Exception as e:
        print(f"❌ Fehler beim Herunterladen von {url}: {e}")
        return False

def clean_filename(url):
    """Erstellt einen sauberen Dateinamen aus der URL"""
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    
    # Falls kein Dateiname, einen generieren
    if not filename or '.' not in filename:
        filename = f"image_{hash(url) % 10000}.jpg"
    
    return filename

def main():
    """Hauptfunktion"""
    print("🖼️  Finde und lade Bilder von juttahorn.de herunter...")
    print(f"📁 Zielverzeichnis: {TARGET_DIR}")
    print("-" * 60)
    
    # URLs der Website
    urls_to_check = [
        "https://juttahorn.de/",
        "https://juttahorn.de/mein-schaffen",
        "https://juttahorn.de/meine-kunst",
        "https://juttahorn.de/ausstellungen",
        "https://juttahorn.de/kontakt"
    ]
    
    all_images = set()
    
    # Bilder auf allen Seiten finden
    for url in urls_to_check:
        print(f"🔍 Analysiere: {url}")
        images = find_images_on_page(url)
        all_images.update(images)
        print(f"   Gefunden: {len(images)} Bilder")
        time.sleep(1)  # Höflichkeitspause
    
    print(f"\n📊 Gesamt gefunden: {len(all_images)} einzigartige Bilder")
    print("-" * 60)
    
    # Nur Storyblok-Bilder herunterladen
    storyblok_images = [img for img in all_images if 'a.storyblok.com' in img]
    print(f"🎨 Storyblok-Bilder: {len(storyblok_images)}")
    
    success_count = 0
    
    for i, url in enumerate(storyblok_images, 1):
        filename = clean_filename(url)
        print(f"📥 [{i}/{len(storyblok_images)}] {filename}")
        
        if download_image(url, filename):
            success_count += 1
        
        time.sleep(0.5)  # Höflichkeitspause
    
    print("-" * 60)
    print(f"✅ Erfolgreich heruntergeladen: {success_count}/{len(storyblok_images)} Bilder")
    
    if success_count > 0:
        print(f"📁 Bilder gespeichert in: {TARGET_DIR}/")
        print("\n💡 Nächste Schritte:")
        print("   1. Überprüfen Sie die heruntergeladenen Bilder")
        print("   2. Benennen Sie sie um (z.B. jutta-portrait.jpg, werk-1.jpg)")
        print("   3. Aktualisieren Sie die Bildpfade in den Vue-Komponenten")

if __name__ == "__main__":
    # BeautifulSoup installieren falls nicht vorhanden
    try:
        import bs4
    except ImportError:
        print("📦 Installiere BeautifulSoup4...")
        os.system("pip3 install beautifulsoup4")
        import bs4
    
    main()
