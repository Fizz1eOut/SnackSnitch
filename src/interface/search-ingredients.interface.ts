export interface Ingredient {
  id: number;
  name: string;
  image: string;
}

export interface IngredientSearchResponse {
  results: Ingredient[];
  offset: number;
  number: number;
  totalResults: number;
}
