import "./Sidebar.css";

import { useState, useEffect } from "react";

import { Layout } from "antd";

import { GiMeal, GiProgression } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import UserPreferencesModal from "../userPreferencesModal/UserPreferencesModal";

import SideBarButton, {
  SidebarButtonProps,
} from "./sidebarButton/SideBarButton";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const navbarButtons: Omit<SidebarButtonProps, "collapsed">[] = [
    {
      componentToDisplay: "DailyMenu",
      text: "Today'd Menu",
      Icon: GiMeal,
    },
    {
      componentToDisplay: "MonthlyDiet",
      text: "Month's Plan",
      Icon: GiMeal,
    },
    {
      componentToDisplay: "ProgressChart",
      text: "Track Progress",
      Icon: GiProgression,
    },
    {
      text: "Add Meals",
      Icon: GiMeal,
    },
    {
      text: "Preferences",
      Icon: RiUserStarLine,
      onClickFunction: () => setOpen(true),
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
      <UserPreferencesModal open={open} handleClose={handleClose} />

      <div className="Sidebar-Buttons-Layout">
        {navbarButtons.map((btn) => (
          <SideBarButton
            key={btn.text}
            collapsed={collapsed}
            componentToDisplay={btn.componentToDisplay}
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
