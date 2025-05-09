<script setup lang="ts">
  import type { Recipe } from '@/interface/search-recipe.interface';
  import type { Ingredient } from '@/interface/search-ingredients.interface';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import SuggestionRecipeCard from '@/components/Content/Suggestion/SuggestionRecipeCard.vue';
  import SuggestionIngredientCard from '@/components/Content/Suggestion/SuggestionIngredientCard.vue';


  interface AppSuggestionsProps {
    recipes: Recipe[];
    ingredients: Ingredient[];
  }
  defineProps<AppSuggestionsProps>();
</script>

<template>
  <div v-if="ingredients.length || recipes.length" class="suggestions">
    <app-underlay>
      <app-container class="suggestions__container">
        <div class="suggestions__body">
          <suggestion-ingredient-card :ingredients="ingredients" />
          <suggestion-recipe-card :recipes="recipes" />
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .suggestions__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  @media (max-width: 600px) {
    .suggestions__body {
      flex-direction: column;
    }
    .suggestions__container {
      padding: 0;
    }
  }
</style>
