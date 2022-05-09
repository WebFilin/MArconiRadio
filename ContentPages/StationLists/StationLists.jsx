import React from 'react';

import "./stationLists.css"

import RadioBrowserApi from 'radio-browser';

import StationsListItem from './StationsListItem/StationsListItem';

import LoadingAudio from "../../LoadingAudio/LoadingAudio"

import BtnClearLocalStoradge from "./BtnClearLocalStoradge/BtnClearLocalStoradge"

import NotAddStations from './NotAddStations/NotAddStations';

import SwitchSortItems from "../../StationSearchControls/SearchForms/SwitchSortItems/SwitchSortItems"

function StationLists() {

   // все станции из localStorage
   const [arrStations, setArrStations] = React.useState([])

   // Статус для лоадера
   const [isLoading, setIsLoading] = React.useState(false)

   const [isActive, setIsActive] = React.useState(false)

   // Тригер сортировки по реитингу
   const [isRating, setIsRating] = React.useState(false)

   // Массив для отображения станций
   const [raadioStationDrow, setRadioStationDrow] = React.useState([])

   React.useEffect(() => {

      // Стек для сбора всех радиостанций из цикла
      const elemLocalStorage = []

      // Получаем список радиостанций по ключам в localStorage
      async function getStationsList() {

         try {
            for (let i = 0; i < localStorage.length; i++) {
               let key = localStorage.key(i);

               let keyValue = localStorage.getItem(key)

               let radioObj = await RadioBrowserApi.getStations({
                  by: 'byuuid',
                  searchterm: keyValue
               })

               if (radioObj) {
                  setIsLoading(true)
                  radioObj.map((elem) => elemLocalStorage.push(elem))
               }
            }

            setArrStations(elemLocalStorage)
         }

         catch (err) {
            alert("Erorr " + err)
         }
      }

      getStationsList()

   }, [isLoading])

   // Логика состояний для отображения списка станций
   let StateLoading = () => {

      if (localStorage.length === 0) {
         return <NotAddStations />
      }

      else if (!isLoading) {
         return <LoadingAudio />
      }

      else {
         return <StationsListItem stationsObj={raadioStationDrow} />
      }
   }

   // Очишаем всю страницу от айтемов
   function clearPage() {
      localStorage.clear()
      setArrStations([])

      if (arrStations.length === 0) {
         setIsActive(false)
      }

      else {
         setIsActive(true)
      }
   }

   // Сортируем массив станций по рейтингу
   React.useEffect(() => {

      // Копируем исходный массив со станциями
      const arrRatingVoits = [...arrStations]

      // Логика сортировки по увеличению
      for (let i = 0; i < arrRatingVoits.length; i++) {

         arrRatingVoits[i].votes = Number(arrRatingVoits[i].votes);

         arrRatingVoits.sort((a, b) => (b.votes - a.votes));
      }

      // Переключаем обьекты для подачи на отрисовку, либо с сортировкой либо без
      isRating ? setRadioStationDrow(arrRatingVoits) : setRadioStationDrow(arrStations)

   }, [isRating, arrStations])

   return (
      <div className='station__lists-wraper'>
         <div className="station__lists-wraper-btn">

            <div className="station__lists-btn-body"
               onClick={clearPage}
            >
               <BtnClearLocalStoradge isActive={isActive} />
            </div>

            <div className="station__lists-btn-sort"
               onChange={() => setIsRating(!isRating)}
            >
               <SwitchSortItems title="Rating" />
            </div>
         </div>

         <div className="station__lists-body">
            <StateLoading />
         </div>
      </div>
   );
}

export default StationLists;