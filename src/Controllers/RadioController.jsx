import React from 'react';

// Импортируем API радиостанций
import RadioBrowserApi from "radio-browser"

import { useSelector, useDispatch } from 'react-redux';

import { getUrlAudio } from "../store/urlAudioSourseReduser"

function RadioController({ playPauseSwitch }) {

   // Параметры станции полученные из stationReduser
   const stationParams = useSelector(state => state.stationParams.station)

   // передаем обьект через redux
   const dispatch = useDispatch()

   //Формируем аудио обьекта из ссылки на аудио
   React.useEffect(() => {

      if (playPauseSwitch) {

         // Получаем список станций по параметрам
         async function fetchStation() {

            try {
               const stationRadio = await RadioBrowserApi.searchStations({
                  countrycode: stationParams.land,
                  limit: 5,
               })

               // Номер станции в данной выборке
               const numStation = stationParams.station

               // Получаем url станции
               const urlRadio = stationRadio[numStation].url

               // Подставляем нужный url в обьект Audio AudioController
               dispatch(getUrlAudio(urlRadio))
            }

            catch (error) {
               alert(error.message)
            }
         }

         if (stationParams.land) {
            fetchStation()
         }
      }

   }, [stationParams, dispatch, playPauseSwitch])


   return (
      <div>
      </div>
   );
}

export default RadioController;