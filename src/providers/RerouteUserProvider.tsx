import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { Provider } from "../types/Provider";
import UserPreferencesContext from "../contexts/UserPreferencesContext";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const { userPreferences } = useContext(UserPreferencesContext);

  const userToken = Cookies.get("userToken");
  // const userPreferencesToken = Cookies.get("userPreferencesToken");

  useEffect(() => {
    if (!userToken) navigate("/login");
    else if (!userPreferences) navigate("/userPreferences");
    else navigate("/");
  }, [userToken, userPreferences]);

  return <>{children}</>;
}

export default RerouteUserProvider;
