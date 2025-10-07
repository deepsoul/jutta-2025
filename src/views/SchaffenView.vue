<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h1 class="jutta-heading mb-8">Mein Schaffen</h1>
            <p class="text-xl text-jutta-700 leading-relaxed">
              Eine Auswahl meiner Werke aus verschiedenen Schaffensperioden –
              jeder Moment ein Ausdruck meiner künstlerischen Reise.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Filter and Search Section -->
    <section class="bg-jutta-50 py-8">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center">
            <!-- Search Bar -->
            <div class="mb-6">
              <v-text-field
                v-model="searchQuery"
                placeholder="Kunstwerke durchsuchen..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                clearable
                hide-details
                class="max-w-md mx-auto"
                @input="onSearch"
              />
            </div>

            <!-- Category Filter -->
            <div class="flex flex-wrap justify-center gap-4">
              <v-btn
                v-for="category in categories"
                :key="category"
                :variant="selectedCategory === category ? 'flat' : 'outlined'"
                :color="
                  selectedCategory === category ? 'jutta-900' : 'jutta-600'
                "
                :class="
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-jutta-600'
                "
                @click="selectedCategory = category"
                class="text-sm"
              >
                {{ category }}
                <v-chip
                  v-if="getCategoryCount(category) > 0"
                  size="small"
                  :color="selectedCategory === category ? 'white' : 'jutta-900'"
                  :text-color="
                    selectedCategory === category ? 'jutta-900' : 'white'
                  "
                  class="ml-2"
                >
                  {{ getCategoryCount(category) }}
                </v-chip>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Works Grid -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <!-- No Results Message -->
        <div v-if="filteredWorks.length === 0" class="text-center py-16">
          <v-icon size="64" color="jutta-400" class="mb-4"
            >mdi-image-off</v-icon
          >
          <h3 class="text-2xl font-serif text-jutta-700 mb-4">
            Keine Kunstwerke gefunden
          </h3>
          <p class="text-lg text-jutta-500 mb-6">
            {{
              searchQuery
                ? 'Versuchen Sie andere Suchbegriffe oder'
                : 'Wählen Sie eine andere Kategorie oder'
            }}
            <v-btn
              variant="text"
              color="jutta-900"
              @click="clearFilters"
              class="text-lg"
            >
              alle Filter zurücksetzen
            </v-btn>
          </p>
        </div>

        <!-- Works Grid -->
        <v-row v-else>
          <v-col
            v-for="work in filteredWorks"
            :key="work.id"
            cols="12"
            sm="6"
            lg="4"
            class="mb-8"
          >
            <v-card
              :elevation="0"
              class="h-full bg-transparent cursor-pointer"
              @click="openWork(work)"
            >
              <div
                class="aspect-square bg-jutta-100 rounded-lg overflow-hidden mb-4"
              >
                <img
                  :src="work.image"
                  :alt="work.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  @error="handleImageError"
                />
              </div>
              <v-card-text class="pa-0">
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-2">
                  {{ work.title }}
                </h3>
                <p class="text-jutta-600 mb-2">
                  {{ work.technique }}
                </p>
                <p class="text-sm text-jutta-500 mb-2">
                  {{ work.year }} • {{ work.size }}
                </p>
                <p class="text-sm text-jutta-700 line-clamp-2">
                  {{ work.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useArtworkStore} from '../stores/artworkStore';

const router = useRouter();
const artworkStore = useArtworkStore();

const selectedCategory = ref('Alle');
const searchQuery = ref('');

// Use the artwork store
const works = computed(() => artworkStore.artworks.value);
const categories = computed(() => artworkStore.categories.value);

const filteredWorks = computed(() => {
  let filtered = artworkStore.getArtworksByCategory(selectedCategory.value);

  // Apply search filter if search query exists
  if (searchQuery.value && searchQuery.value.trim()) {
    filtered = artworkStore.searchArtworks(searchQuery.value.trim());
    // Also filter by category if not "Alle"
    if (selectedCategory.value !== 'Alle') {
      filtered = filtered.filter(
        (work) => work.category === selectedCategory.value,
      );
    }
  }

  return filtered;
});

const getCategoryCount = (category: string) => {
  if (category === 'Alle') {
    return works.value.length;
  }
  return works.value.filter((work) => work.category === category).length;
};

const onSearch = () => {
  // Search is handled in computed property
  // This method can be used for additional search logic if needed
};

const clearFilters = () => {
  selectedCategory.value = 'Alle';
  searchQuery.value = '';
};

const openWork = (work: any) => {
  // Navigate to detail page instead of opening dialog
  router.push(`/artwork/${work.id}`);
};

const handleImageError = () => {
  // Handle image loading errors
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
