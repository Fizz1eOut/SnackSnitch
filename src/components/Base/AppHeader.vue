<script setup lang="ts">
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppNav from '@/components/Base/AppNav.vue';
  import AppNavMobile from '@/components/Base/AppNavMobile.vue';
  import { useMediaQuery } from '@/composables/useMediaQuery';

  const { isMobile } = useMediaQuery('(max-width: 768px)');
</script>
<template>
  <div class="header">
    <app-container>
      <div class="header__body">
        <div class="header__img">
          <router-link to="/">
            <img src="../../assets/logo.png" alt="Logo">
          </router-link>
        </div>
        <app-nav v-if="!isMobile" />
        <app-nav-mobile 
          v-if="isMobile"
        />
      </div>
    </app-container>
  </div>
</template>

<style scoped>
  .header__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .header__actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .header__img {
    position: relative;
    z-index: 11;
  }
  .header__img img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    .header__wrapper {
      max-width: 100%;
    }
  }
</style>
