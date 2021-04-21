import React, { useState } from "react";
import Header from "./inc/header";
import Sidebar from "./inc/sidebar";
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topHeaderMenuOpen, setTopHeaderMenuOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const sidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header
        topHeaderMenuOpenHandler={setTopHeaderMenuOpen}
        headerMenuOpenState={topHeaderMenuOpen}
        sidebarOpenState={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapse={collapse}
      />
      <Sidebar
        collapse={collapse}
        setCollapse={setCollapse}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        onClick={() => setTopHeaderMenuOpen(false)}
        className="mainContentWrapper"
      >
        <div
          onClick={sidebarClose}
          className={sidebarOpen ? "overlay show" : "overlay hide"}
        ></div>

        <main style={collapse ? { marginLeft: "80px" } : {}}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
