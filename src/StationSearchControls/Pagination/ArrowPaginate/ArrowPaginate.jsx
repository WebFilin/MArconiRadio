import React from 'react';

import "./arowPaginate.css"

function ArrowPaginate(props) {
   return (
      <div className='station__control-pagination-arrow-wraper'>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="30"
            viewBox="-1 0 18 17"
         >
            <path
               d="M16.3746667 8.33860465L7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596z"
               className="arrow-6-pl"
            ></path>
            <path
               d="M16.3746667 8.33860465L7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596z"
               className="arrow-6-pl-fixed"
            ></path>
            <path d="M0 .562v15.63L9.708 8.34 0 .562zm1.333 2.74l6.292 5.04-6.292 5.09V3.303z"></path>
         </svg>
      </div>
   );
}

export default ArrowPaginate;