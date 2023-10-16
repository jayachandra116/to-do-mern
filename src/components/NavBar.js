import React from "react";

import "./NavBar.css";

function NavBar() {
  return (
    <header className="main-header">
      <div className="main-header_brand">To-Do</div>
      <nav className="main-nav">
        <ul className="main-nav__items">
          <li className="main-nav__item">
            <a href="#home">Home</a>
          </li>
          <li className="main-nav__item">
            <a href="#sign-up">Sign-up</a>
          </li>
          <li className="main-nav__item">
            <a href="#login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
