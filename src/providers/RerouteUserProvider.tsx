import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import UserPreferencesContext from "../contexts/UserPreferencesContext";
import { useNavigate } from "react-router-dom";
import { Provider } from "../types/Provider";
import Cookies from "js-cookie";

function RerouteUserProvider({ children }: Provider) {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const userPreferencesContext = useContext(UserPreferencesContext);

  const { userData } = userContext;
  const { userPreferences } = userPreferencesContext;
  const userToken = Cookies.get("token");

  useEffect(() => {
    const Nav = async () => {
      // if (userData && Object.keys(userData).length < 1) return false;
      // await userData?.promise;
      if (!userToken) navigate("/login");
      else if (!userPreferences) navigate("/userPreferences");
      else navigate("/");
    };
    Nav();
  }, [userData, userPreferences]);

  return <>{children}</>;
}

export default RerouteUserProvider;
