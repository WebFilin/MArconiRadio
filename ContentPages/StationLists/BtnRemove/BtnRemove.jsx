import React from 'react';

import "./btnRemove.css"

function BtnRemove() {

   // Управление анимацией
   const [isActive, setIsActive] = React.useState(false)

   return (
      <div className='station__lists-items-btn-remove-wraper'
         onClick={() => setIsActive(!isActive)}
      >
         <div className="station__lists-items-btn-remove-body">
            <div className={
               isActive ? "station__lists-items-btn-body-active" : "station__lists-items-btn-body-elem"}>
            </div>
         </div>

      </div>
   );
}

export default BtnRemove;