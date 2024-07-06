import { NutrientName } from "./NutrientName";

export type Nutrient = {
  _id: string;
  calories: number;
  proteins: number;
  // carbs: number;
  // fats: number;
  // fiber: number;
  // cholesterol: number;
  amount: number;
  nutrient_id: string;
  nutrientsNames: NutrientName[];
};
