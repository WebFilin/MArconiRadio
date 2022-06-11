import React, { useRef, useEffect, useState } from 'react';

import "./equlaizerRange.css"

function EqulaizerRanges({ waveRange, params }) {

   // Переменные параметров компонента
   let min = params.minWave
   let max = params.maxWave
   let step = params.step
   let defaultValue = params.defaultValue
   let CoeffValueDec = params.CoefficientValueDec
   let CoeffValueInc = params.CoefficientValueInc
   let ColorDec = params.ColorDec
   let ColorInc = params.ColorInc

   // Получаем ползунок
   const range = useRef()

   // Получаем значение ползунка при прокрутке
   const [rangeValue, setRangeValue] = useState()

   // Устанавливаем значение фона до ползунка
   const [rangeBackground, setRangeBackground] = useState(null)

   useEffect(() => {

      // Массив диапазона значений ползунка, границы пропсы min max
      let arrValue = []

      for (let i = min; i < max; i++) {
         arrValue.push(i)
      }

      // Коофициент для заполнения полосы прокрутки цветом на всем протяжении без потери
      let rangeCoefficient = 0
      rangeValue > 0 ? rangeCoefficient = CoeffValueDec : rangeCoefficient = CoeffValueInc

      // расчет % сдвига для градиента шкалы ползунка 
      let pctValueColor = (rangeValue * 100) / arrValue.length + rangeCoefficient

      // Параметры бэкграунда шкалы ползунка
      let background = `
      -webkit-linear-gradient(left, ${ColorDec} 0%, ${ColorDec} ${pctValueColor + 15}%, ${ColorInc} ${pctValueColor}%, ${ColorInc} 100%)`
      setRangeBackground(background)

   }, [rangeValue, CoeffValueDec, CoeffValueInc, ColorDec, ColorInc, max, min])


   return (
      <div className='equlizer-range__wraper'>

         <div className="equlizer-range-txt">
            {waveRange}
         </div>

         <div className="equlizer-range__body" >
            <input ref={range} onChange={(elem) => {
               setRangeValue(elem.target.value)
            }}

               style={{ background: rangeBackground }}
               className='equlizer-range' type="range" min={min} max={max} step={step} defaultValue={defaultValue} ></ input >
         </div>
      </div>
   );
}

export default EqulaizerRanges;