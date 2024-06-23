import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { Provider } from "../types/Provider";
import LoadingContext from "../contexts/LoadingContext";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userToken = Cookies.get("userToken");
  const userPreferencesToken = Cookies.get("preferencesToken");
  const loading = useContext(LoadingContext);

  useEffect(() => {
    if (!userToken) navigate("/login");
    else if (!userPreferencesToken) navigate("/userPreferences");
    else navigate("/");
  }, [loading]);

  return <>{children}</>;
}

export default RerouteUserProvider;
