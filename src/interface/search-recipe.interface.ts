export interface RecipeInfo {
  calories: number;
  fat: string;
  protein: string;
  carbs: string;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  nutrition?: RecipeInfo;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
