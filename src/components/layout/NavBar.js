import React, { useContext } from "react";

import "./NavBar.css";

import Button from "../UI/Button";

import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const authContext = useContext(AuthContext);
  return (
    <header className="main-header">
      <div className="main-header__brand">To-Do</div>
      <nav className="main-nav">
        <ul className="main-nav__items">
          {authContext.isLoggedIn && (
            <span>Hi, {`${authContext.user.firstName}`}</span>
          )}
          {authContext.isLoggedIn && (
            <li className="main-nav__item">
              <Button
                type={"button"}
                onClick={authContext.logout}
                text={"Logout"}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
