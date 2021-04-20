import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { signoutAction } from "./../../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
const Header = ({
  setSidebarOpen,
  sidebarOpenState,
  topHeaderMenuOpenHandler,
  headerMenuOpenState,
}) => {
  const [open, setOpen] = useState(false);
  const [headerUserMenu, setHeaderUserMenu] = useState(false);
  const toogleHamburger = () => {
    setSidebarOpen(!open);
    setOpen(!open);
  };

  const setInvisibleHeaderMenu = () => {
    topHeaderMenuOpenHandler(!headerUserMenu);
    setHeaderUserMenu(!headerUserMenu);
  };

  useEffect(() => {
    if (!sidebarOpenState) {
      setOpen(false);
    }
    if (!headerMenuOpenState) {
      setHeaderUserMenu(false);
    }
  }, [sidebarOpenState, headerMenuOpenState]);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(signoutAction());
  };

  return (
    <header>
      <div className="logo">
        <p>Broom Service </p>
        {/* // hamberGar menu and three dot  */}
        <div onClick={toogleHamburger} className="hamburger">
          <GiHamburgerMenu />
        </div>
      </div>
      <div className="menu">
        <ul>
          <li onClick={setInvisibleHeaderMenu}>
            <span>
              <FaUserCircle />
            </span>
          </li>
        </ul>
        <div
          className={
            headerUserMenu ? "user-menu-header show" : "user-menu-header hide"
          }
        >
          <Link
            onClick={setInvisibleHeaderMenu}
            to="/profile/mine"
            className="your-profile"
          >
            Your Profile
          </Link>

          <Link
            onClick={setInvisibleHeaderMenu}
            to="/change-password"
            className="chg-pass"
          >
            Change Password
          </Link>
          <Link
            onClick={() => {
              setInvisibleHeaderMenu();
              logoutHandler();
            }}
            to="/logout"
            className="logout"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
