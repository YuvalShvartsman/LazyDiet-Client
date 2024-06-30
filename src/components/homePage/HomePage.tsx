import "./HomePage.css";

import { useContext } from "react";

import userContext from "../../contexts/UserContext";
import UserPreferencesContext from "../../contexts/UserPreferencesContext";
import { Layout } from "antd";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function HomePage() {
  const user = useContext(userContext);
  const { userPreferences } = useContext(UserPreferencesContext);

  const { userData } = user;

  return (
    <>
      <Navbar />
      <Sidebar />
      <Layout className="Home-Page"></Layout>
      <Footer />
    </>
  );
}

export default HomePage;
