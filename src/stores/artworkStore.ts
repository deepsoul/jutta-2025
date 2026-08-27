import {ref, computed} from 'vue';

export interface Artwork {
  id: number;
  title: string;
  technique: string;
  year?: string;
  size?: string;
  category: string;
  description: string;
  story?: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'jutta-horn-artworks';
const CATALOG_VERSION_KEY = 'jutta-horn-artworks-catalog-version';
const CATALOG_VERSION = 'jutta-104-fotokunst';

const stripSizeAndYear = (artwork: Artwork): Artwork => {
  const next = {...artwork};
  delete next.size;
  delete next.year;
  return next;
};

const applyCatalogMetadata = (stored: Artwork[]): Artwork[] => {
  const seeds = new Map(initialArtworks.map((artwork) => [artwork.id, artwork]));
  const storedIds = new Set(stored.map((item) => item.id));
  const updated = stored.map((item) => {
    const seed = seeds.get(item.id);
    const withoutSizeAndYear = stripSizeAndYear(item);
    if (!seed) {
      return withoutSizeAndYear;
    }
    return {
      ...withoutSizeAndYear,
      title: seed.title,
      technique: seed.technique,
      category: seed.category,
      description: seed.description,
      story: seed.story,
      image: seed.image,
    };
  });
  const appended = initialArtworks
    .filter((seed) => !storedIds.has(seed.id))
    .map((seed) => ({
      ...stripSizeAndYear(seed),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  return [...updated, ...appended];
};

// Initial data - this will be loaded into localStorage if not present
const initialArtworks: Artwork[] = [
  {
    id: 1,
    title: 'Nebelufer',
    technique: 'Öl auf Leinwand',
    category: 'Ölmalerei',
    description: 'Ein ausdrucksstarkes Werk aus Jutta Horns Sammlung.',
    story:
      'Dieses Werk zeigt die charakteristische Handschrift der Künstlerin.',
    image: '/assets/jutta_horn_art_1.jpg',
  },
  {
    id: 2,
    title: 'Graue Weite',
    technique: 'Mischtechnik',
    category: 'Mischtechnik',
    description: 'Ein weiteres beeindruckendes Werk aus der Sammlung.',
    story: 'Die Komposition zeigt Jutta Horns künstlerische Entwicklung.',
    image: '/assets/jutta_horn_art_2.jpg',
  },
  {
    id: 3,
    title: 'Lichtband',
    technique: 'Öl auf Leinwand',
    category: 'Ölmalerei',
    description: 'Ein Werk, das die künstlerische Vision widerspiegelt.',
    story:
      'Entstanden in einer Phase intensiver künstlerischer Auseinandersetzung.',
    image: '/assets/jutta_horn_art_3.jpg',
  },
  {
    id: 4,
    title: 'Silberhorizont',
    technique: 'Aquarell',
    category: 'Aquarell',
    description: 'Ein zartes Aquarell mit starker emotionaler Ausdruckskraft.',
    story:
      'Die Leichtigkeit des Aquarells verbindet sich mit tiefem künstlerischem Ausdruck.',
    image: '/assets/jutta_horn_art_4.jpg',
  },
  {
    id: 5,
    title: 'Dunkle Erde',
    technique: 'Öl auf Leinwand',
    category: 'Ölmalerei',
    description: 'Ein kraftvolles Werk mit starker Präsenz.',
    story: 'Die Ölmalerei ermöglicht tiefe Schichtungen und reiche Texturen.',
    image: '/assets/jutta_horn_art_6.jpg',
  },
  {
    id: 6,
    title: 'Schichtfeuer',
    technique: 'Mischtechnik',
    category: 'Mischtechnik',
    description:
      'Experimentelle Techniken schaffen einzigartige Ausdrucksmöglichkeiten.',
    story:
      'Die Kombination verschiedener Medien eröffnet neue künstlerische Wege.',
    image: '/assets/jutta_horn_art_7.jpg',
  },
  {
    id: 7,
    title: 'Abendnebel',
    technique: 'Öl auf Leinwand',
    category: 'Ölmalerei',
    description: 'Ein weiteres Meisterwerk aus der Sammlung.',
    story:
      'Jedes Werk erzählt eine eigene Geschichte und zeigt die Entwicklung der Künstlerin.',
    image: '/assets/jutta_horn_art_9.jpg',
  },
  {
    id: 8,
    title: 'Wasserton',
    technique: 'Aquarell',
    category: 'Aquarell',
    description: 'Die Transparenz des Aquarells schafft besondere Stimmungen.',
    story: 'Aquarellmalerei erfordert Präzision und gleichzeitig Spontaneität.',
    image: '/assets/jutta_horn_art_11.jpg',
  },
  {
    id: 9,
    title: 'Zwischenlicht',
    technique: 'Mischtechnik',
    category: 'Mischtechnik',
    description:
      'Verschiedene Materialien verbinden sich zu einem harmonischen Ganzen.',
    story: 'Die Mischtechnik ermöglicht unendliche Variationsmöglichkeiten.',
    image: '/assets/jutta_horn_art_12.jpg',
  },
  {
    id: 10,
    title: 'Stille Fläche',
    technique: 'Öl auf Leinwand',
    category: 'Ölmalerei',
    description: 'Ein Werk, das die künstlerische Reife zeigt.',
    story: 'Jahrelange Erfahrung spiegelt sich in jedem Pinselstrich wider.',
    image: '/assets/jutta_horn_art_13.jpg',
  },
  {
    id: 11,
    title: 'Dunst',
    technique: 'Aquarell',
    category: 'Aquarell',
    description: 'Leichtigkeit und Tiefe vereinen sich in diesem Werk.',
    story: 'Das Aquarell fängt flüchtige Momente für die Ewigkeit ein.',
    image: '/assets/jutta_horn_art_14.jpg',
  },
  {
    id: 12,
    title: 'Echo',
    technique: 'Öl auf Leinwand',
    category: 'Ölmalerei',
    description: 'Ein kraftvolles Statement der Künstlerin.',
    story: 'Jedes Werk ist ein Dialog zwischen Künstlerin und Betrachter.',
    image: '/assets/jutta_horn_art_15.jpg',
  },
  {
    id: 13,
    title: 'Linie im Raum',
    technique: 'Bleistift auf Papier',
    category: 'Zeichnung',
    description:
      'Eine feine Bleistiftzeichnung mit präzisen Linien und Schattierungen.',
    story:
      'Die Zeichnung zeigt Jutta Horns Können in der klassischen Zeichentechnik.',
    image: '/assets/jutta_horn_art_16.jpg',
  },
  {
    id: 14,
    title: 'Kohlespur',
    technique: 'Kohle auf Papier',
    category: 'Zeichnung',
    description: 'Eine ausdrucksstarke Kohlezeichnung mit starken Kontrasten.',
    story: 'Die Kohle ermöglicht tiefe Schatten und dramatische Effekte.',
    image: '/assets/jutta_horn_art_17.jpg',
  },
  {
    id: 15,
    title: 'Tintenspiel',
    technique: 'Tinte auf Papier',
    category: 'Zeichnung',
    description: 'Eine präzise Tintenzeichnung mit filigranen Details.',
    story: 'Die Tinte erlaubt feine Linien und präzise Ausarbeitungen.',
    image: '/assets/jutta_horn_art_18.jpg',
  },
  {
    id: 16,
    title: 'Rötelwärme',
    technique: 'Rötel auf Papier',
    category: 'Zeichnung',
    description: 'Eine warme Rötelzeichnung mit sanften Übergängen.',
    story:
      'Der Rötel verleiht der Zeichnung eine warme, lebendige Ausstrahlung.',
    image: '/assets/jutta_horn_art_19.jpg',
  },
  {
    id: 17,
    title: 'Doppelschatten',
    technique: 'Bleistift und Kohle',
    category: 'Zeichnung',
    description:
      'Eine Mischtechnik aus Bleistift und Kohle für besondere Effekte.',
    story:
      'Die Kombination verschiedener Zeichenmaterialien schafft interessante Texturen.',
    image: '/assets/jutta_horn_art_20.jpg',
  },
  {
    id: 18,
    title: 'Kreideklang',
    technique: 'Kreide auf Papier',
    category: 'Zeichnung',
    description: 'Eine lebendige Kreidezeichnung mit kräftigen Farben.',
    story:
      'Die Kreide ermöglicht lebendige Farben und spontane Ausdruckskraft.',
    image: '/assets/jutta_horn_art_21.jpg',
  },
  {
    id: 19,
    title: 'Tiefenfluss',
    technique: 'Fotokunst',
    category: 'Fotokunst',
    description:
      'Organische Strömungen in Blau, Weiß und Schwarz verdichten sich zu einem fließenden Bildraum.',
    story:
      'Die Fotografie hält den Moment fest, in dem sich Flüssigkeiten berühren und neue Formen bilden.',
    image: '/assets/jutta_horn_fotokunst_1.jpg',
  },
  {
    id: 20,
    title: 'Indigospiegel',
    technique: 'Fotokunst',
    category: 'Fotokunst',
    description:
      'Ein gebrochenes Kreiszeichen in tiefem Indigo steht in einem texturierten Grau.',
    story:
      'Die Bildmitte wirkt wie ein geöffneter Spiegel, der Farbe und Struktur gegeneinanderführt.',
    image: '/assets/jutta_horn_fotokunst_2.jpg',
  },
  {
    id: 21,
    title: 'Samenlicht',
    technique: 'Fotokunst',
    category: 'Fotokunst',
    description:
      'Botanische Silhouetten stehen auf einem rissigen, papiernen Grund in Gold und Violett.',
    story:
      'Die Aufnahme sucht das Vergängliche im Pflanzlichen und macht es zur grafischen Spur.',
    image: '/assets/jutta_horn_fotokunst_3.jpg',
  },
  {
    id: 22,
    title: 'Hortensienhauch',
    technique: 'Fotokunst',
    category: 'Fotokunst',
    description:
      'Überlagerte Blütenformen in Violett und Flieder verbinden sich mit einer gealterten Bildoberfläche.',
    story:
      'Nahsicht und Textur lösen das Motiv aus der reinen Abbildung und führen es in die Fotokunst.',
    image: '/assets/jutta_horn_fotokunst_4.jpg',
  },
];

// Load artworks from localStorage or initialize with default data
const loadArtworks = (): Artwork[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const catalogVersion = localStorage.getItem(CATALOG_VERSION_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Artwork[];
      if (catalogVersion === CATALOG_VERSION) {
        return parsed.map(stripSizeAndYear);
      }
      const synced = applyCatalogMetadata(parsed);
      saveArtworks(synced);
      localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
      return synced;
    }
  } catch (error) {
    console.error('Error loading artworks from localStorage:', error);
  }

  // If no stored data or error, initialize with default data
  const artworks = initialArtworks.map((artwork) => ({
    ...stripSizeAndYear(artwork),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Save to localStorage
  saveArtworks(artworks);
  localStorage.setItem(CATALOG_VERSION_KEY, CATALOG_VERSION);
  return artworks;
};

// Save artworks to localStorage
const saveArtworks = (artworks: Artwork[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
  } catch (error) {
    console.error('Error saving artworks to localStorage:', error);
  }
};

// Reactive state
const artworks = ref<Artwork[]>(loadArtworks());

// Computed properties
const allArtworks = computed(() => artworks.value);
const categories = computed(() => {
  const cats = new Set(artworks.value.map((artwork) => artwork.category));
  return ['Alle', ...Array.from(cats).sort()];
});

// Actions
const getArtworkById = (id: number): Artwork | undefined => {
  return artworks.value.find((artwork) => artwork.id === id);
};

const getArtworksByCategory = (category: string): Artwork[] => {
  if (category === 'Alle') {
    return artworks.value;
  }
  return artworks.value.filter((artwork) => artwork.category === category);
};

const addArtwork = (
  artwork: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>,
): Artwork => {
  const newId = Math.max(...artworks.value.map((a) => a.id), 0) + 1;
  const newArtwork: Artwork = {
    ...artwork,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  artworks.value.push(newArtwork);
  saveArtworks(artworks.value);
  return newArtwork;
};

const updateArtwork = (
  id: number,
  updates: Partial<Omit<Artwork, 'id' | 'createdAt'>>,
): Artwork | null => {
  const index = artworks.value.findIndex((artwork) => artwork.id === id);
  if (index === -1) return null;

  artworks.value[index] = {
    ...artworks.value[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveArtworks(artworks.value);
  return artworks.value[index];
};

const deleteArtwork = (id: number): boolean => {
  const index = artworks.value.findIndex((artwork) => artwork.id === id);
  if (index === -1) return false;

  artworks.value.splice(index, 1);
  saveArtworks(artworks.value);
  return true;
};

const searchArtworks = (query: string): Artwork[] => {
  const lowercaseQuery = query.toLowerCase();
  return artworks.value.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(lowercaseQuery) ||
      artwork.description.toLowerCase().includes(lowercaseQuery) ||
      artwork.technique.toLowerCase().includes(lowercaseQuery) ||
      artwork.category.toLowerCase().includes(lowercaseQuery),
  );
};

// Export the store
export const useArtworkStore = () => {
  return {
    // State
    artworks: allArtworks,
    categories,

    // Actions
    getArtworkById,
    getArtworksByCategory,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    searchArtworks,

    // Utilities
    saveArtworks: () => saveArtworks(artworks.value),
    clearAllArtworks: () => {
      artworks.value = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  };
};
