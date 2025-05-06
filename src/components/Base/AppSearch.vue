<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { searchIngredients } from '@/api/search-ingredients';
  import { getSearchRecipe } from '@/api/search-recipe';
  import type { Recipe } from '@/interface/search-recipe.interface';
  import type { Ingredient } from '@/interface/search-ingredients.interface';
  import { debounce } from '@/utils/debounce';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppSuggestions from '@/components/Base/AppSuggestions.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  const query = ref('');
  const recipes = ref<Recipe[]>([]);
  const ingredients = ref<Ingredient[]>([]);
  const isLoading = ref(false);

  const fetchSearch = async (query: string) => {
    if (!query) {
      recipes.value = [];
      ingredients.value = [];
      return;
    }

    isLoading.value = true;
    try {
      const [recipesResponse, ingredientsResponse] = await Promise.all([
        getSearchRecipe(query),
        searchIngredients(query)
      ]);
      recipes.value = recipesResponse.results;
      ingredients.value = ingredientsResponse.results;
      console.log('Recipes:', recipes.value);
      console.log('Ingredients:', ingredients.value);
    } catch (error) {
      console.error('Search error:', error);
      recipes.value = [];
      ingredients.value = [];
    } finally {
      isLoading.value = false;
    }
  };


  const debouncedFetchSearch = debounce(fetchSearch, 500);

  watch(query, (newQuery) => {
    debouncedFetchSearch(newQuery);
  });
</script>

<template>
  <div class="search">
    <app-input 
      v-model="query" 
      placeholder="Search for food or recipes"
    >
      <template #icon>
        <app-icon 
          name="search" 
          size="var(--icon-size-md)" 
          color="var(--color-light-gray)" />
      </template>
    </app-input>
    <app-suggestions
      :recipes="recipes"
      :ingredients="ingredients"
      class="search__suggestions"
    />
  </div>
</template> 

<style scoped>
  .search {
    position: relative;
  }
  .search__suggestions {
    position: absolute;
    top: 40px;
    left: 0px;
    width: 100%;
  }
</style>
