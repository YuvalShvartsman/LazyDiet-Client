import { Nutrient } from "./Nutrient";

export type Ingredient = {
  _id: string;
  ingredient_description: string;
  fdc_id: number;
  nurtrients?: Nutrient[];
};
