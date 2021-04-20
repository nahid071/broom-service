import React from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";

import { FaRegMoneyBillAlt, FaBalanceScale } from "react-icons/fa";
import { CgArrowLeftO, CgArrowRightO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ sidebarOpen, setCollapse, collapse }) => {
  // collapse
  const handleCollapse = () => {
    setCollapse(!collapse);
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
              <MenuItem icon={<FaRegMoneyBillAlt />}>
                Dashboard <Link to="/" />
              </MenuItem>
              <MenuItem icon={<FaRegMoneyBillAlt />}>
                Manage Contruct <Link to="/manage-contruct" />
              </MenuItem>
              <MenuItem icon={<FaRegMoneyBillAlt />}>
                Contructors <Link to="/contructors" />
              </MenuItem>
              <MenuItem icon={<FaRegMoneyBillAlt />}>
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
