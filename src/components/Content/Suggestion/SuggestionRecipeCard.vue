<script setup lang="ts">
  import { computed } from 'vue';
  import type { Recipe, Nutrient } from '@/interface/search-recipe.interface';
  import AppImage from '@/components/Base/AppImage.vue';

  interface SuggestionsRecipeCardProps {
    recipes: Recipe;
  }
  const props = defineProps<SuggestionsRecipeCardProps>();

  const caloriesPer100g = computed(() => {
    const calories = props.recipes.nutrition?.nutrients?.find((n: Nutrient) => n.name === 'Calories')?.amount ?? 0;
    const weight = props.recipes.nutrition?.weightPerServing?.amount ?? 0;

    return weight > 0 ? Number(((calories / weight) * 100).toFixed(1)) : 0;
  });
</script>

<template>
  <div class="suggestions__content">
    <div class="suggestions__card card-suggestions">
      <div class="card-suggestions__image">
        <app-image 
          :image="recipes.image" 
          type="recipe" 
          class="card-suggestions__img"
        />
      </div>
      <div class="card-suggestions__row">
        <div class="card-suggestions__name">
          {{ recipes.title }}
        </div>
        <div class="card-suggestions__nutrition">
          <div class="nutrition__value">
            {{ caloriesPer100g > 0 ? `${caloriesPer100g} kcal / 100g` : 'Calories not specified' }}
          </div>
        </div>
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
    max-width: 300px;
    width: 100%;
  }
  .nutrition__value {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-gray);
  }
  .card-suggestions__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    max-width: 450px;
    width: 100%;
  }
  @media (max-width: 900px) {
    .card-suggestions__row  {
      align-items: flex-start;
      flex-direction: column;
      row-gap: 0;
    }
    .card-suggestions__name {
      max-width: 100%;
    }
  }
  @media (max-width: 768px) {
    .card-suggestions__name {
      font-size: 14px;
    }
    .card-suggestions__img {
      width: 30px;
      height: 30px;
    }
    .nutrition__value {
      font-size: 12px;
    }
    .suggestions__card {
      gap: 10px;
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
