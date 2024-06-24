type Goals = "bulking" | "cutting" | "weight-loss" | "health-based";

type Diets = "keto" | "Vegan" | "Vegetarian";

type Sensitivities = "lactose" | "gluten" | "nuts";

export type PreferencesOptions = {
  goals: { goal: Goals; _id: string }[];
  dietTypes: { dietType: Diets; _id: string }[];
  sensitivities: { sensitivity: Sensitivities; _id: string }[];
};

export type UserPreferencesType = {
  weight: number;
  height: number;
  age: number;
  goal: Goals;
  amountOfMeals: number;
  dietType: Diets;
  sensitivities: Sensitivities;
  suggestFoods: boolean;
};
