<template>
  <div>
    <!-- Hero Section -->
    <v-container class="tw-py-16">
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" class="tw-text-center">
          <h1 class="tw-text-4xl tw-font-bold tw-text-gray-800 tw-mb-6">
            Welcome to Jutta Horn's Website
          </h1>
          <p class="tw-text-xl tw-text-gray-600 tw-mb-8 tw-leading-relaxed">
            Discover the artistic journey and creative works of Jutta Horn
          </p>
          <v-btn
            color="primary"
            size="large"
            variant="elevated"
            class="tw-mx-2"
            to="/gallery"
          >
            View Gallery
          </v-btn>
          <v-btn
            color="secondary"
            size="large"
            variant="outlined"
            class="tw-mx-2"
            to="/biography"
          >
            Learn More
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Featured Sections -->
    <v-container class="tw-py-8">
      <v-row>
        <v-col cols="12" md="4" v-for="section in featuredSections" :key="section.title">
          <v-card
            class="tw-h-full"
            elevation="2"
            hover
          >
            <v-card-title class="tw-bg-gray-50">
              <v-icon :icon="section.icon" class="tw-mr-2"></v-icon>
              {{ section.title }}
            </v-card-title>
            <v-card-text>
              <p class="tw-text-gray-600">{{ section.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="section.link"
                color="primary"
                variant="text"
              >
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Welcome Message -->
    <v-container class="tw-py-16 tw-bg-gray-50">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card elevation="0" class="tw-bg-transparent">
            <v-card-text class="tw-text-center">
              <h2 class="tw-text-3xl tw-font-semibold tw-text-gray-800 tw-mb-4">
                Art is the Journey of Discovery
              </h2>
              <p class="tw-text-lg tw-text-gray-600 tw-leading-relaxed">
                Welcome to my creative space where art meets passion. This website showcases 
                my artistic journey, featuring a curated collection of works that span various 
                mediums and themes. Each piece tells a story, invites contemplation, and 
                celebrates the beauty found in both the extraordinary and the everyday.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
// Featured sections data
const featuredSections = [
  {
    title: 'Gallery',
    description: 'Explore a diverse collection of artworks spanning various mediums and themes.',
    icon: 'mdi-palette',
    link: '/gallery'
  },
  {
    title: 'Biography',
    description: 'Learn about the artist\'s journey, inspiration, and creative process.',
    icon: 'mdi-account-circle',
    link: '/biography'
  },
  {
    title: 'Contact',
    description: 'Get in touch for commissions, exhibitions, or general inquiries.',
    icon: 'mdi-email',
    link: '/contact'
  }
]
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
