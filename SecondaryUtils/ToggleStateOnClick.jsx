import React from 'react';
import { useEffect, useState } from 'react';


// Компонент сбрасывающий стиль css при клике на любом месте старницы кроме компонента
function ToggleStateOnClick({ objectClic, addClass, removeClass }) {

   //управления состоянием
   const [isOpen, setIsOpen] = useState(false)

   // Логика присвоения и удаления названия класса
   useEffect(() => {

      if (objectClic) {

         // Логика удаления и добавления класса при клике по обьекту
         let handler = (event) => {
            if (objectClic.contains(event.target)) {
               setIsOpen(true)
            }

            else {
               setIsOpen(false)
            }
         }

         if (isOpen === false) {
            objectClic.classList.remove(removeClass)
         }

         else if (isOpen === true) {
            objectClic.classList.add(addClass)
         }

         document.addEventListener("mousedown", handler)

         return () => {
            document.removeEventListener("mousedown", handler)
         }
      }

   }, [addClass, isOpen, objectClic, removeClass])

   return (
      <div>

      </div>
   );

}

export default ToggleStateOnClick;




   //ОБьект для навешивания клика и логика работы переключателя
