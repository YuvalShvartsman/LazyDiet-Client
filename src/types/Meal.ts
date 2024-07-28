import { Ingredient } from "./Ingredient";
import { MealType } from "./MealType";

export type Meal = {
  mealName: string;
  description?: string;
  prep?: string;
  mealType?: MealType;
  ingredients: { ingredient: Ingredient; amount: number }[];
};
