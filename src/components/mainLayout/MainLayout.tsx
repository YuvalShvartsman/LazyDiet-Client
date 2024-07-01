import { Layout } from "antd";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./MainLayout.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Layout className="Layout">{children}</Layout>
      <Footer />
    </>
  );
}

export default MainLayout;
