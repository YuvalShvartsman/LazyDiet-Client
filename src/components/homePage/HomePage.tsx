import "./HomePage.css";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

function HomePage() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useContext must be used within a UserProvider");
  }
  const { user } = userContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <div className="Home-Page">
      <h1>hello, {user?.name}</h1>
    </div>
  );
}

export default HomePage;
