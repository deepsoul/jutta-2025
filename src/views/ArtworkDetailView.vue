<template>
  <div v-if="artwork" class="artwork-detail">
    <!-- Back Button -->
    <section class="bg-white py-4">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12">
            <v-btn
              variant="text"
              color="jutta-900"
              prepend-icon="mdi-arrow-left"
              @click="goBack"
              class="mb-4"
            >
              Zurück zur Übersicht
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Artwork Image Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto">
            <div class="artwork-image-container">
              <img
                :src="artwork.image"
                :alt="artwork.title"
                class="artwork-main-image"
                @error="handleImageError"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Artwork Information Section -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto">
            <div class="artwork-info">
              <h1 class="artwork-title">{{ artwork.title }}</h1>

              <div class="artwork-meta mb-6">
                <div class="meta-item">
                  <span class="meta-label">Technik:</span>
                  <span class="meta-value">{{ artwork.technique }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Jahr:</span>
                  <span class="meta-value">{{ artwork.year }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Format:</span>
                  <span class="meta-value">{{ artwork.size }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Kategorie:</span>
                  <span class="meta-value">{{ artwork.category }}</span>
                </div>
              </div>

              <div class="artwork-description mb-8">
                <h2 class="section-heading mb-4">Beschreibung</h2>
                <p class="description-text">{{ artwork.description }}</p>
              </div>

              <div v-if="artwork.story" class="artwork-story">
                <h2 class="section-heading mb-4">Die Geschichte dahinter</h2>
                <p class="story-text">{{ artwork.story }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Navigation Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center">
            <h2 class="section-heading mb-8">Weitere Werke entdecken</h2>
            <div class="navigation-buttons">
              <v-btn
                variant="outlined"
                color="jutta-900"
                size="large"
                prepend-icon="mdi-arrow-left"
                @click="goToPrevious"
                :disabled="!previousArtwork"
                class="mr-4"
              >
                Vorheriges Werk
              </v-btn>
              <v-btn
                variant="outlined"
                color="jutta-900"
                size="large"
                prepend-icon="mdi-arrow-right"
                @click="goToNext"
                :disabled="!nextArtwork"
              >
                Nächstes Werk
              </v-btn>
            </div>
            <div class="mt-6">
              <v-btn
                variant="flat"
                color="jutta-900"
                size="large"
                @click="goToOverview"
                class="text-white"
              >
                Alle Werke anzeigen
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>

  <!-- Loading State -->
  <div v-else class="loading-container">
    <v-container class="jutta-container">
      <v-row>
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="jutta-900"
            size="64"
            class="mb-4"
          ></v-progress-circular>
          <p class="text-lg text-jutta-700">Kunstwerk wird geladen...</p>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- Error State -->
  <div v-if="error" class="error-container">
    <v-container class="jutta-container">
      <v-row>
        <v-col cols="12" class="text-center">
          <v-icon size="64" color="error" class="mb-4">mdi-alert-circle</v-icon>
          <h2 class="text-2xl font-serif text-jutta-900 mb-4">
            Kunstwerk nicht gefunden
          </h2>
          <p class="text-lg text-jutta-700 mb-6">{{ error }}</p>
          <v-btn
            variant="flat"
            color="jutta-900"
            size="large"
            @click="goToOverview"
            class="text-white"
          >
            Zur Übersicht zurückkehren
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useArtworkStore, type Artwork} from '../stores/artworkStore';

const route = useRoute();
const router = useRouter();
const artworkStore = useArtworkStore();

const artwork = ref<Artwork | null>(null);
const error = ref<string | null>(null);

// Get artwork ID from route params
const artworkId = computed(() => {
  const id = route.params.id;
  return id ? parseInt(id as string) : null;
});

// Get current artwork and navigation
const currentArtwork = computed(() => {
  if (!artworkId.value) return null;
  return artworkStore.getArtworkById(artworkId.value);
});

const allArtworks = computed(() => artworkStore.artworks.value);
const currentIndex = computed(() => {
  if (!currentArtwork.value) return -1;
  return allArtworks.value.findIndex(
    (art) => art.id === currentArtwork.value!.id,
  );
});

const previousArtwork = computed(() => {
  const index = currentIndex.value;
  if (index <= 0) return null;
  return allArtworks.value[index - 1];
});

const nextArtwork = computed(() => {
  const index = currentIndex.value;
  if (index < 0 || index >= allArtworks.value.length - 1) return null;
  return allArtworks.value[index + 1];
});

// Navigation methods
const goBack = () => {
  router.go(-1);
};

const goToOverview = () => {
  router.push('/schaffen');
};

const goToPrevious = () => {
  if (previousArtwork.value) {
    router.push(`/artwork/${previousArtwork.value.id}`);
  }
};

const goToNext = () => {
  if (nextArtwork.value) {
    router.push(`/artwork/${nextArtwork.value.id}`);
  }
};

const handleImageError = () => {
  console.error('Error loading artwork image');
};

// Load artwork on mount
onMounted(() => {
  if (!artworkId.value) {
    error.value = 'Keine gültige Kunstwerk-ID gefunden';
    return;
  }

  const foundArtwork = currentArtwork.value;
  if (!foundArtwork) {
    error.value = 'Das angeforderte Kunstwerk konnte nicht gefunden werden';
    return;
  }

  artwork.value = foundArtwork;
});

// Update page title
const updatePageTitle = () => {
  if (artwork.value) {
    document.title = `${artwork.value.title} - Jutta Horn Kunst`;
  }
};

// Watch for artwork changes
import {watch} from 'vue';
watch(artwork, updatePageTitle, {immediate: true});
</script>

<style scoped>
.artwork-detail {
  min-height: 100vh;
}

.artwork-image-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.artwork-main-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.artwork-main-image:hover {
  transform: scale(1.02);
}

.artwork-info {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.artwork-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
  line-height: 1.2;
}

.artwork-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #8b4513;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 500;
}

.section-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
}

.description-text,
.story-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}

.story-text {
  font-style: italic;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #8b4513;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.loading-container,
.error-container {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .artwork-title {
    font-size: 2rem;
  }

  .artwork-meta {
    grid-template-columns: 1fr;
  }

  .navigation-buttons {
    flex-direction: column;
    align-items: center;
  }

  .navigation-buttons .v-btn {
    width: 100%;
    max-width: 300px;
  }
}

/* Custom scrollbar for better UX */
.artwork-detail ::-webkit-scrollbar {
  width: 8px;
}

.artwork-detail ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.artwork-detail ::-webkit-scrollbar-thumb {
  background: #8b4513;
  border-radius: 4px;
}

.artwork-detail ::-webkit-scrollbar-thumb:hover {
  background: #6b3410;
}
</style>
