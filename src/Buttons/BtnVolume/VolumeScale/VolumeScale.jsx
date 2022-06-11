import React from "react";

import { useSelector } from 'react-redux';

import "./volumeScale.css"

function VolumeScale({ objectClic }) {

   // Элементы шкалы
   const svg = React.useRef()

   // Шаг поворота ручки громкости
   const valueVolume = useSelector(state => state.volume.volume)

   // Номер класса btn__volume-scale-elems-* для синхронизации работы подсветки шкалы громкости
   const [numClass, setNumClass] = React.useState(null)

   React.useEffect(() => {

      const scaleElem = Array.from(svg.current.children)

      // Добавляем по одному  элементы шкалы при скроле
      function addColorElemClass() {
         for (let i = 0; i <= valueVolume - 1 && i <= scaleElem.length - 1; i++) {
            setNumClass(i)
            scaleElem[i].classList.add(`btn__volume-scale-elems-${i}`)
         }
      }

      // Удаляем по одному элементы шкалы при скроле
      function removeColorElemClass() {
         scaleElem.forEach((elem) => {
            elem.classList.remove(`btn__volume-scale-elems-${numClass + 1}`)
         })
      }

      // Скрываем все элементы шкалы при клике мимо компонента
      function removeAllColorElemClass() {
         for (let i = 0; i <= numClass; i++) {
            scaleElem[i].classList.remove(`btn__volume-scale-elems-${i}`)
         }
      }

      // Логика обработки элементов шкалы
      removeColorElemClass()

      if (objectClic === "volume") {
         addColorElemClass()
      }

      else {
         removeAllColorElemClass()
      }


   }, [valueVolume, numClass, objectClic])

   return (

      <div className="btn__volume-scale-wraper">
         <svg className="btn__volume-scale" viewBox="0 0 100  100">
            <rect ></rect>
            <g
               ref={svg}
               className="btn__volume-scale-elems"
            >

               <circle cx="10" cy="50" r="2" />

               <circle cx="13" cy="36" r="2" />
               <circle cx="20" cy="23" r="2" />
               <circle cx="33" cy="14" r="2" />

               <circle cx="50" cy="10" r="2" />

               <circle cx="67" cy="14" r="2" />
               <circle cx="80" cy="23" r="2" />
               <circle cx="87" cy="36" r="2" />
               <circle cx="87" cy="36" r="2" />

               <circle cx="90" cy="50" r="2" />

            </g>
         </svg>
      </div >
   );
}

export default VolumeScale;
