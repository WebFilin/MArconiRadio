import React, { useRef, useState } from 'react';

import "./BtnVolume.css"

// Контроллер скрола мыши
import ScrollControllers from '../../Controllers/ScrollControllers';

// Активируем подсветку кнопки
import ToggleStateOnClick from "../../SecondaryUtils/ToggleStateOnClick"

import VolumeScale from "./VolumeScale/VolumeScale"

import { useSelector } from 'react-redux';

function BtnVolume() {

   const volume = useRef()

   // элемент для подключения подстветки при клике
   const button = useRef()

   const btnVolume = button.current

   const [switchBtn, setSwitchBtn] = useState(false)

   const valueVolume = useSelector(state => state.volume.volume)

   // Переменная для поврота ручки
   const [rotateKnob, setRotateKnob] = useState()

   // Обработчик для переключения типа кнопки
   function setValueBtn() {
      setSwitchBtn("volume")
   }

   // Класс для активных элементов управления
   const activeClassCss = "btn__volume-control-active"

   // начальное положение угла поворота ручки
   let angleStart = -180

   // задаем угол поворота для маховика выбора станции 
   // 17 коофициент для угла поворота
   React.useEffect(() => {

      setRotateKnob(angleStart)

      if (switchBtn === "volume") {
         setRotateKnob(angleStart + valueVolume * 17)
      }

      // Обнаруживаем клик вне элемента ручки громкости, меняем логическое условие отображения шкалы громкости
      function outClick(elem) {
         volume.current.contains(elem.target) || setSwitchBtn(false)
      }

      document.addEventListener("click", outClick);

      return () => document.removeEventListener('click', outClick);

   }, [valueVolume, switchBtn, angleStart])

   return (
      <div className='btn__volume-wraper' >

         <VolumeScale objectClic={switchBtn} />

         <div className="btn__volume-body" ref={volume} onClick={setValueBtn}>

            <div ref={button} className="btn__volume-control">
               <span className="btn__volume-panel"></span>
               <span className="btn__volume-knob">
                  <div style={{ transform: `rotate(${rotateKnob}deg)` }} className="btn__volume-knob-wraper-point">
                     <div className="btn__volume-knob-point"></div>
                  </div>
               </span>
            </div>

            <div className="btn__volume-txt">
               VOLUME
            </div>

            <ToggleStateOnClick objectClic={btnVolume} addClass={activeClassCss} removeClass={activeClassCss} />
            <ScrollControllers target={volume} borderDown={1} borderHigh={10} switchValueScroll={switchBtn} />
         </div>


      </div>
   );
}

export default BtnVolume;