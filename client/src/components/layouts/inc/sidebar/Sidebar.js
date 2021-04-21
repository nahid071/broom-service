import React from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoIosCodeWorking } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { VscDashboard } from "react-icons/vsc";

import { CgArrowLeftO, CgArrowRightO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setCollapse, collapse, setSidebarOpen }) => {
  // collapse
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const sidebarCloseHandler = () => {
    setSidebarOpen(false);
  };

  const openState = sidebarOpen ? "sidebar open" : "sidebar close";
  ////////////////////////////////////////////////////////////////////////
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div
        style={collapse ? { left: "50px" } : {}}
        onClick={handleCollapse}
        className="collapse-btn"
      >
        {collapse ? <CgArrowRightO /> : <CgArrowLeftO />}
      </div>
      <div style={collapse ? { width: "80px" } : {}} className={openState}>
        <ProSidebar collapsed={collapse}>
          <SidebarHeader>
            <div className="sidebar-userinfo">
              <div>
                <img src="/assets/img/user.jpg" alt="" />
                {collapse ? (
                  ""
                ) : (
                  <p className="user-name">{user && user.name}</p>
                )}
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem onClick={sidebarCloseHandler} icon={<VscDashboard />}>
                Dashboard <Link to="/" />
              </MenuItem>
              <MenuItem
                onClick={sidebarCloseHandler}
                icon={<IoIosCodeWorking />}
              >
                Manage Contruct <Link to="/manage-contruct" />
              </MenuItem>
              <MenuItem onClick={sidebarCloseHandler} icon={<FiUsers />}>
                Contructors <Link to="/contructors" />
              </MenuItem>
              <MenuItem
                onClick={sidebarCloseHandler}
                icon={<AiOutlineMessage />}
              >
                Messages <Link to="/messages" />
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
