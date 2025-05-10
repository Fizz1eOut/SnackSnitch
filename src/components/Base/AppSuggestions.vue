<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import type { Recipe } from '@/interface/search-recipe.interface';
  import type { Ingredient } from '@/interface/search-ingredients.interface';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import SuggestionRecipeCard from '@/components/Content/Suggestion/SuggestionRecipeCard.vue';
  import SuggestionIngredientCard from '@/components/Content/Suggestion/SuggestionIngredientCard.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';


  interface AppSuggestionsProps {
    recipes: Recipe[];
    ingredients: Ingredient[];
  }
  defineProps<AppSuggestionsProps>();

  const router = useRouter();
  const handleSelectSuggestion = (item: Ingredient | Recipe) => {
    const query = 'name' in item ? item.name : ('title' in item ? item.title : '');
    console.log('Selected item:', item);
    router.push({ name: 'SearchResults', params: { name: query } });
  };
</script>

<template>
  <div v-if="ingredients.length || recipes.length" class="suggestions">
    <app-underlay>
      <app-container class="suggestions__container">
        <div class="suggestions__body">
          <div class="suggestions__group">
            <app-subtitle class="suggestions__title">Ingredients</app-subtitle>
            <ul 
              v-for="i in ingredients" 
              :key="i.id"
              class="suggestions__list">
              <li class="suggestions__item" @click="handleSelectSuggestion(i)">
                <suggestion-ingredient-card :ingredients="i" />
              </li>
            </ul>
          </div>
          <div class="suggestions__group">
            <app-subtitle class="suggestions__title">Recipes</app-subtitle>
            <ul 
              v-for="r in recipes" 
              :key="r.id"
              class="suggestions__list">
              <li class="suggestions__item" @click="handleSelectSuggestion(r)">
                <suggestion-recipe-card :recipes="r" />
              </li>
            </ul>
          </div>
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
  .suggestions__list {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .suggestions__item {
    width: 100%;
  }
  .suggestions__list:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
  .suggestions__group {
    flex: 0 1 50%;
  }
  .suggestions__title {
    padding-bottom: 20px;
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
