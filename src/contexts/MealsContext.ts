import { createContext } from "react";

import { Meal } from "../types/Meal";

type MealsContextProps = {
  usersMeals: Meal[] | undefined;
  saveMeals: (meal: Meal[]) => void;
};

const initialContextValue = {
  usersMeals: undefined,
  saveMeals: () => {},
};

const MealsContext = createContext<MealsContextProps>(initialContextValue);

export default MealsContext;
