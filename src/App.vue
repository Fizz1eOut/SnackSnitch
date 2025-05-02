<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterView } from 'vue-router';
  import { useUserStore } from '@/stores/user'; 
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppHeader from '@/components/Base/AppHeader.vue';

  const userStore = useUserStore();
  const isUserRegistered = computed(() => userStore.currentUser?.profile);
</script>

<template>
  <app-header v-if="isUserRegistered" />
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
