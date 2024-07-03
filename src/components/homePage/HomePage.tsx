import "./HomePage.css";

import { Layout, Typography } from "antd";

import MainLayout from "../mainLayout/MainLayout";
import MonthlyDiet from "./calendar/MonthlyDiet";
import DailyDiet from "./dailyDiet/DailyDiet";

function HomePage() {
  return (
    <MainLayout>
      <Layout className="Home-Page">
        {/* <MonthlyDiet /> */}
        <DailyDiet />
      </Layout>
    </MainLayout>
  );
}

export default HomePage;
