import React, { useRef, useEffect } from 'react';

import "./rangeBars.css"

function RangeBars({ rangesValue }) {

   const rangesRef = useRef()

   useEffect(() => {
      if (rangesRef) {

         // Все элементы шкалы ползунка эквалайзера - сразу создаем массив
         const rangesElems = Array.from(rangesRef.current.children)

         // Расчет соотношения количества элементов шкалы к ходу ползунка (1 к 4)
         let rangeStep = Math.round(rangesValue / 4)

         // Отрисвка положительных значений шкалы
         drowRangesElems(rangeStep)

         // Отрисвка отрицательных значений шкалы
         if (rangeStep < 0) {

            // Обработка отрицательного значения ползунка 
            let rangeStepNegative = Math.abs(rangeStep)

            drowRangesElems(rangeStepNegative)
         }

         //Отрисовываем элементы визуализации работы ползунка эквалайзера
         function drowRangesElems(stepValue) {

            // Преварачиваем массив для правильной визуальной отрисовки шкалы
            rangesElems.reverse()

            // Номер элемента для начала отсчета
            let ratio = 5

            // устанавливаем базовый фон элемента 
            rangesElems.forEach((elem) => {
               elem.classList.remove("equalizer-visual__bars-addColor")
            })

            // Добаляем цвет элементу шкалы
            for (let i = 0; i <= stepValue; i++) {

               rangesElems[i + ratio].classList.add("equalizer-visual__bars-addColor")

               // Изменяем прозрачность фона элемента через переменную css
               if (i > 0) {
                  rangesElems[i + ratio].style.setProperty("--range-bars-color-opasity", i / 10 + 0.35)
               }
            }
         }
      }

   }, [rangesValue])


   return (
      <div>
         <div ref={rangesRef} className="equalizer-visual__bars-wraper">

            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
            <div className="equalizer-visual__bars-elem"></div>
         </div>
      </div >
   );
}

export default RangeBars;