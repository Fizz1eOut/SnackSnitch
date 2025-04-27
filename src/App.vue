<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppHeader from '@/components/Base/AppHeader.vue';
</script>

<template>
  <app-header />
  <main class="main">
    <app-container>
      <router-view />
    </app-container>
  </main>
</template>

<style scoped>
@media (max-width: 768px) {
  .main {
    padding-bottom: 80px
  }
}
</style>
