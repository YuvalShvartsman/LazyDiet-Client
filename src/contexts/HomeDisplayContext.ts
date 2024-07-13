import { createContext } from "react";
import { ComponentsToDisplay } from "../types/componentsToDisplay";

type HomeDisplayContextProps = {
  componentToDisplay: ComponentsToDisplay;
  setComponentToDisplay: (component: ComponentsToDisplay) => void;
};

const initialContextValue: HomeDisplayContextProps = {
  componentToDisplay: "DailyMenu",
  setComponentToDisplay: () => {},
};

const HomeDisplayContext =
  createContext<HomeDisplayContextProps>(initialContextValue);

export default HomeDisplayContext;
