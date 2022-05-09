import React from 'react';

import "./equalizerScaleRange.css"

function EqualizerScaleRange({ high, middle, low }) {
   return (

      <div className="equlizer-handlers__scale-wraper">

         <div className="equlizer-handlers__scale">
            <div className="equlizer-handlers__scale-txt high">{high}</div>
            <div className="equlizer-handlers__scale-txt middle">{middle}</div>
            <div className="equlizer-handlers__scale-txt low">{low}</div>
         </div>
      </div>
   );
}

export default EqualizerScaleRange;