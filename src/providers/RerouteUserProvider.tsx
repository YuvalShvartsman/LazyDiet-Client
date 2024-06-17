import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import UserPreferencesContext from "../contexts/UserPreferencesContext";

import Cookies from "js-cookie";

import { Provider } from "../types/Provider";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userPreferencesContext = useContext(UserPreferencesContext);

  const { userPreferences } = userPreferencesContext;
  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const Nav = async () => {
      if (!userToken) navigate("/login");
      else if (!userPreferences) navigate("/userPreferences");
      else navigate("/");
    };
    Nav();
  }, [userToken, userPreferences]);

  return <>{children}</>;
}

export default RerouteUserProvider;
