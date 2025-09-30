<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar
      app
      color="primary"
      dark
      elevation="4"
    >
      <v-app-bar-title>
        <router-link to="/" class="tw-text-white tw-no-underline tw-font-bold">
          Jutta Horn
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <v-btn
        v-for="item in navigationItems"
        :key="item.title"
        :to="item.to"
        text
        class="tw-mx-1"
      >
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="tw-min-h-screen">
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer
      color="grey-lighten-3"
      class="tw-mt-8"
    >
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" class="tw-text-center">
            <p class="tw-text-gray-600 tw-mb-2">
              © {{ currentYear }} Jutta Horn. All rights reserved.
            </p>
            <div class="tw-flex tw-justify-center tw-space-x-4">
              <v-btn
                v-for="item in navigationItems"
                :key="item.title"
                :to="item.to"
                variant="text"
                size="small"
                class="tw-text-gray-500"
              >
                {{ item.title }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Navigation items
const navigationItems = [
  { title: 'Home', to: '/' },
  { title: 'Gallery', to: '/gallery' },
  { title: 'Biography', to: '/biography' },
  { title: 'Contact', to: '/contact' }
]

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>