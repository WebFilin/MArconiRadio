import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

// Функции креаторы редюсера из redax
import { getValueTuning, getValueVolume } from "../store/scrollReduser"

function ScrollControllers({ target, borderDown, borderHigh, switchValueScroll }) {

   // Устанавливаем значение скрола для громкости и выбора станции
   const [value, setValue] = useState(1)

   // Получаем стейт redux для скролла
   const dispatch = useDispatch()

   useEffect(() => {

      if (switchValueScroll === "tuning") {
         // Инициализируем стейт редюсера значением скрола
         dispatch(getValueTuning(value))
      }

      else if (switchValueScroll === "volume") {
         dispatch(getValueVolume(value))
      }

   }, [switchValueScroll, value, dispatch])

   useEffect(() => {

      if (target) {

         // Обьект для навешивания скрола
         let scrolObj = target.current

         // Счетчик прокрутки колесика
         let scale = 0;

         // Слушаем колесико мыши
         function addOnWheel(elem) {
            if (elem.addEventListener) {
               if ('onwheel' in document) {
                  // IE9+, FF17+
                  elem.addEventListener("wheel", getValue, { passive: false });
               } else if ('onmousewheel' in document) {
                  // устаревший вариант события
                  elem.addEventListener("mousewheel", getValue, { passive: false });
               } else {
                  // 3.5 <= Firefox < 17
                  elem.addEventListener("MozMousePixelScroll", getValue, { passive: false });
               }
            }
         }

         // Снимаем значение скрола с колесика
         function handlerWheel(objScroll, scrollValue) {

            // Получаем скрол по всем осям
            let delta = objScroll.deltaY || objScroll.detail || objScroll.wheelDelta;

            if (delta < 0) {
               scale += 1
            }

            else {
               if (scale > 0) {
                  scale -= 1
               }
            }
            setValue(scrollValue)
         }

         // Установщик значения скролла
         function getValue(elem) {

            // Диапазон значения прокрутки 
            if (scale >= borderDown && scale <= borderHigh) {
               handlerWheel(elem, scale)
            }

            else {
               handlerWheel(elem)

               elem.stopPropagation()
               return false
            }

            // отменим действие скрола по умолчанию
            elem.preventDefault()
         }

         // Передаем target на обработку функции слушателя
         addOnWheel(scrolObj)
      }

   }, [target, borderDown, borderHigh])

   return (
      <div>

      </div>
   );
}

export default ScrollControllers;