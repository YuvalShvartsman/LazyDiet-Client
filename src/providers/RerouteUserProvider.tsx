import { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (!user) navigate("/login");
    else if (!userPreferences) navigate("/userPreferences");
  }, [userContext, userPreferencesContext]);

  return <>{children}</>;
}

export default RerouteUserProvider;
