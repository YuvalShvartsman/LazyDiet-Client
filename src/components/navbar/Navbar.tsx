import "./Navbar.css";

import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

import { Layout, Typography } from "antd";

import IdleAvocado from "/idleAvocado.gif";

function Navbar() {
  const { userData } = useContext(UserContext);
  console.log(userData?.picture);

  return (
    <Layout className="Navbar">
      <Layout className="Navbar-Logo">
        <img src={IdleAvocado} className="Idle-Logo" />
        <Typography className="System-Name">Lazy Diet</Typography>
      </Layout>

      <Layout className="Navbar-User">
        <img src={userData?.picture} className="User-Picture" />
        <Typography className="User-Name">{userData?.name}</Typography>
      </Layout>
    </Layout>
  );
}

export default Navbar;
