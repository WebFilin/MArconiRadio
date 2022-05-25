import React from 'react';

import { useSelector } from 'react-redux';

import StationsDefaultList from "../StationsDefaultList/StationsDefaultList"

import AddStationsLists from '../AddStationsLists/AddStationsLists';

import "./radioDisplay.css"

function RadioDisplay() {

   // Получаем значение скрола из ScrollController
   const valueMargin = useSelector(state => state.tuning.tuning)

   const isOpenBurger = useSelector(state => state.isOpenBurger.isOpen)

   // Стейт для сдвига ползунка выбора станции
   const [marginRange, setMarginRange] = React.useState(1)

   React.useEffect(() => {

      // переводим значение скрола в проценты, устанавливаем нижнию границу движения
      setMarginRange(valueMargin * 2.1)

      if (valueMargin <= 1) {
         setMarginRange(3)
      }

   }, [valueMargin, marginRange])

   return (
      <div className="radio-display__body">

         <div className="radio-display__display">
            <div style={{ marginLeft: `${marginRange}%` }} className="radio-display__range"></div>

            <div className="radio-display__station-wraper">
               <img className="radio-display__img-back" alt="" />

               <div className="radio-display__back-wraper">
                  <div className="radio-display__back-up"></div>
                  <div className="radio-display__back-down"></div>
               </div>

               {/* Переключаем списки станций выбраны они пользователем или предустановлены */}
               {!isOpenBurger && localStorage.length > 0 ? <AddStationsLists /> : <StationsDefaultList />}

            </div>
         </div>
      </div>
   );
}

export default RadioDisplay;