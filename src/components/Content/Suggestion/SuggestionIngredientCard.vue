<script setup lang="ts">
  import type { Ingredient } from '@/interface/search-ingredients.interface';
  import AppImage from '@/components/Base/AppImage.vue';

  interface SuggestionsIngredientCardProps {
    ingredients: Ingredient;
  }
  defineProps<SuggestionsIngredientCardProps>();
</script>

<template>
  <div class="suggestions__content">
    <div class="suggestions__card card-suggestions">
      <div class="card-suggestions__image">
        <app-image 
          :image="ingredients.image" 
          type="ingredient" 
          class="card-suggestions__img"
        />
      </div>
      <div class="card-suggestions__name">
        {{ ingredients.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .suggestions__card {
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
  }
  .suggestions__card {
    position: relative;
    overflow: hidden;
    transition: transform 0.4s ease-in-out;
    border-radius: var(--radius-sm);
  }
  .suggestions__card:hover {
    transform: translateY(-2px);
  }
  .suggestions__card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: skewX(-20deg);
    pointer-events: none;
    transition: left 0.9s ease-in-out;
  }
  .suggestions__card:hover::after {
    left: 100%;
  }
  .card-suggestions__img {
    width: 50px;
    height: 50px;
  }
  .card-suggestions__name {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-white);
  }
   @media (max-width: 768px) {
    .suggestions__card {
      gap: 10px;
    }
     .card-suggestions__name {
      font-size: 14px;
    }
    .card-suggestions__img {
      width: 30px;
      height: 30px;
    }
  }
  @media (max-width: 600px) {
    .suggestions__title {
      padding: 16px 0;
    }
    .suggestions__content {
      flex: none;
    }
  }
</style>
