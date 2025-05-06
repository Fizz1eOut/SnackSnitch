import { fetchData } from '@/modules/http';
import type { RecipeSearchResponse } from '@/interface/search-recipe.interface';

export const getSearchRecipe = async (query: string): Promise<RecipeSearchResponse> => {
  if (!query) throw new Error('Search query not specified');

  const params = new URLSearchParams({
    query,
    number: '20',
    addRecipeNutrition: 'false',
    apiKey: import.meta.env.VITE_API_KEY
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/recipes/complexSearch?${params.toString()}`;

  const response = await fetchData<RecipeSearchResponse>(url);
  return response;
};
