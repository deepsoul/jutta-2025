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
const selectedWork = ref<any>(null);

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
    title: 'Kunstwerk 1',
    technique: 'Öl auf Leinwand',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Ölmalerei',
    description: 'Ein ausdrucksstarkes Werk aus Jutta Horns Sammlung.',
    story:
      'Dieses Werk zeigt die charakteristische Handschrift der Künstlerin.',
    image: '/assets/jutta_horn_art_1.jpg',
  },
  {
    id: 2,
    title: 'Kunstwerk 2',
    technique: 'Mischtechnik',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Mischtechnik',
    description: 'Ein weiteres beeindruckendes Werk aus der Sammlung.',
    story: 'Die Komposition zeigt Jutta Horns künstlerische Entwicklung.',
    image: '/assets/jutta_horn_art_2.jpg',
  },
  {
    id: 3,
    title: 'Kunstwerk 3',
    technique: 'Öl auf Leinwand',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Ölmalerei',
    description: 'Ein Werk, das die künstlerische Vision widerspiegelt.',
    story:
      'Entstanden in einer Phase intensiver künstlerischer Auseinandersetzung.',
    image: '/assets/jutta_horn_art_3.jpg',
  },
  {
    id: 4,
    title: 'Kunstwerk 4',
    technique: 'Aquarell',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Aquarell',
    description: 'Ein zartes Aquarell mit starker emotionaler Ausdruckskraft.',
    story:
      'Die Leichtigkeit des Aquarells verbindet sich mit tiefem künstlerischem Ausdruck.',
    image: '/assets/jutta_horn_art_4.jpg',
  },
  {
    id: 5,
    title: 'Kunstwerk 6',
    technique: 'Öl auf Leinwand',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Ölmalerei',
    description: 'Ein kraftvolles Werk mit starker Präsenz.',
    story: 'Die Ölmalerei ermöglicht tiefe Schichtungen und reiche Texturen.',
    image: '/assets/jutta_horn_art_6.jpg',
  },
  {
    id: 6,
    title: 'Kunstwerk 7',
    technique: 'Mischtechnik',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Mischtechnik',
    description:
      'Experimentelle Techniken schaffen einzigartige Ausdrucksmöglichkeiten.',
    story:
      'Die Kombination verschiedener Medien eröffnet neue künstlerische Wege.',
    image: '/assets/jutta_horn_art_7.jpg',
  },
  {
    id: 7,
    title: 'Kunstwerk 9',
    technique: 'Öl auf Leinwand',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Ölmalerei',
    description: 'Ein weiteres Meisterwerk aus der Sammlung.',
    story:
      'Jedes Werk erzählt eine eigene Geschichte und zeigt die Entwicklung der Künstlerin.',
    image: '/assets/jutta_horn_art_9.jpg',
  },
  {
    id: 8,
    title: 'Kunstwerk 11',
    technique: 'Aquarell',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Aquarell',
    description: 'Die Transparenz des Aquarells schafft besondere Stimmungen.',
    story: 'Aquarellmalerei erfordert Präzision und gleichzeitig Spontaneität.',
    image: '/assets/jutta_horn_art_11.jpg',
  },
  {
    id: 9,
    title: 'Kunstwerk 12',
    technique: 'Mischtechnik',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Mischtechnik',
    description:
      'Verschiedene Materialien verbinden sich zu einem harmonischen Ganzen.',
    story: 'Die Mischtechnik ermöglicht unendliche Variationsmöglichkeiten.',
    image: '/assets/jutta_horn_art_12.jpg',
  },
  {
    id: 10,
    title: 'Kunstwerk 13',
    technique: 'Öl auf Leinwand',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Ölmalerei',
    description: 'Ein Werk, das die künstlerische Reife zeigt.',
    story: 'Jahrelange Erfahrung spiegelt sich in jedem Pinselstrich wider.',
    image: '/assets/jutta_horn_art_13.jpg',
  },
  {
    id: 11,
    title: 'Kunstwerk 14',
    technique: 'Aquarell',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Aquarell',
    description: 'Leichtigkeit und Tiefe vereinen sich in diesem Werk.',
    story: 'Das Aquarell fängt flüchtige Momente für die Ewigkeit ein.',
    image: '/assets/jutta_horn_art_14.jpg',
  },
  {
    id: 12,
    title: 'Kunstwerk 15',
    technique: 'Öl auf Leinwand',
    year: '2022',
    size: '2152x2096 cm',
    category: 'Ölmalerei',
    description: 'Ein kraftvolles Statement der Künstlerin.',
    story: 'Jedes Werk ist ein Dialog zwischen Künstlerin und Betrachter.',
    image: '/assets/jutta_horn_art_15.jpg',
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
