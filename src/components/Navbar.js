import React from "react";
import "./styles/navbar.css";

const Navbar = () => {
  return (
    <ul className="nav flex justify-evenly w-full list-none bottom-0 h-12 left-0">
      <li className="home"></li>
      <li className="messages"></li>
      <li className="settings"></li>
    </ul>
  );
};

export default Navbar;
