<script setup lang="ts">
  import { computed } from 'vue';

  interface SearchInputProps {
    modelValue: string | number | null;
    placeholder?: string;
    type?: string;
  }
  const props = defineProps<SearchInputProps>();

  const emit = defineEmits(['update:modelValue']);

  const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue: string | number) => emit('update:modelValue', newValue),
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
</script>

<template>
  <div class="input-wrapper">
    <div class="icon-wrapper">
      <slot name="icon"></slot>
    </div>
    <input 
      v-model="inputValue"
      :type="type || 'text'"
      class="input" 
      :placeholder="placeholder"
      @input="handleInput"
    >
    <label for="#" class="label" />
  </div>
</template>

<style scoped>
  .input-wrapper {
    position: relative;
  }
  .icon-wrapper {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: var(--radius-md);
    height: var(--radius-md);
  }
  .input {
    width: 100%;
    padding-left: 20px;
    height: var(--input-height);
    background-color: transparent;
    color: var(--color-white);
    outline: none;
    border: 1px solid var(--color-light-gray);
    border-radius: var(--radius-lg);
    font-family: "Inter", sans-serif;
  }
  ::-webkit-input-placeholder {
   color: var(--color-gray);
  }
  :-moz-placeholder { 
    color: var(--color-gray);
  }
  ::-moz-placeholder { 
    color: var(--color-gray);
  }
  :-ms-input-placeholder {
    color: var(--color-gray);
  }
  @media (max-width: 360px) {
    .input {
      padding: 8px 12px;
    }
    .icon-input {
      display: none;
    }
  } 
</style>
