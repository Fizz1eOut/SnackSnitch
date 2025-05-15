import { fetchData } from '@/modules/http';
import type { RecipeSearchResponse } from '@/interface/search-recipe.interface';

export const getSearchRecipe = async (
  query = '',
  offset = 0,
  number = 20
): Promise<RecipeSearchResponse> => {
  const params = new URLSearchParams({
    query,
    offset: offset.toString(),
    number: number.toString(),
    addRecipeNutrition: 'true',
    apiKey: import.meta.env.VITE_API_KEY
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/recipes/complexSearch?${params.toString()}`;

  return await fetchData<RecipeSearchResponse>(url);
};
