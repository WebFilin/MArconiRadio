import React from 'react';

import "./animoLoadingItemsAudio.css"

import { useSelector } from 'react-redux';

function AnimoLoadingItemsAudio({ objBtn, clicActive, classActive }) {

   // Получаем статус готовности аудио
   const isLoadedAudio = useSelector(state => state.visualLoad.switchProgresBar)

   // Обьект кнопачки
   const [btn, setBtn] = React.useState()

   React.useEffect(() => {

      // Проверяем наличие и ждем клик активации
      if (objBtn) {
         setBtn(objBtn.children[0].children[0])

         if (btn && clicActive) {
            isAnimoLoad()
         }
      }

      // Миняем стили в зависимости от готовности звука к проигрыванию
      function isAnimoLoad() {

         if (isLoadedAudio === false) {
            btn.classList.add(classActive)
         }

         else {
            btn.classList.remove(classActive)
         }
      }

   }, [objBtn, isLoadedAudio, clicActive, btn, classActive])

   return (
      <div>

      </div>
   );
}

export default AnimoLoadingItemsAudio;