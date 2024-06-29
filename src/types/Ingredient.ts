import { NutritionalValue } from "./NutritionalValue";

export type Ingredient = {
  "Ingredient description": string;
  amount: number;
  "FDC ID": number;
  nurtritionalValue: NutritionalValue;
};
