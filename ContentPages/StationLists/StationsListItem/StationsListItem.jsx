import React from 'react';

import "./stationsListItem.css"

// Бибилиотека анимаций
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import StationItemsTitle from '../../../StationSearch/SearchStationItems/StationItemsTitle/StationItemsTitle';

import BtnRemove from '../BtnRemove/BtnRemove';

import BtnPlayStop from '../../../StationSearch/Btn/BtnPlayStop/BtnPlayStop';

import StationItemsBody from "../../../StationSearch/SearchStationItems/SearchStationItemsBody/StationItemsBody"

import { useDispatch } from 'react-redux';

import { getlocalStorageLength } from "../../../store/localStorageLength"

// Анимация загрузки звука при клике на кнопку в карточке
import AnimoLoadingItemsAudio from '../../../StationSearch/AnimoLoadingItemsAudio/AnimoLoadingItemsAudio'

import NotAddStations from '../NotAddStations/NotAddStations';

// Получаем url аудио для воспроизведения
import { getUrlAudio, getPlayPause } from "../../../store/urlAudioSourseReduser"

function StationsListItem({ stationsObj }) {

   // Массив для рединга станций
   const [arrStations, setArrStations] = React.useState([...stationsObj])

   //Aктивации конкретного элемента на странице
   const [isActive, setIsActive] = React.useState(false)

   // Передаем ссылку на проигрывание
   const [activeUrlRadio, setActiveUrlRadio] = React.useState()

   // Управляем воспроизведением аудио
   const [playSwitch, setPlaySwitch] = React.useState(false)

   const [btnPlayStop, setBtnPlayStop] = React.useState(null)

   // передаем обьект через redux
   const dispatch = useDispatch()

   // Класс анимации загрузки звука
   // передается в BtnPlayStop и AnimoLoadingItemsAudio
   const classActiveBtnAnimo = "search-stations__items-title-btn-loading-active"

   // Активируем различные элементы на странице, стартуем музыку по клику на кнопку
   function activeElements(elem, btn) {
      setIsActive(elem)
      setActiveUrlRadio(elem.url)
      setPlaySwitch(!playSwitch)
      setBtnPlayStop(btn.currentTarget)
   }

   // Удаляем элемент из localStorage и со страницы
   function removeItems(idStation) {

      localStorage.removeItem(idStation)

      let newArrStations = arrStations.filter(el => el.stationuuid !== idStation)

      setArrStations(newArrStations)
   }

   // Предеаем ссылку на потоковое аудио в компонент управления AudioController
   React.useEffect(() => {
      dispatch(getUrlAudio(activeUrlRadio))
      dispatch(getPlayPause(playSwitch))
   }, [activeUrlRadio, dispatch, playSwitch])

   // Передаем длинну массива добавленных в список станций
   React.useEffect(() => {
      dispatch(getlocalStorageLength(arrStations.length))
   }, [arrStations, dispatch])

   return (
      <div className='station__lists-items-wraper'>

         {/* Активируем группу списка */}
         <TransitionGroup
            className="station__lists-items-ul"
            component="ul"
         >
            {arrStations.length === 0 ? <NotAddStations /> : arrStations.map((elem) =>

               // Задаем классы css
               <CSSTransition
                  key={elem.stationuuid}
                  timeout={500}
                  className='station__lists-items'
               >

                  <li>
                     <div className="station__lists-items-title-wraper">
                        <StationItemsTitle
                           favicon={elem.favicon}
                           nameStation={elem.name}
                        />

                        <div className="station__lists-items-title-btn-wraper"  >
                           <div className="station__lists-items-title-btn-remove"
                              onClick={() => removeItems(elem.stationuuid)}>
                              <BtnRemove />
                           </div>

                           <div className="station__lists-items-title-btn-play-stop"
                              onClick={(btn) => activeElements(elem, btn)}>

                              <BtnPlayStop
                                 isActiveElem={isActive === elem}
                                 isActive={playSwitch}
                                 classActive={classActiveBtnAnimo}
                              />

                           </div>
                        </div>
                     </div>
                     <StationItemsBody radioStation={elem} />
                  </li>
               </CSSTransition>
            )}
         </TransitionGroup>

         {/* Логика загрузки по состоянию ацдио обьекта  */}
         <AnimoLoadingItemsAudio
            objBtn={btnPlayStop}
            clicActive={playSwitch}
            classActive={classActiveBtnAnimo}
         />
      </div>
   );
}

export default StationsListItem;