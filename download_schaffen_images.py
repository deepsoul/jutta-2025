#!/usr/bin/env python3
"""
Skript zum Herunterladen aller Bilder von juttahorn.de/mein-schaffen
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
        
        # JavaScript-Loaded Bilder finden (in script-Tags)
        for script in soup.find_all('script'):
            if script.string:
                # Storyblok URLs in JavaScript finden
                storyblok_urls = re.findall(r'https://a\.storyblok\.com/[^"\']+', script.string)
                images.extend(storyblok_urls)
        
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
        filename = f"schaffen_{hash(url) % 10000}.jpg"
    
    return filename

def main():
    """Hauptfunktion"""
    print("🖼️  Lade Bilder von juttahorn.de/mein-schaffen herunter...")
    print(f"📁 Zielverzeichnis: {TARGET_DIR}")
    print("-" * 60)
    
    # URL der Schaffen-Seite
    url = "https://juttahorn.de/mein-schaffen"
    
    print(f"🔍 Analysiere: {url}")
    images = find_images_on_page(url)
    print(f"   Gefunden: {len(images)} Bilder")
    
    # Alle Bilder anzeigen
    for i, img_url in enumerate(images, 1):
        print(f"   {i}. {img_url}")
    
    print("-" * 60)
    
    # Nur Storyblok-Bilder herunterladen
    storyblok_images = [img for img in images if 'a.storyblok.com' in img]
    print(f"🎨 Storyblok-Bilder: {len(storyblok_images)}")
    
    if not storyblok_images:
        print("⚠️  Keine Storyblok-Bilder gefunden!")
        print("💡 Versuche alternative Methode...")
        
        # Versuche auch andere Bild-URLs
        other_images = [img for img in images if any(ext in img.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp'])]
        print(f"🖼️  Andere Bildformate: {len(other_images)}")
        
        for img_url in other_images:
            print(f"   - {img_url}")
        
        storyblok_images = other_images
    
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
        print("   2. Benennen Sie sie um (z.B. schaffen-1.jpg, schaffen-2.jpg)")
        print("   3. Aktualisieren Sie die Bildpfade in den Vue-Komponenten")

if __name__ == "__main__":
    main()
