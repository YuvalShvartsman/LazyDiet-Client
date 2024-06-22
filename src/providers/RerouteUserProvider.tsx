import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { Provider } from "../types/Provider";
import UserPreferencesContext from "../contexts/UserPreferencesContext";
import UserContext from "../contexts/UserContext";
import LoadingContext from "../contexts/LoadingContext";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userToken = Cookies.get("userToken");
  const userPreferencesToken = Cookies.get("preferencesToken");
  const loading = useContext(LoadingContext);
  const { userPreferences } = useContext(UserPreferencesContext);
  // console.log("🚀 ~ RerouteUserProvider ~ userPreferences:", userPreferences);

  useEffect(() => {
    if (!userToken) navigate("/login", { replace: true });
    else if (!userPreferencesToken)
      navigate("/userPreferences", { replace: true });
    else navigate("/", { replace: true });
  }, [userToken, userPreferencesToken, loading]);

  return <>{children}</>;
}

export default RerouteUserProvider;
