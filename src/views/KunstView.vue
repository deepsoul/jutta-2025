<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h1 class="jutta-heading mb-8">
              Meine Kunst
            </h1>
            <p class="text-xl text-jutta-700 leading-relaxed">
              Eine Reise durch meine künstlerische Welt – geprägt von 75 Jahren 
              Lebenserfahrung und der tiefen Verbindung zur Schönheit des Moments.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Philosophy Section -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="6">
            <h2 class="jutta-subheading mb-8">
              Meine künstlerische Philosophie
            </h2>
            <div class="space-y-6">
              <p class="text-lg jutta-text">
                Mit 75 Jahren habe ich gelernt, dass Kunst mehr ist als nur 
                Ästhetik – sie ist ein Spiegel der Seele, ein Fenster zur 
                inneren Welt und ein Brücke zwischen Vergangenheit und Gegenwart.
              </p>
              <p class="text-lg jutta-text">
                Meine Werke entstehen aus einer tiefen inneren Notwendigkeit heraus. 
                Jeder Pinselstrich, jede Farbe, jede Form erzählt eine Geschichte 
                von Momenten der Stille, der Reflexion und der Verbindung zur Natur.
              </p>
              <p class="text-lg jutta-text">
                Ich arbeite hauptsächlich mit Öl, Aquarell und Mischtechniken, 
                wobei ich mich von der Natur, der Musik und den kleinen 
                Wundern des Alltags inspirieren lasse.
              </p>
            </div>
          </v-col>
          
          <v-col cols="12" lg="6">
            <div class="aspect-square bg-jutta-100 rounded-lg overflow-hidden">
              <img
                src="/src/assets/images/atelier.jpg"
                alt="Jutta Horn im Atelier"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Techniques Section -->
    <section class="bg-white jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" class="text-center mb-16">
            <h2 class="jutta-subheading mb-4">
              Meine Techniken
            </h2>
            <p class="text-lg text-jutta-600">
              Verschiedene Medien, eine gemeinsame Vision
            </p>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col
            v-for="technique in techniques"
            :key="technique.name"
            cols="12"
            md="6"
            lg="4"
            class="mb-8"
          >
            <v-card
              :elevation="0"
              class="h-full bg-transparent text-center"
            >
              <div class="aspect-square bg-jutta-100 rounded-lg overflow-hidden mb-6">
                <img
                  :src="technique.image"
                  :alt="technique.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                {{ technique.name }}
              </h3>
              <p class="text-jutta-700 leading-relaxed">
                {{ technique.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Inspiration Section -->
    <section class="bg-jutta-50 jutta-section">
      <v-container class="jutta-container">
        <v-row>
          <v-col cols="12" lg="8" class="mx-auto text-center">
            <h2 class="jutta-subheading mb-8">
              Meine Inspiration
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                  Die Natur
                </h3>
                <p class="jutta-text">
                  Die Wechsel der Jahreszeiten, das Spiel von Licht und Schatten, 
                  die Formen und Farben der Pflanzenwelt – all das fließt in 
                  meine Arbeiten ein.
                </p>
              </div>
              <div>
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                  Musik und Poesie
                </h3>
                <p class="jutta-text">
                  Klassische Musik und Lyrik begleiten mich beim Malen. 
                  Sie schaffen eine Atmosphäre, die meine Kreativität beflügelt.
                </p>
              </div>
              <div>
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                  Lebenserfahrung
                </h3>
                <p class="jutta-text">
                  75 Jahre voller Erlebnisse, Begegnungen und Erkenntnisse 
                  prägen meine künstlerische Sicht auf die Welt.
                </p>
              </div>
              <div>
                <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
                  Stille und Meditation
                </h3>
                <p class="jutta-text">
                  In der Stille finde ich die tiefsten Einsichten und die 
                  klarste Verbindung zu meiner inneren künstlerischen Stimme.
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
const techniques = [
  {
    name: 'Ölmalerei',
    description: 'Die klassische Ölmalerei ermöglicht es mir, mit Tiefe und Textur zu arbeiten. Jede Schicht erzählt eine Geschichte.',
    image: '/src/assets/images/oelmalerei.jpg'
  },
  {
    name: 'Aquarell',
    description: 'Die Transparenz und Leichtigkeit des Aquarells fängt die flüchtigen Momente des Lebens ein.',
    image: '/src/assets/images/aquarell.jpg'
  },
  {
    name: 'Mischtechnik',
    description: 'Durch die Kombination verschiedener Medien entstehen einzigartige Texturen und Ausdrucksmöglichkeiten.',
    image: '/src/assets/images/mischtechnik.jpg'
  }
]

const handleImageError = () => {
  // Handle image loading errors
}
</script>
