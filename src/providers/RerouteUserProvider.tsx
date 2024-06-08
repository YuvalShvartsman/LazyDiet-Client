import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import UserPreferencesContext from "../contexts/UserPreferencesContext";
import { useNavigate } from "react-router-dom";
import { Provider } from "../types/Provider";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const userPreferencesContext = useContext(UserPreferencesContext);

  const { user } = userContext;
  const { userPreferences } = userPreferencesContext;

  const checkWhichRoute = () => {
    if (!user) return "/login";
    if (!userPreferences) return "/userPreferences";
    return "/";
  };

  useEffect(() => {
    navigate(checkWhichRoute());
  }, [userContext, userPreferencesContext]);

  return <>{children}</>;
}

export default RerouteUserProvider;
