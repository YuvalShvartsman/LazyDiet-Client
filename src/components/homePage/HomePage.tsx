import "./HomePage.css";

import { Layout, Typography } from "antd";

import MainLayout from "../mainLayout/MainLayout";
import MonthlyDiet from "./calendar/MonthlyDiet";
import DailyDiet from "./dailyDiet/DailyDiet";
import ProgressChart from "./progressChart/ProgressChart";

function HomePage() {
  return (
    <MainLayout>
      <Layout className="Home-Page">
        {/* <MonthlyDiet /> */}
        <ProgressChart />
        {/* <DailyDiet /> */}
      </Layout>
    </MainLayout>
  );
}

export default HomePage;
