import React from 'react';

import "./layout.css"

import MenuNav from '../MenuNav/MenuNav';

import MenuContent from '../MenuContent/MenuContent';

const items = [
   { value: "Station control", href: "/control", icon: "" },
   { value: "Station list", href: "/list", icon: "" },
   { value: "About", href: "/about", icon: "" }
]

function LayoutMenu(props) {

   return (
      <div className="burger-menu-layout__wraper">

         <nav className="burger-menu-layout__nav-wraper">
            <MenuNav header={"MARCONI RADIO"} items={items} />
         </nav>

         <main className="burger-menu-body__content-wraper">
            <MenuContent />
         </main>
      </div>
   );
}

export default LayoutMenu;