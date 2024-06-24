import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import { Provider } from "../types/Provider";
import LoadingContext from "../contexts/LoadingContext";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userCookie = Cookies.get("userToken");
  const userPreferencesCookie = Cookies.get("userPreferences");
  const loading = useContext(LoadingContext);

  useEffect(() => {
    if (!userCookie) navigate("/login");
    else if (!userPreferencesCookie) navigate("/userPreferences");
    else navigate("/");
  }, [loading]);

  return <>{children}</>;
}

export default RerouteUserProvider;
