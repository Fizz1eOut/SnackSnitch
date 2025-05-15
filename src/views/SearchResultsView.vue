<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { searchIngredients } from '@/api/search-ingredients';
  import { getSearchRecipe } from '@/api/search-recipe';
  import type { Ingredient } from '@/interface/search-ingredients.interface';
  import type { Recipe } from '@/interface/search-recipe.interface';
  import SuggestionRecipeCard from '@/components/Content/Suggestion/SuggestionRecipeCard.vue';
  import SuggestionIngredientCard from '@/components/Content/Suggestion/SuggestionIngredientCard.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  const route = useRoute();
  const query = ref<string>((route.params.name as string) || '');

  const ingredients = ref<Ingredient[]>([]);
  const recipes = ref<Recipe[]>([]);
  const offsetIngredients = ref(0);
  const offsetRecipes = ref(0);
  const hasMoreIngredients = ref(true);
  const hasMoreRecipes = ref(true);
  const isLoading = ref(false);
  const PAGE_SIZE = 20;

  const loadMore = async () => {
    if (
      isLoading.value || 
      (!hasMoreIngredients.value && !hasMoreRecipes.value) || 
      !query.value.trim()
    ) return;

    isLoading.value = true;

    try {
      const [ingredientsResponse, recipesResponse] = await Promise.all([
        hasMoreIngredients.value
          ? searchIngredients(query.value, offsetIngredients.value, PAGE_SIZE)
          : Promise.resolve({ results: [] }),
        hasMoreRecipes.value
          ? getSearchRecipe(query.value, offsetRecipes.value, PAGE_SIZE)
          : Promise.resolve({ results: [] }),
      ]);

      if (ingredientsResponse.results.length < PAGE_SIZE) hasMoreIngredients.value = false;
      if (recipesResponse.results.length < PAGE_SIZE) hasMoreRecipes.value = false;

      ingredients.value.push(...ingredientsResponse.results);
      recipes.value.push(...recipesResponse.results);
      console.log('Ingredients:', ingredients.value);
      console.log('Recipes:', recipes.value);


      offsetIngredients.value += PAGE_SIZE;
      offsetRecipes.value += PAGE_SIZE;
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    console.log('Mounted with query:', query.value);
    loadMore();
  });

  watch(() => route.params.name, async (newQuery) => {
    query.value = (newQuery as string) || '';

    if (!query.value.trim()) return;

    ingredients.value = [];
    recipes.value = [];
    offsetIngredients.value = 0;
    offsetRecipes.value = 0;
    hasMoreIngredients.value = true;
    hasMoreRecipes.value = true;

    await loadMore();
  }, { immediate: true });
</script>

<template>
  <div class="search-result">
    <app-title v-if="query" class="search-result__title">Results for "{{ query }}"</app-title>
    <div class="search-result__body">
      <div class="search-result__group">
        <app-subtitle class="search-result__subtitle">Ingredients</app-subtitle>
        <ul 
          v-for="i in ingredients" 
          :key="i.id" 
          class="search-result__list"
        >
          <li class="search-result__item">
            <suggestion-ingredient-card :ingredients="i" />
          </li>
        </ul>
      </div>

      <div class="search-result__group">
        <app-subtitle class="search-result__subtitle">Recipes</app-subtitle>
        <ul 
          v-for="r in recipes" 
          :key="r.id" 
          class="search-result__list"
        >
          <li class="search-result__item">
            <suggestion-recipe-card :recipes="r" />
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result__button">
      <app-button
        v-if="(hasMoreIngredients || hasMoreRecipes) && !isLoading"
        action
        class="search-result__load-more"
        @click="loadMore"
      >
        Load more
      </app-button>
      <p v-if="isLoading">Loading...</p>
    </div>
  </div>
</template>

<style scoped>
  .search-result__title {
    margin-bottom: var(--section-title-gap);
  }
  .search-result__body {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .search-result__group {
    flex:  0 1 50%;
  }
  .search-result__subtitle {
    padding-bottom: var(--space-sm);
  }
  .search-result__list:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
  .search-result__button {
    margin-top: var(--space-md);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-result__load-more {
    max-width: 300px;
    width: 100%;
  }
  @media (max-width: 768px) {
    .search-result__group {
        flex: 0 1 50%;
    }
  }
  @media (max-width: 600px) {
  .search-result__body {
    flex-direction: column;
    row-gap: var(--space-sm);
  }
  }
</style>
