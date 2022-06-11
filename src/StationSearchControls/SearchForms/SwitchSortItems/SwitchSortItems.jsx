import React from 'react';

import "./switchSortItems.css"

function SwitchSortItems({ title }) {

   return (
      <div className='station__control-navigations-items-amount-voits-body'>
         <h2 className='station__control-navigations-items-amount-voits-title'> {title}</h2>
         <label className="station__control-navigations-items-amount-voits-checkbox">
            <input type="checkbox" />
            <span className="station__control-navigations-items-amount-voits-switch" />
         </label>
      </div>
   );
}

export default SwitchSortItems;