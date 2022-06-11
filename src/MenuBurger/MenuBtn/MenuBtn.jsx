import React from 'react';

import "../MenuBtn/menuBtn.css"

function MenuBtn({ active }) {

   return (
      <div className={active ? 'burger-menu__btn-active' : 'burger-menu__btn'} >
         <span className="burger-menu__line"></span>
         <span className="burger-menu__line"></span>
         <span className="burger-menu__line"></span>
      </div>
   );
}

export default MenuBtn;