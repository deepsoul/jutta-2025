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

        <v-col cols="6" md="9" class="d-flex justify-end">
          <v-btn
            variant="text"
            class="d-md-none"
            @click="drawer = !drawer"
            icon="mdi-menu"
          />

          <v-navigation-drawer
            v-model="drawer"
            temporary
            location="right"
            class="d-md-none"
          >
            <v-list>
              <v-list-item
                v-for="item in menuItems"
                :key="item.name"
                :to="item.to"
                @click="drawer = false"
                class="text-jutta-700"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>

          <div class="d-none d-md-flex align-center gap-4">
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
  {name: 'Home', to: '/'},
  {name: 'Meine Kunst', to: '/kunst'},
  {name: 'Mein Schaffen', to: '/schaffen'},
  {name: 'Ausstellungen', to: '/ausstellungen'},
  {name: 'Kontakt', to: '/kontakt'},
];
</script>
