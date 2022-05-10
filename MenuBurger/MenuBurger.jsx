import React from 'react';

import "./menuBurger.css"

import MenuNav from './MenuNav/MenuNav';

import MenuBtn from "./MenuBtn/MenuBtn"

import MenuContent from './MenuContent/MenuContent';

import { useDispatch } from 'react-redux';

import { getBurgerOpenState } from "../store/isBurgerOpen"

function MenuBurger() {

   // Обьект для формирования меню
   const items = [
      { value: "Station control", href: "/control", icon: "" },
      { value: "Station list", href: "/list", icon: "" },
      { value: "About", href: "/about", icon: "" }
   ]

   // Открываем - закрываем меню
   const [menuActive, setMenuActive] = React.useState(false)

   // передаем обьект через redux
   const dispatch = useDispatch()

   // Передаем состояние открытия или закрытия меню бургер
   dispatch(getBurgerOpenState(menuActive))

   return (
      <div className='burger-menu__wraper' >
         <div className="burger-menu-btn__wraper" onClick={() => setMenuActive(!menuActive)}>
            <MenuBtn active={menuActive} />
         </div>

         {/* Логика открытия и закрытия меню */}
         <div className={menuActive ? "burger-menu__body-active" : "burger-menu__body"}>
            <MenuNav header={"MARCONI RADIO"} items={items} />
            <div className="burger-menu__body-blur"></div>

            <section className="burger-menu-body__content-wraper">
               <MenuContent />
            </section>
         </div>

      </div>
   );
}

export default MenuBurger;