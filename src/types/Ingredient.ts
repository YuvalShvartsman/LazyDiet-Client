import { Nutrient } from "./Nutrient";

export type Ingredient = {
  _id: string;
  ingredient_description: string;
  amount: number;
  fdc_id: number;
  nurtrients?: Nutrient[];
};
