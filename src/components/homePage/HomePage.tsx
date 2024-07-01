import "./HomePage.css";

import { useContext } from "react";

import userContext from "../../contexts/UserContext";
import UserPreferencesContext from "../../contexts/UserPreferencesContext";
import { Layout } from "antd";
import MainLayout from "../mainLayout/MainLayout";

function HomePage() {
  const user = useContext(userContext);
  const { userPreferences } = useContext(UserPreferencesContext);

  const { userData } = user;

  return (
    <MainLayout>
      <Layout className="Home-Page">amogus</Layout>
    </MainLayout>
  );
}

export default HomePage;
