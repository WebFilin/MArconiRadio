import React from 'react';

import "./stationSearch.css"

// Импортируем API радиостанций
import RadioBrowserApi from "radio-browser"

import StationItemsBody from "./SearchStationItems/SearchStationItemsBody/StationItemsBody"

import BtnAdd from './Btn/BtnAdd/BtnAdd';

import BtnPlayStop from "./Btn/BtnPlayStop/BtnPlayStop"

import StationItemsTitle from "./SearchStationItems/StationItemsTitle/StationItemsTitle"

// Анимация загрузки звука при клике на кнопку в карточке
import AnimoLoadingItemsAudio from './AnimoLoadingItemsAudio/AnimoLoadingItemsAudio';

// Анимация загрузки
import LoadingAnimo from "../LoadingAudio/LoadingAudio"

import { useDispatch, useSelector } from 'react-redux';

// Редюсер управления аудио
import { getUrlAudio, getPlayPause } from "../store/urlAudioSourseReduser"

function StationSearch({ isRating }) {

   const limitDrowStation = useSelector(state => state.totalStationInPage.totalStations)

   const dispatch = useDispatch()

   // Обьект для списка радиостанций
   const [radioStation, setRadioStation] = React.useState([])

   //Aктивации конкретного элемента на странице
   const [isActive, setIsActive] = React.useState(false)

   // Передаем ссылку на проигрывание
   const [activeUrlRadio, setActiveUrlRadio] = React.useState(null)

   // Управляем воспроизведением аудио
   const [playSwitch, setPlaySwitch] = React.useState(false)

   const [btnPlayStop, setBtnPlayStop] = React.useState(null)

   // Обьект поисковых запросов из инпутов SearchForms
   const searchForms = useSelector(state => state.valueSearch.valueInput)

   // Шаг кнопок пагинации вперед назад
   const stepForwardBack = useSelector(state => state.valuePagination.stepPage)

   // Класс анимации загрузки звука
   // передается в BtnPlayStop и AnimoLoadingItemsAudio
   const classActiveBtnAnimo = "search-stations__items-title-btn-loading-active"

   // Обьект для отрисовки станций
   const [radioStationDrow, setRadioStationDrow] = React.useState([])

   // Если станции не найдены 
   const [notFoundStations, setNotFoundStations] = React.useState("")

   // Отключаем кнопки при заполнении локал сторадж
   const [disableBtnAdd, setDisableBtnAdd] = React.useState(false)

   // Количество станций в которые можно добавить в сторадж
   const addListdStationsLenght = 8

   // Формируем список радиостанций 
   React.useEffect(() => {

      // Ошбика поиска
      const notSearch = <div className="search-stations__not-search"> Not found in search </div>

      // Ошбика при загрузке
      const notLoading = <div className="search-stations__not-search"> Not found in loading </div>

      // Получаем станции по дефолту
      async function getStationDefault() {

         try {
            const stationLists = await RadioBrowserApi.searchStations({
               limit: limitDrowStation,
               offset: stepForwardBack,
               hidebroken: false,
            })

            setRadioStation(stationLists)

            // Если станции не найдены по дефолту
            if (stationLists.length === 0) {
               setNotFoundStations(notLoading)
            }
         }

         catch (err) {
            alert(err)
         }
      }

      // Пoлучаем станции по поисковым запросам
      async function getSearchList() {

         try {
            const stationListsSearch = await RadioBrowserApi.searchStations({
               name: searchForms.Name.toLowerCase(),
               country: searchForms.Сountry,
               tag: searchForms.Style.toLowerCase(),
               language: searchForms.Language.toLowerCase(),

               limit: limitDrowStation,
               offset: stepForwardBack,
               hidebroken: false,
            })

            // Передаем на отрисовку результат поиска
            setRadioStation(stationListsSearch)

            // Если станции не найдены при поиске
            if (stationListsSearch.length === 0) {
               setNotFoundStations(notSearch)
            }
         }

         catch (err) {
            alert(err)
         }
      }

      // Если есть поисковый запрос переключаем логику поиска станций
      searchForms ? getSearchList() : getStationDefault()

   }, [searchForms, stepForwardBack, limitDrowStation])

   // Сортировка станций по рейтингу
   React.useEffect(() => {

      if (Array.isArray(radioStation)) {

         // Копируем исходный массив со станциями
         const arrRatingVoits = [...radioStation]

         // Логика сортировки по увеличению
         for (let i = 0; i < arrRatingVoits.length; i++) {

            arrRatingVoits[i].votes = Number(arrRatingVoits[i].votes);

            arrRatingVoits.sort((a, b) => (b.votes - a.votes));
         }

         // Переключаем обьекты для подачи на отрисовку, либо с сортировкой либо без
         isRating ? setRadioStationDrow(arrRatingVoits) : setRadioStationDrow(radioStation)
      }

   }, [isRating, radioStation])

   // Активируем различные элементы на странице, стартуем музыку по клику на кнопку
   function activeElements(elem, btn) {
      setIsActive(elem)
      setActiveUrlRadio(elem.url)
      setPlaySwitch(!playSwitch)
      setBtnPlayStop(btn.currentTarget)
   }


   React.useEffect(() => {
      dispatch(getUrlAudio(activeUrlRadio))
      dispatch(getPlayPause(playSwitch))
   }, [activeUrlRadio, dispatch, playSwitch])

   //Отключаем кнопки после добавления addListLenght радиостанций
   // Связано с ретроинтерфейсом радио 
   function disabledBtn() {

      if (localStorage.length <= addListdStationsLenght) {

         setDisableBtnAdd(false)
      }

      else {
         setDisableBtnAdd(true)
      }
   }

   return (
      <div className='search-stations__wraper'>

         {radioStation.length === 0 ? notFoundStations :

            <ul start={stepForwardBack} className="search-stations__items-ul" >

               {!radioStationDrow ? <LoadingAnimo /> : radioStationDrow.map((elem) =>

                  <li key={elem.changeuuid} className='search-stations__items'>

                     <div className="search-stations__items-title-wraper">
                        <StationItemsTitle
                           favicon={elem.favicon}
                           nameStation={elem.name}
                        />

                        <div className="search-stations__items-title-btn-wraper">
                           <BtnAdd
                              idStations={elem.stationuuid}
                              isActive={disableBtnAdd}
                              localStorageTriger={disabledBtn}
                           />

                           <div className="search-stations__items-title-btn-play-stop"
                              onClick={(btn) => { activeElements(elem, btn) }}>

                              <BtnPlayStop
                                 isActiveElem={isActive === elem}
                                 isActive={playSwitch}
                              />

                           </div>
                        </div>
                     </div>
                     <StationItemsBody radioStation={elem} />
                  </li>
               )}
            </ul>
         }

         {/* Логика загрузки по состоянию ацдио обьекта  */}
         <AnimoLoadingItemsAudio
            objBtn={btnPlayStop}
            clicActive={playSwitch}
            classActive={classActiveBtnAnimo}
         />

      </div >
   );
}

export default StationSearch;