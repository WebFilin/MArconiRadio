import React, { useEffect, useRef } from 'react';

import "./btnStop.css"

function BtnPause({ btnSwitch }) {

   let btn = useRef()

   useEffect(() => {
      let btnStop = btn.current

      if (btnSwitch === false) {
         btnStop.classList.add("btn__stop-animo")
      }

      else if (btnSwitch === true) {
         btnStop.classList.remove("btn__stop-animo")
      }

   }, [btnSwitch])


   return (
      <div className="btn__wraper-stop">

         <div className="btn__stop-body">

            <div className="btn__stop-control">
               <div className="btn__stop-stop">
                  <span ref={btn} className="btn__stop-button">
                     <span className="btn__stop-slash">OFF</span>
                  </span>
               </div>
            </div>

         </div>
      </div>
   );
}

export default BtnPause;