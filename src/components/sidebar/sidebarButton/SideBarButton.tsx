// This component is getting its css from its father (Sidebar.tsx)

import { useContext } from "react";

import { Button } from "antd";

import HomeDisplayContext from "../../../contexts/HomeDisplayContext";

import { ComponentsToDisplay } from "../../../types/componentsToDisplay";

import { IconType } from "react-icons";

export type SidebarButtonProps = {
  componentToDisplay?: ComponentsToDisplay;
  onClickFunction?: () => void;
  collapsed: boolean;
  text: string;
  Icon: IconType;
};

function SideBarButton({
  collapsed,
  componentToDisplay,
  onClickFunction,
  text,
  Icon,
}: SidebarButtonProps) {
  const { setComponentToDisplay } = useContext(HomeDisplayContext);

  return (
    <Button
      className={collapsed ? "Sidebar-Button-Collapsed" : "Sidebar-Button"}
      onClick={() => {
        componentToDisplay && setComponentToDisplay(componentToDisplay);
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
