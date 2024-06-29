import "./HomePage.css";

import { useContext, useState } from "react";

import userContext from "../../contexts/UserContext";
import { Button, Layout } from "antd";
import SaveMealsModal from "./saveMealsModal/SaveMealsModal";

function HomePage() {
  const { userData } = useContext(userContext);

  const [isAddMealsOpen, setIsAddMealsOpen] = useState<boolean>(false);

  return (
    <Layout className="Home-Page">
      <h1>Hello, {userData?.name}</h1>
      <SaveMealsModal isOpen={isAddMealsOpen} setIsOpen={setIsAddMealsOpen} />
      <Button className="Add-Meals" onClick={() => setIsAddMealsOpen(true)}>
        Add Meals
      </Button>
    </Layout>
  );
}

export default HomePage;
