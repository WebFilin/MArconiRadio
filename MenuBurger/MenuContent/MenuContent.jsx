import React from 'react';

import "./menuContent.css"

import { Routes, Route } from "react-router-dom"

import About from '../../ContentPages/About/About';

import StationSearchControl from '../../StationSearchControls/StationSearchControl';

import StationLists from '../../ContentPages/StationLists/StationLists';

import NotFoundPage from "../../ContentPages/NotFoundPage/NotFoundPage"

// import { useSelector } from 'react-redux';

function MenuContent() {

   // const isOpenBurger = useSelector(state => state.isOpenBurger.isOpen)

   // console.log(isOpenBurger)


   return (

      <div className='menu__content-wraper'>

         {/* Подключаем компоненты в навигацию и для отображения*/}
         <Routes>

            <Route path="/list" element={<StationLists />} />
            <Route path="/control" element={<StationSearchControl />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />

         </Routes>
      </div>
   );
}

export default MenuContent;