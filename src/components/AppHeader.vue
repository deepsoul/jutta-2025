<template>
  <v-app-bar
    :elevation="0"
    class="bg-white border-b border-jutta-200"
    height="80"
  >
    <v-container class="jutta-container">
      <v-row align="center" no-gutters>
        <v-col cols="6" md="3">
          <router-link to="/" class="text-decoration-none">
            <h1 class="text-2xl font-serif font-medium text-jutta-900">
              Jutta Horn
            </h1>
          </router-link>
        </v-col>

        <v-col cols="6" md="9" class="flex justify-end">
          <!-- Mobile Menu Button -->
          <v-btn
            variant="text"
            class="md:hidden"
            @click="drawer = !drawer"
            icon="mdi-menu"
            size="large"
          />

          <!-- Mobile Menu Overlay -->
          <div
            v-if="drawer"
            class="fixed inset-0 z-50 md:hidden"
            @click="drawer = false"
          >
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black bg-opacity-75"></div>
            
            <!-- Menu Panel -->
            <div class="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl border-l border-jutta-200" @click.stop>
              <div
                class="flex items-center justify-between p-4 border-b border-jutta-200 bg-white"
              >
                <h2 class="text-lg font-display font-semibold text-jutta-900">
                  Menü
                </h2>
                <v-btn
                  variant="text"
                  @click="drawer = false"
                  icon="mdi-close"
                  size="small"
                />
              </div>

              <nav class="py-4 bg-white">
                <router-link
                  v-for="item in menuItems"
                  :key="item.name"
                  :to="item.to"
                  @click="drawer = false"
                  class="flex items-center px-6 py-4 text-jutta-700 hover:bg-jutta-50 transition-colors"
                  :class="{
                    'bg-jutta-100 text-jutta-900 border-r-4 border-jutta-500':
                      $route.name === item.name,
                  }"
                >
                  <v-icon
                    :icon="item.icon"
                    class="text-jutta-500 mr-4"
                  ></v-icon>
                  <span class="font-medium">{{ item.name }}</span>
                </router-link>
              </nav>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-4">
            <v-btn
              v-for="item in menuItems"
              :key="item.name"
              :to="item.to"
              variant="text"
              class="text-jutta-700 font-medium"
              :class="{'text-jutta-900': $route.name === item.name}"
            >
              {{ item.name }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const drawer = ref(false);

const menuItems = [
  {name: 'Home', to: '/', icon: 'mdi-home'},
  {name: 'Meine Kunst', to: '/kunst', icon: 'mdi-palette'},
  {name: 'Mein Schaffen', to: '/schaffen', icon: 'mdi-brush'},
  {name: 'Ausstellungen', to: '/ausstellungen', icon: 'mdi-calendar'},
  {name: 'Kontakt', to: '/kontakt', icon: 'mdi-email'},
];
</script>
