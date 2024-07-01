import "./Navbar.css";

import { Layout, Typography } from "antd";

import IdleAvocado from "/idleAvocado.gif";

function Navbar() {
  return (
    <Layout className="Navbar">
      <Layout className="Navbar-Logo">
        <img src={IdleAvocado} className="Idle-Logo" />
        <Typography className="System-Name">Lazy Diet</Typography>
      </Layout>
    </Layout>
  );
}

export default Navbar;
