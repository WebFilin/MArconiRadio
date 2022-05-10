import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

// Редюсер управления аудио
import { getUrlAudio } from "../../store/urlAudioSourseReduser"

import "./itemsAddStations.css"

function ItemsAddStations({ contryName, url, min, max, dot }) {

   const stationRef = React.useRef()

   // Положение скрола выбора радиостанции
   const valueTuning = useSelector(state => state.tuning.tuning)

   const dispatch = useDispatch()

   // Включаем подсветку в зависимости от положения ползунка
   React.useEffect(() => {

      let station = stationRef.current

      if (valueTuning >= min && valueTuning <= max) {
         station.classList.add("radio__display-station-items_add-neon")
         dispatch(getUrlAudio(url))
      }

      else {
         station.classList.remove("radio__display-station-items_add-neon")
      }

   }, [valueTuning, min, max, dot, dispatch, url])

   return (

      <div className="radio__display-station-items-wraper ">

         {/* прицел для ползунка выбора станции - в этом месте включается музыка */}
         {dot === true ? <div className='radio__station-items_point_range'></div> : null}

         <div ref={stationRef} className="radio__station-items-body">
            {contryName === "undefined" ? "" : contryName}

         </div>

         {dot === false ? <div className='radio__station-items-point_range'></div> : null}

      </div >
   );
}

export default ItemsAddStations;