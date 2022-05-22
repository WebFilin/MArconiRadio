import React from 'react';

import "./menuBurger.css"

import MenuBtn from "./MenuBtn/MenuBtn"

import LayoutMenu from './LayoutMenu/LayoutMenu';

function MenuBurger() {

   // Открываем - закрываем меню
   const [menuActive, setMenuActive] = React.useState(false)

   return (
      <div className='burger-menu__wraper' >

         <div className="burger-menu-btn__wraper" onClick={() => setMenuActive(!menuActive)}>
            <MenuBtn active={menuActive} />
         </div>

         <div className={menuActive
            ?
            "burger-menu__body-active"
            :
            "burger-menu__body"}>
            <LayoutMenu active={menuActive} />
         </div>
      </div>
   );
}

export default MenuBurger;