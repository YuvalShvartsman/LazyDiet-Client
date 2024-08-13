import { Meal } from "./Meal";
import { MealType } from "./MealType";

export type Menu = {
  macros: string[];
  meals: { mealType: MealType; meal: Meal }[];
};

export type MonthlyMenu = {
  userId: string;
  month: string;
  dailyMenus: { day: string; menu: Menu }[];
};
