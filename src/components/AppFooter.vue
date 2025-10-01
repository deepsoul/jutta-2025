<template>
  <v-footer class="bg-jutta-50 border-t border-jutta-200">
    <v-container class="jutta-container">
      <v-row>
        <v-col cols="12" md="6">
          <h3 class="text-xl font-serif font-medium text-jutta-900 mb-4">
            Jutta Horn
          </h3>
          <p class="text-jutta-600 mb-4">
            Künstlerin mit Leidenschaft für zeitlose Kunst und Ausdruck.
          </p>
          <div class="flex gap-4">
            <v-btn
              icon="mdi-email"
              variant="text"
              color="jutta-600"
              size="small"
              href="mailto:info@juttahorn.de"
            />
            <v-btn
              icon="mdi-phone"
              variant="text"
              color="jutta-600"
              size="small"
              href="tel:+4915233644324"
            />
          </div>
        </v-col>

        <v-col cols="12" md="6" class="text-md-right">
          <h4 class="text-lg font-medium text-jutta-900 mb-4">Navigation</h4>
          <div class="flex flex-col gap-2">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.to"
              class="text-jutta-600 hover:text-jutta-900 transition-colors"
            >
              {{ item.name }}
            </router-link>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <v-row align="center">
        <v-col cols="12" class="text-center text-jutta-500">
          <p>&copy; {{ currentYear }} Jutta Horn. Alle Rechte vorbehalten.</p>
          <div class="mt-2">
            <v-btn
              variant="text"
              color="jutta-500"
              size="small"
              @click="showCookieSettings = true"
              class="text-decoration-none"
            >
              Cookie-Einstellungen
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
  
  <!-- Cookie Settings Dialog -->
  <CookieSettings v-model="showCookieSettings" />
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import CookieSettings from './CookieSettings.vue';

const currentYear = computed(() => new Date().getFullYear());
const showCookieSettings = ref(false);

const menuItems = [
  {name: 'Home', to: '/'},
  {name: 'Meine Kunst', to: '/kunst'},
  {name: 'Mein Schaffen', to: '/schaffen'},
  {name: 'Ausstellungen', to: '/ausstellungen'},
  {name: 'Kontakt', to: '/kontakt'},
];
</script>
