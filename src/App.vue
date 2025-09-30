<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './components/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style>
/* Global styles - remove the default Vue styling constraints */
#app {
  max-width: none;
  margin: 0;
  padding: 0;
  font-weight: normal;
}

/* Remove default body styling that centers content */
body {
  display: block;
  place-items: initial;
}
</style>
