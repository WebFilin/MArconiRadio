import React, { useRef, useState } from 'react';

import "./BtnTuning.css"

import ScrollControllers from '../../Controllers/ScrollControllers';

// Переключатель класса подсветки 
import ToggleStateOnClick from "../../SecondaryUtils/ToggleStateOnClick"

import { useSelector } from 'react-redux';

function BtnTuning() {

   // Выбор ручки для перключения контроллера скрола
   const tuning = useRef()

   // элемент для подключения подстветки при клике
   const button = useRef()

   const btnTuning = button.current

   // тригер для контроллера скрола - выбор громкость или станция
   const [switchBtn, setSwitchBtn] = useState(false)

   // Переменная для поврота ручки
   const [rotateKnob, setRotateKnob] = useState(null)

   // Получаем положение скрола
   const valueTuning = useSelector(state => state.tuning.tuning)

   // Классы для активных элементов управления
   const activeClassCss = "btn__tuning-control-active"

   // начальное положение угла порота ручки
   let angleStart = -220

   // задаем угол поворота для маховика выбора станции 
   // 8 коофициент для угла поворота
   React.useEffect(() => {

      setRotateKnob(angleStart)

      if (switchBtn === "tuning") {
         setRotateKnob(angleStart + valueTuning * 8)
      }

   }, [valueTuning, switchBtn, angleStart])

   // Обработчик для переключения типа кнопки
   function setValueBtn() {
      setSwitchBtn("tuning")
   }

   return (
      <div className='btn__tuning-wraper' ref={tuning} onClick={setValueBtn}>

         <div ref={button} className="btn__tuning-control">

            <span className="btn__tuning-panel"></span>

            <span className="btn__tuning-knob">
               <div style={{ transform: `rotate(${rotateKnob}deg)` }} className="btn__tuning-knob-wraper-point">
                  <div className="btn__tuning-knob-point"></div>
               </div>
            </span>
         </div>

         <div className="btn__tuning-txt">
            TUNING
         </div>

         <ScrollControllers target={tuning} borderDown={0} borderHigh={46} switchValueScroll={switchBtn} />
         <ToggleStateOnClick objectClic={btnTuning} addClass={activeClassCss} removeClass={activeClassCss} />
      </div>
   );
}

export default BtnTuning;