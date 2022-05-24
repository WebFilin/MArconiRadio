import React, { useState } from 'react';

// Локлаьные для компонента App
import "./app.css"

// Глобальные css переменные
import "./variables/variables.css"

// Маховичек звука
import BtnVolume from "./Buttons/BtnVolume/BtnVolume"

//Ручка выбора радиостанции
import BtnTuning from "./Buttons/BtnTuning/BtnTuning"

import BtnPlay from "./Buttons/BtnPlay/BtnPlay"

import BtnStop from "./Buttons/BtnStop/BtnStop"

import RadioDisplay from "./RadioDisplay/Display/RadioDisplay"

import RadioController from './Controllers/RadioController';

import Equlalizer from "./Equalizer/Equalizer"

import EqualizerVisualizer from './Equalizer/EqualizerVisualizer/EqualizerVisualizer';

import StationListsDefault from "./ContentPages/StationLists/StationsListDefault/StationListsDefault";

import MenuBurger from "./MenuBurger/MenuBurger"

import AudioController from "./Controllers/AudioController"

// Предаем вкл выкл в AudioController
import { getPlayPause } from "./store/urlAudioSourseReduser"

import { useDispatch } from 'react-redux';

function App() {

   // Переключатель состоянии кнопки Play/Stop
   const [playStopSwitch, setPlayStopSwitch] = useState(false)

   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(getPlayPause(playStopSwitch))
   }, [playStopSwitch, dispatch])

   return (
      <div className="app-wraper">

         <nav className='app-wraper__menu-burger'>
            <MenuBurger />
         </nav>

         <main className='app-wraper__main'>
            <div className="app-wraper__btn">
               <div className="app-wraper__btn-play-stop">

                  <div className="app-wraper__btn-play" onClick={() => { setPlayStopSwitch(true) }}>
                     <BtnPlay btnSwitch={playStopSwitch} />
                  </div>

                  <div className="app-wraper__btn-stop" onClick={() => { setPlayStopSwitch(false) }}>
                     <BtnStop btnSwitch={playStopSwitch} />
                  </div>
               </div>

               <div className='app-wraper__btn-volume' >
                  <BtnVolume />
               </div>
            </div>

            <div className="app-wraper__display">
               <EqualizerVisualizer playPauseSwitch={playStopSwitch} />
               <RadioDisplay />
               <Equlalizer playPauseSwitch={playStopSwitch} />
            </div>

            <div className='app-wraper__btn-tuning' >
               <BtnTuning />
            </div>
         </main>

         <RadioController playPauseSwitch={playStopSwitch} />

         {/* Подключаем список станций по умолчанию если они не выбранны пользователем */}
         {localStorage.length > 0 ? "" : <StationListsDefault />}

         {/* Комопнент воспроизведения звука, soundPower громкость в % до 100 */}
         <AudioController />
      </div >
   );
}

export default App;
