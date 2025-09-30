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

          <!-- Mobile Navigation Drawer -->
          <v-navigation-drawer
            v-model="drawer"
            temporary
            location="right"
            class="md:hidden"
            width="280"
          >
            <v-list class="py-4">
              <v-list-item
                v-for="item in menuItems"
                :key="item.name"
                :to="item.to"
                @click="drawer = false"
                class="text-jutta-700 hover:bg-jutta-50"
                :class="{'bg-jutta-100 text-jutta-900': $route.name === item.name}"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon" class="text-jutta-500"></v-icon>
                </template>
                <v-list-item-title class="font-medium">{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>

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
