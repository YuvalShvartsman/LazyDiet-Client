import "./HomePage.css";

import { Layout } from "antd";

import MainLayout from "../mainLayout/MainLayout";
import MonthlyDiet from "./calander/MonthlyDiet";

function HomePage() {
  return (
    <MainLayout>
      <Layout className="Home-Page">
        <MonthlyDiet />
      </Layout>
    </MainLayout>
  );
}

export default HomePage;
