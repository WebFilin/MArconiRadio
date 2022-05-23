import React from 'react';

import "../MenuNav/menuNav.css"

import { NavLink } from "react-router-dom"

function MenuNav({ header }) {

   // массив пунктов меню
   const items = [
      { value: "Station control", href: "/control", icon: "" },
      { value: "Station list", href: "/list", icon: "" },
      { value: "About", href: "/about", icon: "" }
   ]

   return (
      // Запрещаем скрывать меню при клике по его области
      <div className='menu-nav__wraper' onClick={elem => elem.stopPropagation()} >
         <h2 className="menu-nav__header">{header}</h2>
         <ul className='menu-nav__items'>

            {/* Создаем меню ссылок навигации */}
            {items.map((item) =>
               <li key={item.value} >
                  <NavLink
                     className={({ isActive }) => isActive ? "menu-nav__url-active" : 'menu-nav__url'}
                     to={item.href}>{item.value}
                  </NavLink>
               </li>
            )}
         </ul>
         <div className="menu-nav__img-back"></div>
      </div>
   );
}

export default MenuNav;