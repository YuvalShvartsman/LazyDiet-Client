import { Meal } from "./Meal";

export type Menu = { menu: { day: string; menu: Meal[]; macros: string[] } };

export type MonthlyMenu = {
  userId: string;
  month: string;
  menus: Menu[];
};
