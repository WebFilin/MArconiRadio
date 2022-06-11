import React from 'react';

import "./btnClearLocalStoradge.css"

import { useSelector } from 'react-redux';

function BtnClearLocalStoradge({ isActive }) {

   // Длинна массива с избранными станциями StationsListItem
   const localStorageLength = useSelector(state => state.localStorageInLength.totalLenght)

   // Состояние кнопки
   const [btnDisabled, setBtnDisabled] = React.useState(false)

   React.useEffect(() => {

      // Получаем длинну массива, меняем внешку кнопки
      function arrLenght() {

         if (localStorageLength === 0) {
            setBtnDisabled(true)
         }

         else {
            setBtnDisabled(false)
         }
      }

      // Состояние клика по кнопке, очишаем сторадж полностью
      if (isActive) {
         setBtnDisabled(true)
      }

      else {
         arrLenght()
      }

   }, [localStorageLength, isActive])

   return (
      <div className='station__lists-btn-clear-wraper'>
         <button disabled={btnDisabled}
            className={btnDisabled ? 'station__lists-btn-clear-body-disabled' : 'station__lists-btn-clear-body'}
         >
            Clear List
         </button>
      </div>
   );
}

export default BtnClearLocalStoradge;