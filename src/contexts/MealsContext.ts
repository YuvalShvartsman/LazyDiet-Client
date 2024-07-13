import { createContext } from "react";

import { Meal } from "../types/Meal";

type MealsContextProps = {
  usersMeals: Meal[] | undefined;
  saveMeal: (meal: Meal[]) => void;
};

const initialContextValue = {
  usersMeals: undefined,
  saveMeal: () => {},
};

const MealsContext = createContext<MealsContextProps>(initialContextValue);

export default MealsContext;
