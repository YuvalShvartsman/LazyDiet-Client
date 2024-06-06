import "./HomePage.css";

import { useContext } from "react";

import UserContext from "../../contexts/UserContext";

function HomePage() {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  return (
    <div className="Home-Page">
      <h1>hello, {user?.name}</h1>
    </div>
  );
}

export default HomePage;
