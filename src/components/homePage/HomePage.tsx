import "./HomePage.css";

import { useContext } from "react";

import userContext from "../../contexts/UserContext";

function HomePage() {
  const user = useContext(userContext);

  const { userData } = user;

  return (
    <div className="Home-Page">
      <h1>hello, {userData?.name}</h1>
    </div>
  );
}

export default HomePage;
