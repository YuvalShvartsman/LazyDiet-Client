import { Ingredient } from "./Ingredient";

export type Meal = {
  mealName: string;
  description?: string;
  prep?: string;
  ingredients: Ingredient[];
};
