import React from 'react';

import "./btnPlayStop.css"

function BtnPlayStop({ isActiveElem, isActive}) {

   const btnPlay = <div className="items__btn-play-body"></div>

   const btnPause = <div className="items__btn-pause-body">
      <div className='items__btn-pause-body-elem'></div>
      <div className='items__btn-pause-body-elem'></div>
   </div>

   // Анимация загрузки аудио
   const btnLoadingAudio = <div className="search-stations__items-title-btn-loading">
      <div className="search-stations__items-title-btn-loading-elem"></div>
      <div className="search-stations__items-title-btn-loading-elem2"></div>
      <div className="search-stations__items-title-btn-loading-elem3"></div>
   </div>

   return (
      <div className="search-stations-items__btn-play-stop-wraper">
         {isActiveElem ? btnLoadingAudio : ""}

         <div className="items__btn-play-stop-body">
            {isActiveElem && isActive ? btnPause : btnPlay}
         </div>
      </div>
   );
}

export default BtnPlayStop;