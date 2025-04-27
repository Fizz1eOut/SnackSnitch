<script setup lang="ts">
  import { computed } from 'vue';

  // Определяем пропсы с дефолтным значением через withDefaults
  const props = withDefaults(
    defineProps<{
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    }>(),
    {
      size: 'xs', // Дефолтное значение
    }
  );

  // Создаем вычисляемое свойство
  const container = computed(() => `size-${props.size}`);
</script>

<template>
  <div :class="container" class="container">
    <slot />
  </div>
</template>

<style scoped>
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }

  /* Используем CSS переменные для размеров отступов */
  .size-lg {
    padding: var(--space-2xl); /* 48px */
  }
  .size-md {
    padding: var(--space-xl);  /* 40px */
  }
  .size-sm {
    padding: var(--space-md);  /* 24px  */
  }
  .size-xs {
    padding: var(--space-sm);  /* 16px */
  }
  
  @media (max-width: 768px) {
    .size-xl {
      padding: var(--space-md); /* 24px */
    }
  }
  @media (max-width: 499px) {
    .size-md,
    .size-sm,
    .size-xl {
      padding: var(--space-sm); /* 16px */
    }
  }
</style>
