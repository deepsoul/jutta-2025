<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h1 class="jutta-heading mb-8">
              Ausstellungen
            </h1>
            <p class="text-xl text-jutta-700 leading-relaxed">
              Meine Werke waren in verschiedenen Galerien und Ausstellungen zu sehen. 
              Hier finden Sie einen Überblick über vergangene und kommende Präsentationen.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Current Exhibitions -->
    <section class="bg-jutta-50 jutta-section" v-if="currentExhibitions.length > 0">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="jutta-subheading mb-4">
              Aktuelle Ausstellungen
            </h2>
            <p class="text-lg text-jutta-600">
              Meine Werke sind derzeit zu sehen in
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col
            v-for="exhibition in currentExhibitions"
            :key="exhibition.id"
            cols="12"
            md="6"
            lg="4"
            class="mb-8"
          >
            <v-card
              :elevation="0"
              class="h-full bg-white rounded-lg overflow-hidden"
            >
              <div class="aspect-video bg-jutta-100">
                <img
                  :src="exhibition.image"
                  :alt="exhibition.title"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <v-card-text class="p-6">
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-2">
                  {{ exhibition.title }}
                </h3>
                <p class="text-jutta-600 mb-2">
                  {{ exhibition.location }}
                </p>
                <p class="text-sm text-jutta-500 mb-4">
                  {{ exhibition.dates }}
                </p>
                <p class="text-jutta-700 mb-4">
                  {{ exhibition.description }}
                </p>
                <v-btn
                  v-if="exhibition.website"
                  :href="exhibition.website"
                  target="_blank"
                  variant="outlined"
                  color="jutta-900"
                  size="small"
                >
                  Mehr erfahren
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Past Exhibitions -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center mb-12">
            <h2 class="jutta-subheading mb-4">
              Vergangene Ausstellungen
            </h2>
            <p class="text-lg text-jutta-600">
              Ein Rückblick auf meine bisherigen Präsentationen
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col
            v-for="exhibition in pastExhibitions"
            :key="exhibition.id"
            cols="12"
            class="mb-6"
          >
            <v-card
              :elevation="0"
              class="bg-transparent"
            >
              <v-card-text class="pa-0">
                <v-row align="center">
                  <v-col cols="12" md="3">
                    <div class="aspect-square bg-jutta-100 rounded-lg overflow-hidden">
                      <img
                        :src="exhibition.image"
                        :alt="exhibition.title"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="9">
                    <div class="pl-0 md:pl-6">
                      <h3 class="text-xl font-serif font-medium text-jutta-900 mb-2">
                        {{ exhibition.title }}
                      </h3>
                      <p class="text-jutta-600 mb-2">
                        {{ exhibition.location }}
                      </p>
                      <p class="text-sm text-jutta-500 mb-3">
                        {{ exhibition.dates }}
                      </p>
                      <p class="text-jutta-700">
                        {{ exhibition.description }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact for Exhibitions -->
    <section class="bg-jutta-900 text-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h2 class="text-4xl lg:text-5xl font-serif font-medium mb-6">
              Interesse an einer Ausstellung?
            </h2>
            <p class="text-xl text-jutta-200 mb-8 leading-relaxed">
              Wenn Sie Interesse an einer Ausstellung meiner Werke haben oder 
              weitere Informationen benötigen, freue ich mich über Ihre Nachricht.
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
const currentExhibitions = [
  // Currently no active exhibitions
]

const pastExhibitions = [
  {
    id: 1,
    title: 'Momentaufnahmen',
    location: 'Galerie am Markt, Berlin',
    dates: 'März - Mai 2023',
    description: 'Eine Einzelausstellung mit Werken aus den letzten zwei Jahren, die sich mit dem Thema Zeit und Erinnerung beschäftigen.',
    image: '/src/assets/images/ausstellung-1.jpg'
  },
  {
    id: 2,
    title: 'Natur und Seele',
    location: 'Kunstverein München',
    dates: 'Oktober - Dezember 2022',
    description: 'Gemeinsame Ausstellung mit drei weiteren Künstlerinnen zum Thema der Verbindung zwischen Mensch und Natur.',
    image: '/src/assets/images/ausstellung-2.jpg'
  },
  {
    id: 3,
    title: 'Zeitlose Schönheit',
    location: 'Atelier Jutta Horn, Hamburg',
    dates: 'Juni - August 2022',
    description: 'Eine intime Präsentation neuer Arbeiten in meinem eigenen Atelier für Freunde und Sammler.',
    image: '/src/assets/images/ausstellung-3.jpg'
  },
  {
    id: 4,
    title: 'Aquarelle und Ölbilder',
    location: 'Kunsthalle Bremen',
    dates: 'Februar - April 2022',
    description: 'Teilnahme an der Gruppenausstellung "Frauen in der Kunst" mit einer Auswahl meiner Aquarell- und Ölbilder.',
    image: '/src/assets/images/ausstellung-4.jpg'
  }
]

const handleImageError = () => {
  // Handle image loading errors
}
</script>
