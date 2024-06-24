import "./HomePage.css";

import { useContext } from "react";

import userContext from "../../contexts/UserContext";
import UserPreferencesContext from "../../contexts/UserPreferencesContext";

function HomePage() {
  const user = useContext(userContext);
  const { userPreferences } = useContext(UserPreferencesContext);

  const { userData } = user;

  return (
    <div className="Home-Page">
      <h1>hello, {userData?.name}</h1>
      <div>
        <h1>weight:{userPreferences?.weight}</h1>
      </div>
    </div>
  );
}

export default HomePage;
