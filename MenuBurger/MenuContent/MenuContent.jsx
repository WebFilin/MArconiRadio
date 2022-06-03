import React from "react";

import "./menuContent.css";

import { Routes, Route } from "react-router-dom";

import About from "../../ContentPages/About/About";

import StationSearchControl from "../../StationSearchControls/StationSearchControl";

import StationLists from "../../ContentPages/StationLists/StationLists";

function MenuContent() {
  return (
    <div className="menu__content-wraper">
      {/* Подключаем компоненты в навигацию и для отображения*/}

      <Routes>
        <Route path="/list" element={<StationLists />} />
        <Route path="/control" element={<StationSearchControl />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default MenuContent;
