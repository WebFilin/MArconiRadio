import React from 'react';

import "./buttonSubmit.css"

function ButtonSubmit({ title, disabled }) {

   const btnStateStyle = disabled ? "search-forms__btn-submit-body-disabled" : 'search-forms__btn-submit-body-active'

   return (
      <div className='search-forms__btn-submit-wraper' >
         <input className={btnStateStyle} type="submit" value={title} disabled={disabled} />
      </div>
   );
}

export default ButtonSubmit;