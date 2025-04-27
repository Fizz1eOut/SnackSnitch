<script setup lang="ts">
  
</script>

<template>
  <div class="underlay">
    <slot />
  </div>
</template>

<style scoped>
  .underlay {
    border-radius: var(--radius-md);
    background-color: var(--color-underlay);
  }
</style>
