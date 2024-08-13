import { createContext } from "react";

import { MonthlyMenu } from "../types/Menu";

type MenuContextProps = {
  monthlyMenu: MonthlyMenu | undefined;
  getMonthlyMenu: () => void;
};

const initialContextValue = {
  monthlyMenu: undefined,
  getMonthlyMenu: () => {},
};

const MenuContext = createContext<MenuContextProps>(initialContextValue);

export default MenuContext;
