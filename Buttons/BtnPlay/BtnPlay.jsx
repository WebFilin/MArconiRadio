import React, { useEffect, useRef } from 'react';

import "./btnPlay.css"

function BtnPlay({ btnSwitch }) {

   let btn = useRef()

   useEffect(() => {

      let button = btn.current

      if (btnSwitch === true) {
         button.classList.add("btn__play-animo")
      }

      else if (btnSwitch === false) {
         button.classList.remove("btn__play-animo")
      }
   }, [btnSwitch])

   return (
      <div className="btn__wraper-play">
         <div className="btn__play-body">

            <div className="btn__play-control">
               <div className="btn__play-play">

                  <span ref={btn} className="btn__play-button">
                     <span className="btn__play-slash">ON</span>
                  </span>
               </div>
            </div>

         </div>
      </div>
   );
}

export default BtnPlay;