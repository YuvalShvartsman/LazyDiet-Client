import "./Sidebar.css";

import { useState, useEffect } from "react";

import { Layout } from "antd";

import { GiMeal, GiProgression } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import UserPreferencesModal from "../userPreferencesModal/UserPreferencesModal";

import SideBarButton, {
  SidebarButtonProps,
} from "./sidebarButton/SideBarButton";
import SaveMealsModal from "../homePage/saveMealsModal/SaveMealsModal";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const [openPreferences, setOpenPreferences] = useState(false);
  const handlePreferencesClose = () => setOpenPreferences(false);

  const [openAddMeals, setOpenAddMeals] = useState(false);
  const handleAddMealsClose = () => setOpenAddMeals(false);

  const navbarButtons: Omit<SidebarButtonProps, "collapsed">[] = [
    {
      componentToSwitchTo: "DailyMenu",
      text: "Today'd Menu",
      Icon: GiMeal,
    },
    {
      componentToSwitchTo: "MonthlyDiet",
      text: "Month's Plan",
      Icon: GiMeal,
    },
    {
      componentToSwitchTo: "ProgressChart",
      text: "Track Progress",
      Icon: GiProgression,
    },
    {
      text: "Add Meals",
      Icon: GiMeal,
      onClickFunction: () => setOpenAddMeals(true),
    },
    {
      text: "Preferences",
      Icon: RiUserStarLine,
      onClickFunction: () => setOpenPreferences(true),
    },
  ];

  const getZoomLevel = () => {
    return Math.round((window.outerWidth / window.innerWidth) * 100);
  };

  const checkZoomLevel = () => {
    const zoomLevel = getZoomLevel();
    const screenWidth = window.innerWidth;
    if (zoomLevel > 150 || screenWidth <= 1050) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkZoomLevel);
    checkZoomLevel();

    return () => {
      window.removeEventListener("resize", checkZoomLevel);
    };
  }, []);

  return (
    <Layout className={collapsed ? "Sidebar-Collapsed" : "Sidebar"}>
      <SaveMealsModal open={openAddMeals} handleClose={handleAddMealsClose} />
      <UserPreferencesModal
        open={openPreferences}
        handleClose={handlePreferencesClose}
      />

      <div className="Sidebar-Buttons-Layout">
        {navbarButtons.map((btn) => (
          <SideBarButton
            key={btn.text}
            collapsed={collapsed}
            componentToSwitchTo={btn.componentToSwitchTo}
            text={btn.text}
            Icon={btn.Icon}
            onClickFunction={btn.onClickFunction}
          />
        ))}
      </div>
    </Layout>
  );
}

export default Sidebar;
