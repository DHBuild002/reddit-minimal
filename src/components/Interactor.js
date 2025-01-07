import React from "react";
import { Link } from "react-router-dom";
import "./styles/interactor.css";

const Interactor = () => {
  return (
    <>
      <div className="flex justify-center flex-row gap-6 mt-10">
        <ul className="flex flex-row gap-4">
          <Link to="#heart">
            <li className="int gift"></li>
          </Link>
          <Link to="#gift">
            <li className="int share"></li>
          </Link>
          <Link to="#share">
            <li className="int like"></li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Interactor;
