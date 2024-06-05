type Goal = "bulking" | "cutting" | "weight-loss" | "health-based";

type Diet = "keto" | "Vegan" | "Vegetarian";

type Sensitivities = "lactose" | "gluten" | "nuts";

export type UserPreferences = {
  weight: number;
  height: number;
  age: number;
  goal: Goal;
  amountOfMeals: number;
  dietType: Diet;
  sensitivities: Sensitivities;
  suggestFoods: boolean;
};
