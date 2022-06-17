import React from "react";

import "./btnZerroValueEqualilzer.css";

function BtnZerroValueEqualilzer({ disabled }) {
  return (
    <div className="equlizer-btn__zerro-wrapper">
      <div className="equlizer-btn__zerro-body"></div>
      <span className="equlizer-btn__zerro-title">reset equalizer</span>
    </div>
  );
}

export default BtnZerroValueEqualilzer;
