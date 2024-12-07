import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../styles/Navbar.css";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
