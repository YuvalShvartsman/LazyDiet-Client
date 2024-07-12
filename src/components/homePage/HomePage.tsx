import "./HomePage.css";

import { Layout } from "antd";

import MainLayout from "../mainLayout/MainLayout";
import DailyDiet from "./dailyDiet/DailyDiet";

import { useContext } from "react";
import HomeDisplayContext from "../../contexts/HomeDisplayContext";
import MonthlyDiet from "./calendar/MonthlyDiet";
import ProgressChart from "./progressChart/ProgressChart";

function HomePage() {
  const { componentToDisplay } = useContext(HomeDisplayContext);

  const pickComponentToDisplay = () => {
    switch (componentToDisplay) {
      case "DailyMenu":
        return <DailyDiet />;
      case "MonthlyDiet":
        return <MonthlyDiet />;
      case "ProgressChart":
        return <ProgressChart />;
    }
  };

  return (
    <MainLayout>
      <Layout className="Home-Page">{pickComponentToDisplay()}</Layout>
    </MainLayout>
  );
}

export default HomePage;
