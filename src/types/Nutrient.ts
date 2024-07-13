import { NutrientName } from "./NutrientName";

export type Nutrient = {
  _id: string;
  calories: number;
  proteins: number;
  amount: number;
  nutrient_id: string;
  nutrientsName: NutrientName;
};
