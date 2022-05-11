import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import "./itemsAddStations.css"

// Редюсер управления аудио
import { getUrlAudio } from "../../store/urlAudioSourseReduser"

import StationNameHandler from '../../SecondaryUtils/StationCountryHandler';

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

      <div className="add__station-items-wraper ">

         {/* прицел для ползунка выбора станции - в этом месте включается музыка */}
         {dot === "up" && <div className='add__station-items_point_range-up'></div>}

         <div ref={stationRef} className="add__station-items-body">
            {contryName && <StationNameHandler countryName={contryName} />}
         </div>

         {dot === "down" && <div className='add__station-items-point_range-down'></div>}

      </div >
   );
}

export default ItemsAddStations;