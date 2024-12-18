import React from "react";
import { Link } from "react-router-dom";

import "./styles/navbar.css";

const Navbar = () => {
  return (
    <ul className="nav relative flex justify-evenly w-full list-none bottom-0 h-12 left-00">
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
