export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface RecipeInfo {
  caloriesPerServing: number;
  caloriesPer100g: number;
  fat: string;
  protein: string;
  carbs: string;
  nutrients?: Nutrient[];
  weightPerServing?: {
    amount: number;
    unit: string;
  };
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
