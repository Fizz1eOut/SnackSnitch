import { fetchData } from '@/modules/http';
import type { IngredientSearchResponse } from '@/interface/search-ingredients.interface';

export const searchIngredients = async (
  query = '',
  offset = 0,
  number = 20
): Promise<IngredientSearchResponse> => {
  const params = new URLSearchParams({
    query,
    offset: offset.toString(),
    number: number.toString(),
    apiKey: import.meta.env.VITE_API_KEY
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/food/ingredients/search?${params.toString()}`;

  return await fetchData<IngredientSearchResponse>(url);
};
