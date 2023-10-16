import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <nav>
        <ul className="main-footer__links">
          <li className="main-footer__link">
            <a href="#support">Support</a>
          </li>
          <li className="main-footer__link">
            <a href="#terms">Terms of Use</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
