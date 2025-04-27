<script setup lang="ts">
  
</script>

<template>
  <div class="link line">
    <slot></slot>
  </div>
</template>

<style scoped>
  .link {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-gray);
    font-family: "Inter", sans-serif;
    transition: color 0.4s ease-in-out;
  }
  .link:hover {
    color: var(--color-white);
  }
</style>
