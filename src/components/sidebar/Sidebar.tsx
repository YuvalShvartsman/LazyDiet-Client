import "./Sidebar.css";

import { useState, useEffect } from "react";

import { Button, Layout } from "antd";

import { GiMeal, GiProgression } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import UserPreferencesModal from "../userPreferencesModal/UserPreferencesModal";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

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

  // TODO: create component for buttons and map them.

  return (
    <Layout className={collapsed ? "Sidebar-Collapsed" : "Sidebar"}>
      <UserPreferencesModal open={open} handleClose={handleClose} />

      <div className="Sidebar-Buttons-Layout">
        <Button
          className={collapsed ? "Sidebar-Button-Collapsed" : "Sidebar-Button"}
        >
          {!collapsed && "Track Progress"} &nbsp;
          <GiProgression
            className={
              collapsed
                ? "Sidebar-Button-Icon-Collapsed"
                : "Sidebar-Button-Icon"
            }
          />
        </Button>
        <Button
          className={collapsed ? "Sidebar-Button-Collapsed" : "Sidebar-Button"}
        >
          {!collapsed && "Add Meals"} &nbsp;
          <GiMeal
            className={
              collapsed
                ? "Sidebar-Button-Icon-Collapsed"
                : "Sidebar-Button-Icon"
            }
          />
        </Button>
        <Button
          onClick={() => setOpen(true)}
          className={collapsed ? "Sidebar-Button-Collapsed" : "Sidebar-Button"}
        >
          {!collapsed && "Preferences"}&nbsp;
          <RiUserStarLine
            className={
              collapsed
                ? "Sidebar-Button-Icon-Collapsed"
                : "Sidebar-Button-Icon"
            }
          />
        </Button>
      </div>
    </Layout>
  );
}

export default Sidebar;
