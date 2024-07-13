// This component is getting its css from its father (Sidebar.tsx)

import { useContext } from "react";

import { Button } from "antd";

import HomeDisplayContext from "../../../contexts/HomeDisplayContext";

import { ComponentsToDisplay } from "../../../types/componentsToDisplay";

import { IconType } from "react-icons";

export type SidebarButtonProps = {
  componentToSwitchTo?: ComponentsToDisplay;
  onClickFunction?: () => void;
  collapsed: boolean;
  text: string;
  Icon: IconType;
};

function SideBarButton({
  collapsed,
  componentToSwitchTo,
  onClickFunction,
  text,
  Icon,
}: SidebarButtonProps) {
  const { componentToDisplay, setComponentToDisplay } =
    useContext(HomeDisplayContext);

  return (
    <Button
      className={`${
        collapsed ? "Sidebar-Button-Collapsed" : "Sidebar-Button"
      } ${componentToSwitchTo === componentToDisplay ? "Focus" : ""}`} // Important to check which component is currently displayed to make it focused
      onClick={() => {
        componentToSwitchTo && setComponentToDisplay(componentToSwitchTo);
        onClickFunction && onClickFunction();
      }}
    >
      {!collapsed && text} &nbsp;
      <Icon
        className={
          collapsed ? "Sidebar-Button-Icon-Collapsed" : "Sidebar-Button-Icon"
        }
      />
    </Button>
  );
}

export default SideBarButton;
