<script setup lang="ts">
  
</script>
<template>
  <h2 class="title">
    <slot></slot>
  </h2>
</template>
<style scoped>
  .title {
    font-family: "Inter", sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--color-white);  
    }  
  @media (max-width: 499.98px) {
    .title {
      font-size: 24px;
      font-weight: 700;
    }  
  }
</style>
