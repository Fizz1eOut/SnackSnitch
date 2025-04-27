<script setup lang="ts">
  import { computed } from 'vue';

  // Определение пропсов без лишних дефолтных значений
  const props = defineProps<{
    action?: boolean;
    outline?: boolean;
    disabled?: boolean;
    remove?: boolean;
  }>();

  // Вычисляемый объект классов
  const classes = computed(() => ({
    'button-action': props.action,
    'button-outline': props.outline,
    'button-disabled': props.disabled,
    'button-remove': props.remove,
  }));
</script>

<template>
  <button
    type="button"
    class="button"
    :class="classes"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    color: var(--color-white);
    background-color: transparent;
    cursor: pointer;
    border-radius: 0;
    border: none;
    padding: 0;
    font-family: "Inter", sans-serif;
  }
  .button:hover {
    background-color: transparent
  }

  .button-action {
    height: 36px;
    background-color: var(--color-blue);
    border-radius: 10px;
    transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  }
  .button-action:hover {
    background-color: var(--color-blue-hover);
    box-shadow: 0 4px 8px rgba(63 76 191 / 40%);
  }

  .button-outline {
    height: 36px;
    border: 1px solid var(--color-blue);
    color: var(--color-white);
    background: transparent;
    transition: border 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    border-radius: 10px;
  }
  .button-outline:hover {
    border: 2px solid var(--color-blue-hover);
    box-shadow: 0 4px 8px rgba(63 76 191 / 40%);
  }

  .button-disabled {
    height: 36px;
    background: var(--color-gray);
    border-radius: 10px;
    opacity: 0.3;
    transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: not-allowed;
  }
  .button-disabled:hover {
    opacity: 0.4;
    background: var(--color-gray);
  }
</style>
