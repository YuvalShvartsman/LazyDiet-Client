import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import UserPreferencesContext from "../contexts/UserPreferencesContext";
import { useNavigate } from "react-router-dom";
import { Provider } from "../types/Provider";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const userPreferencesContext = useContext(UserPreferencesContext);

  const { userData } = userContext;
  const { userPreferences } = userPreferencesContext;

  const checkWhichRoute = async () => {
    if (userData && Object.keys(userData).length < 1) return false;
    await userData.promise;
    if (!userData.user) return "/login";
    if (!userPreferences) return "/userPreferences";
    return "/";
  };

  useEffect(() => {
    const Nav = async () => {
      const isOkay = await checkWhichRoute();
      if (typeof isOkay === "string") navigate(await checkWhichRoute());
    };
    Nav();
  }, [userData, userPreferences]);

  return <>{children}</>;
}

export default RerouteUserProvider;
