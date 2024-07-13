import { useState } from "react";

import UserContext from "../contexts/UserContext";

import { Provider } from "../types/Provider";

import HomeDisplayContext from "../contexts/HomeDisplayContext";
import { ComponentsToDisplay } from "../types/componentsToDisplay";

export const HomeDisplayProvider = ({ children }: Provider) => {
  const [componentToDisplay, setComponentToDisplay] =
    useState<ComponentsToDisplay>("DailyMenu");

  return (
    <HomeDisplayContext.Provider
      value={{ componentToDisplay, setComponentToDisplay }}
    >
      {children}
    </HomeDisplayContext.Provider>
  );
};

export default HomeDisplayProvider;
