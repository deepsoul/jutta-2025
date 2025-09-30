#!/usr/bin/env python3
"""
Download logo and favicons from juttahorn.de
"""

import requests
import os
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import re

def download_file(url, filename, directory="public"):
    """Download a file and save it to the specified directory"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Create directory if it doesn't exist
        os.makedirs(directory, exist_ok=True)
        
        # Save file
        filepath = os.path.join(directory, filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"❌ Error downloading {filename}: {e}")
        return False

def find_logo_and_favicons(url):
    """Find logo and favicon URLs from the website"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        logo_urls = []
        favicon_urls = []
        
        # Look for logo images (common patterns)
        logo_selectors = [
            'img[alt*="logo" i]',
            'img[class*="logo" i]',
            'img[id*="logo" i]',
            '.logo img',
            '#logo img',
            'header img',
            '.header img'
        ]
        
        for selector in logo_selectors:
            images = soup.select(selector)
            for img in images:
                src = img.get('src')
                if src:
                    full_url = urljoin(url, src)
                    logo_urls.append(full_url)
        
        # Look for favicons
        favicon_selectors = [
            'link[rel="icon"]',
            'link[rel="shortcut icon"]',
            'link[rel="apple-touch-icon"]',
            'link[rel="apple-touch-icon-precomposed"]',
            'link[rel="mask-icon"]',
            'link[rel="manifest"]'
        ]
        
        for selector in favicon_selectors:
            links = soup.select(selector)
            for link in links:
                href = link.get('href')
                if href:
                    full_url = urljoin(url, href)
                    favicon_urls.append(full_url)
        
        # Also check for common favicon paths
        common_favicon_paths = [
            '/favicon.ico',
            '/favicon.png',
            '/apple-touch-icon.png',
            '/apple-touch-icon-180x180.png',
            '/android-chrome-192x192.png',
            '/android-chrome-512x512.png'
        ]
        
        for path in common_favicon_paths:
            full_url = urljoin(url, path)
            try:
                response = requests.head(full_url, timeout=5)
                if response.status_code == 200:
                    favicon_urls.append(full_url)
            except:
                pass
        
        return logo_urls, favicon_urls
        
    except Exception as e:
        print(f"❌ Error parsing website: {e}")
        return [], []

def main():
    base_url = "https://juttahorn.de"
    
    print("🔍 Searching for logo and favicons on juttahorn.de...")
    
    logo_urls, favicon_urls = find_logo_and_favicons(base_url)
    
    print(f"\n📸 Found {len(logo_urls)} potential logo images:")
    for i, url in enumerate(logo_urls, 1):
        print(f"  {i}. {url}")
    
    print(f"\n🎯 Found {len(favicon_urls)} potential favicons:")
    for i, url in enumerate(favicon_urls, 1):
        print(f"  {i}. {url}")
    
    # Download logos
    print(f"\n📥 Downloading logos...")
    logo_count = 0
    for i, url in enumerate(logo_urls):
        filename = f"logo_{i+1}.{url.split('.')[-1].split('?')[0]}"
        if download_file(url, filename, "public/assets"):
            logo_count += 1
    
    # Download favicons
    print(f"\n📥 Downloading favicons...")
    favicon_count = 0
    for i, url in enumerate(favicon_urls):
        # Extract filename from URL or create one
        parsed_url = urlparse(url)
        filename = os.path.basename(parsed_url.path)
        if not filename or '.' not in filename:
            filename = f"favicon_{i+1}.ico"
        
        if download_file(url, filename, "public"):
            favicon_count += 1
    
    print(f"\n✅ Download complete!")
    print(f"   Logos downloaded: {logo_count}")
    print(f"   Favicons downloaded: {favicon_count}")

if __name__ == "__main__":
    main()
