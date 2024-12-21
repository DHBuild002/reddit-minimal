import React from "react";
import { Link } from "react-router-dom";

import "./styles/navbar.css";

const Navbar = () => {
  return (
    <ul className="nav flex">
      <Link to="/">
        <li className="home"></li>
      </Link>
      <Link to="/messages">
        <li className="messages"> </li>
      </Link>
      <Link to="/settings">
        <li className="settings"> </li>
      </Link>
    </ul>
  );
};

export default Navbar;
