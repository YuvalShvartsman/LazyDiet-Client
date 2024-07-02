import "./Sidebar.css";

import { useState, useEffect } from "react";

import { Button, Layout } from "antd";

import { GiMeal, GiProgression } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

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
