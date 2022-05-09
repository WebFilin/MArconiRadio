import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import "./equlizerPowerSound.css"

function EqulizerPowerSound({ playPauseSwitch }) {

   // Усредненое значение силы звука получаемое из Equalizer
   let averageVolume = useSelector(state => state.equalizer.average)

   // Переключатель состояния прогрессбара вкл/выкл
   // вклюается вместо шкалы
   let switchProgresBar = useSelector(state => state.visualLoad.switchProgresBar)

   const elements = React.useRef()

   //Устанавливаем цвета элемента шкалы силы звука
   const [colorElem10, setColor10] = useState(null)
   const [colorElem9, setColor9] = useState(null)
   const [colorElem8, setColor8] = useState(null)
   const [colorElem7, setColor7] = useState(null)
   const [colorElem6, setColor6] = useState(null)
   const [colorElem5, setColor5] = useState(null)
   const [colorElem4, setColor4] = useState(null)
   const [colorElem3, setColor3] = useState(null)
   const [colorElem2, setColor2] = useState(null)
   const [colorElem1, setColor1] = useState(null)

   // Счетчик для добавления элементов
   const [counter, setСounter] = React.useState(0)

   // Изменение цветов элементов в зависимости от силы звука
   useEffect(() => {

      // Задаем цвета элементов
      if (playPauseSwitch === true) {
         averageVolume >= 150 ? setColor10("var(--color-power-sound100)") : setColor10("")
         averageVolume >= 140 ? setColor9("var( --color-power-sound100)") : setColor9("")
         averageVolume >= 130 ? setColor8("var(--color-power-sound70)") : setColor8("")
         averageVolume >= 120 ? setColor7("var( --color-power-sound70)") : setColor7("")
         averageVolume >= 110 ? setColor6("var( --color-power-sound60)") : setColor6("")
         averageVolume >= 100 ? setColor5("var(--color-power-sound60)") : setColor5("")
         averageVolume >= 80 ? setColor4("var( --color-power-sound50)") : setColor4("")
         averageVolume >= 60 ? setColor3("var( --color-power-sound50)") : setColor3("")
         averageVolume >= 20 ? setColor2("var( --color-power-sound20)") : setColor2("")
         averageVolume >= 10 ? setColor1("var( --color-power-sound20)") : setColor1("")
      }

   }, [averageVolume, playPauseSwitch])

   // Очищаем шкалу при выключенном аудио
   useEffect(() => {

      if (playPauseSwitch === false) {
         setColor1("")
         setColor2("")
         setColor3("")
         setColor4("")
         setColor5("")
         setColor6("")
         setColor7("")
         setColor8("")
         setColor9("")
         setColor10("")
      }

   }, [playPauseSwitch])

   // Логика отрисовки прогрессбара загрузки аудиообьекта
   useEffect(() => {

      // Масив элементов шкалы силы звука
      const arrElem = Array.from(elements.current.children)

      // Для остановки отсчета
      let timer

      // Отрисовываем шкалу прогрессбара
      function drowProgressBar() {

         arrElem.reverse()

         if (counter <= arrElem.length - 1) {

            setСounter(counter + 1)
            arrElem[counter].classList.add("average-volume-element-active")

            setTimeout(() => {
               arrElem[counter].classList.remove("average-volume-element-active")
            }, 1200);
         }

         else {
            setСounter(0)
         }
      }

      // Управление шкалой
      if (playPauseSwitch === true && switchProgresBar === false) {
         timer = setTimeout(() => {
            drowProgressBar()
         }, 150)
      }

      else {
         clearTimeout(timer)
         arrElem.forEach((elem) => {
            elem.classList.remove("average-volume-element-active")
         })
      }

   }, [switchProgresBar, playPauseSwitch, counter])

   return (
      <div ref={elements} className="equalizer-visual__average-volume-wraper" >

         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem10}` }}></div>
         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem9}` }}></div>

         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem8}` }}></div>
         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem7}` }}></div>

         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem6}` }}></div>
         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem5}` }}></div>

         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem4}` }}></div>
         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem3}` }}></div>

         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem2}` }}></div>
         <div className="equalizer-visual__average-volume-element"
            style={{ "background": `${colorElem1}` }}></div>

      </div>
   );
}

export default EqulizerPowerSound;