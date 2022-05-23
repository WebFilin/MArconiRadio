import React from 'react';

import "./layoutMenu.css"

import MenuNav from '../MenuNav/MenuNav';

import MenuContent from '../MenuContent/MenuContent';

function LayoutMenu() {

   return (
      <div className="burger-menu-layout__wraper">

         <nav className="burger-menu-layout__nav-wraper">
            <MenuNav header={"MARCONI RADIO"} />
         </nav>

         <main className="burger-menu-body__content-wraper">
            <MenuContent />
         </main>
      </div>
   );
}

export default LayoutMenu;