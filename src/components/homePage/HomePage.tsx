import "./HomePage.css";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import UserPreferencesContext from "../../contexts/UserPreferencesContext";

function HomePage() {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);
  const userPreferencesContext = useContext(UserPreferencesContext);

  if (!userContext || !userPreferencesContext) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const { user } = userContext;
  const { userPreferences } = userPreferencesContext;

  useEffect(() => {
    if (!user) navigate("/login");
    else if (!userPreferences) navigate("/userPreferences");
  }, []);

  return (
    <div className="Home-Page">
      <h1>hello, {user?.name}</h1>
    </div>
  );
}

export default HomePage;
