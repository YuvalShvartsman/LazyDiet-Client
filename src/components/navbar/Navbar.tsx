import "./Navbar.css";

import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

import { Button, Flex, Layout, Popover, Typography } from "antd";

import { LuLogOut } from "react-icons/lu";

import IdleAvocado from "/idleAvocado.gif";

import { MdSupportAgent as Support } from "react-icons/md";
import { FaRegQuestionCircle as About } from "react-icons/fa";
import { MdOutlineDarkMode as DarkMode } from "react-icons/md";

function Navbar() {
  const { userData } = useContext(UserContext);

  return (
    <Layout className="Navbar">
      <Layout className="Navbar-Logo">
        <img src={IdleAvocado} className="Idle-Logo" />
        <Typography className="System-Name">Lazy Diet</Typography>
      </Layout>

      <Layout className="Navbar-Info-Section">
        <Flex className="Navbar-Buttons">
          <Button className="Navbar-Button" icon={<DarkMode />}></Button>
          <Button className="Navbar-Button" icon={<Support />}></Button>
          <Button className="Navbar-Button" icon={<About />}></Button>
        </Flex>
        <Popover
          title={userData?.name}
          trigger="hover"
          content={
            <Flex className="Popover-Content">
              <Typography.Text ellipsis className="Email-Text">
                {userData?.email}
              </Typography.Text>
              <Button className="Logout-Button">
                <LuLogOut color="white" />
              </Button>
            </Flex>
          }
        >
          <img src={userData?.picture} className="User-Picture" />
        </Popover>
      </Layout>
    </Layout>
  );
}

export default Navbar;
