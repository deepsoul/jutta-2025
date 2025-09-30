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

    <!-- Filter Section -->
    <section class="bg-jutta-50 py-8">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center">
            <div class="flex flex-wrap justify-center gap-4">
              <v-btn
                v-for="category in categories"
                :key="category"
                :variant="selectedCategory === category ? 'flat' : 'outlined'"
                :color="
                  selectedCategory === category ? 'jutta-900' : 'jutta-600'
                "
                @click="selectedCategory = category"
                class="text-sm"
              >
                {{ category }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Works Grid -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
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

    <!-- Work Detail Dialog -->
    <v-dialog v-model="workDialog" max-width="800" scrollable>
      <v-card v-if="selectedWork">
        <v-img
          :src="selectedWork.image"
          :alt="selectedWork.title"
          height="400"
          cover
        />
        <v-card-title class="text-2xl font-serif font-medium text-jutta-900">
          {{ selectedWork.title }}
        </v-card-title>
        <v-card-subtitle class="text-jutta-600">
          {{ selectedWork.technique }} • {{ selectedWork.year }} •
          {{ selectedWork.size }}
        </v-card-subtitle>
        <v-card-text>
          <p class="text-lg jutta-text mb-4">
            {{ selectedWork.description }}
          </p>
          <div v-if="selectedWork.story" class="mt-6">
            <h4 class="text-lg font-medium text-jutta-900 mb-2">
              Die Geschichte dahinter
            </h4>
            <p class="jutta-text">
              {{ selectedWork.story }}
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="jutta-900" variant="text" @click="workDialog = false">
            Schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

const selectedCategory = ref('Alle');
const workDialog = ref(false);
const selectedWork = ref(null);

const categories = [
  'Alle',
  'Ölmalerei',
  'Aquarell',
  'Mischtechnik',
  'Zeichnung',
];

const works = [
  {
    id: 1,
    title: 'Zeit der Stille',
    technique: 'Öl auf Leinwand',
    year: '2024',
    size: '80x60 cm',
    category: 'Ölmalerei',
    description:
      'Ein Werk über die Kraft der Stille und die Schönheit des Moments.',
    story:
      'Entstanden in einem ruhigen Herbstmorgen, als das Licht durch die Bäume fiel und eine magische Atmosphäre schuf.',
    image: '/src/assets/images/werk-1.jpg',
  },
  {
    id: 2,
    title: 'Erinnerungen',
    technique: 'Mischtechnik',
    year: '2023',
    size: '60x80 cm',
    category: 'Mischtechnik',
    description:
      'Eine Collage aus Erinnerungen und Träumen, die das Leben prägen.',
    story:
      'Dieses Werk entstand während einer Phase der Reflexion über vergangene Jahre und wichtige Begegnungen.',
    image: '/src/assets/images/werk-2.jpg',
  },
  {
    id: 3,
    title: 'Naturgeist',
    technique: 'Aquarell',
    year: '2023',
    size: '40x50 cm',
    category: 'Aquarell',
    description: 'Die Seele der Natur in zarten Aquarellfarben eingefangen.',
    story:
      'Inspiriert von einem Spaziergang durch den Wald, wo ich die Verbindung zwischen Mensch und Natur spürte.',
    image: '/src/assets/images/werk-3.jpg',
  },
  {
    id: 4,
    title: 'Licht und Schatten',
    technique: 'Öl auf Leinwand',
    year: '2023',
    size: '100x70 cm',
    category: 'Ölmalerei',
    description: 'Das Spiel von Licht und Schatten als Metapher für das Leben.',
    story:
      'Entstanden in meinem Atelier, als das Nachmittagslicht durch das Fenster fiel und faszinierende Schatten warf.',
    image: '/src/assets/images/werk-4.jpg',
  },
  {
    id: 5,
    title: 'Frühling',
    technique: 'Aquarell',
    year: '2022',
    size: '30x40 cm',
    category: 'Aquarell',
    description:
      'Die ersten zarten Zeichen des Frühlings in leichten Aquarellfarben.',
    story:
      'Gemalt an einem milden Märztag, als die ersten Knospen zu sehen waren.',
    image: '/src/assets/images/werk-5.jpg',
  },
  {
    id: 6,
    title: 'Abstrakte Formen',
    technique: 'Mischtechnik',
    year: '2022',
    size: '70x90 cm',
    category: 'Mischtechnik',
    description: 'Experimentelle Formen und Farben, die Emotionen ausdrücken.',
    story:
      'Ein freies Experiment ohne Vorplanung, das aus dem Moment heraus entstand.',
    image: '/src/assets/images/werk-6.jpg',
  },
];

const filteredWorks = computed(() => {
  if (selectedCategory.value === 'Alle') {
    return works;
  }
  return works.filter((work) => work.category === selectedCategory.value);
});

const openWork = (work: any) => {
  selectedWork.value = work;
  workDialog.value = true;
};

const handleImageError = () => {
  // Handle image loading errors
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
