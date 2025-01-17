import React from "react";
import "./styles/fasttravel.css";

const FastTravel = () => {
  return (
    <>
      <div className="hidden container ft-container absolute">
        <div className="flex fTrav-linkTree">
          <h4>FastTravel</h4>
          <button className="fTrav">Fav 1</button>
          <button className="fTrav">Fav 2</button>
          <button className="fTrav">Fav 3</button>
        </div>
      </div>
    </>
  );
};

export default FastTravel;
