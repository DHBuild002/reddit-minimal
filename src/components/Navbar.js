import React from "react";
import "./styles/navbar.css";

const Navbar = () => {
  return (
    <ul className="nav relative flex justify-evenly w-full list-none bottom-0 h-12 left-00">
      <li className="home"></li>
      <li className="messages"></li>
      <li className="settings"></li>
    </ul>
  );
};

export default Navbar;
