import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { Provider } from "../types/Provider";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userToken = Cookies.get("userToken");
  const userPreferencesToken = Cookies.get("userPreferencesToken");

  useEffect(() => {
    if (!userToken) navigate("/login");
    else if (!userPreferencesToken) navigate("/userPreferences");
    else navigate("/");
  }, [userToken, userPreferencesToken]);

  return <>{children}</>;
}

export default RerouteUserProvider;
