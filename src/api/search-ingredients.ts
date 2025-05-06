import { fetchData } from '@/modules/http';
import type { IngredientSearchResponse } from '@/interface/search-ingredients.interface';

export const searchIngredients = async (query: string): Promise<IngredientSearchResponse> => {
  const params = new URLSearchParams({
    query,
    number: '20',
    apiKey: import.meta.env.VITE_API_KEY
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/food/ingredients/search?${params.toString()}`;

  return await fetchData<IngredientSearchResponse>(url);
};
