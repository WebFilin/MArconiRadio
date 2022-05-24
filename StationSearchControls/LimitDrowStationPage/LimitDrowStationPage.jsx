import React from 'react';

import "./limitDrowStationPage.css"

import { useDispatch } from 'react-redux';

import { getAmountStations } from "../../store/totalStationInPage"

function LimitDrowStationPage({ title }) {

   // Количество станций на странице
   const [limitDrowStation, setLimitDrowStation] = React.useState(9)

   // передаем обьект через redux
   const dispatch = useDispatch()

   // Получаем значение
   function handleSubmit(elem) {
      setLimitDrowStation(elem.target.value)
   }

   dispatch(getAmountStations(limitDrowStation))

   return (
      <div className='station__control-limit-drow-wraper'>
         <div className="station__control-limit-drow-body">
            <h2>{title}</h2>
            <form
               onChange={(elem) => handleSubmit(elem)} >
               <select className='station__control-limit-drow-form' >
                  <option value="">-</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
               </select>
            </form>
         </div>
      </div>
   );
}

export default LimitDrowStationPage;