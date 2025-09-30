<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row align="center" class="min-h-screen">
          <v-col cols="12" lg="6">
            <div class="pr-0 lg:pr-12">
              <h1 class="jutta-heading mb-6">Jutta Horn</h1>
              <p
                class="text-xl lg:text-2xl text-jutta-600 mb-8 leading-relaxed"
              >
                Künstlerisches Schaffen begleitet Jutta Horn ihr ganzes Leben.
                Schon früh, bereits 1979, war ihr klar, dass der Schwerpunkt
                ihrer künstlerischen Aktivitäten der Malerei gehört.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <v-btn
                  to="/kunst"
                  color="jutta-900"
                  size="large"
                  class="text-white"
                >
                  Meine Kunst entdecken
                </v-btn>
                <v-btn
                  to="/kontakt"
                  variant="outlined"
                  color="jutta-900"
                  size="large"
                >
                  Kontakt aufnehmen
                </v-btn>
              </div>
            </div>
          </v-col>

          <v-col cols="12" lg="6">
            <div class="relative">
              <div
                class="aspect-square bg-jutta-100 rounded-lg overflow-hidden"
              >
                <img
                  src="/src/assets/images/jutta-portrait.jpg"
                  alt="Jutta Horn"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
                <div
                  v-if="!imageLoaded"
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <v-progress-circular indeterminate color="jutta-600" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- About Section -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h2 class="jutta-subheading mb-8">Über meine Kunst</h2>
            <p class="text-lg text-jutta-700 leading-relaxed mb-8">
              Ambitioniert erkundete sie die Bandbreite aller künstlerischer
              Ausdrucksformen: ob Radierungen, Collagen, Druckverfahren oder
              auch Holzschnitte und schuf sich so ein breites Portfolio an
              Kenntnissen der Materialien und Maltechniken.
            </p>
            <p class="text-lg text-jutta-700 leading-relaxed">
              Sie selbst beschreibt diesen fortwährenden Drang nach Neuem: "Sich
              künstlerisch weiter zu entwickeln kann nicht heißen, nur das
              Erreichte zu pflegen oder zu perfektionieren, sondern auch das
              bekannte Terrain zu verlassen und stets nach neuen Ausdrucksformen
              und Aussagemöglichkeiten zu suchen."
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Featured Works Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center mb-16">
            <h2 class="jutta-subheading mb-4">Ausgewählte Werke</h2>
            <p class="text-lg text-jutta-600">
              Ein Einblick in meine künstlerische Arbeit
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="(work, index) in featuredWorks"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="mb-8"
          >
            <v-card :elevation="0" class="h-full bg-transparent">
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
                <p class="text-sm text-jutta-500">
                  {{ work.year }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              to="/schaffen"
              variant="outlined"
              color="jutta-900"
              size="large"
            >
              Alle Werke ansehen
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Quote Section -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <blockquote
              class="text-2xl lg:text-3xl font-serif italic text-jutta-700 mb-8"
            >
              "Zugleich aus dem Leben gegriffen und zugleich typisch – das ist
              die höchste Kunst."
            </blockquote>
            <p class="text-lg text-jutta-600">— Christian Morgenstern</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact CTA Section -->
    <section class="bg-jutta-900 text-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h2 class="text-4xl lg:text-5xl font-serif font-medium mb-6">
              Lassen Sie uns ins Gespräch kommen
            </h2>
            <p class="text-xl text-jutta-200 mb-8 leading-relaxed">
              Interessieren Sie sich für eines meiner Werke oder möchten Sie
              mehr über meine künstlerische Arbeit erfahren? Ich freue mich auf
              Ihre Nachricht.
            </p>
            <v-btn
              to="/kontakt"
              color="white"
              size="large"
              class="text-jutta-900"
            >
              Kontakt aufnehmen
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const imageLoaded = ref(true);

const featuredWorks = [
  {
    title: 'Kunstwerk 1',
    technique: 'Öl auf Leinwand',
    year: '2022',
    image: '/src/assets/images/jutta_horn_art_1.jpg',
  },
  {
    title: 'Kunstwerk 2',
    technique: 'Mischtechnik',
    year: '2022',
    image: '/src/assets/images/jutta_horn_art_2.jpg',
  },
  {
    title: 'Kunstwerk 3',
    technique: 'Aquarell',
    year: '2022',
    image: '/src/assets/images/jutta_horn_art_3.jpg',
  },
];

const handleImageError = () => {
  imageLoaded.value = false;
};
</script>
