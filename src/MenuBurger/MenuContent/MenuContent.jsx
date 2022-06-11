import React from "react";

import "./menuContent.css";

import { Routes, Route } from "react-router-dom";

// import About from "../../ContentPages/About/About";

import StationSearchControl from "../../StationSearchControls/StationSearchControl";

import StationLists from "../../ContentPages/StationLists/StationLists";

import Error from "../../ContentPages/Error/Error";

function MenuContent() {
  return (
    <div className="menu__content-wraper">
      {/* Подключаем компоненты в навигацию и для отображения*/}

      <Routes>
        <Route path="/" element={""} />
        <Route path="/list" element={<StationLists />} />
        <Route path="/control" element={<StationSearchControl />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default MenuContent;
