import React from 'react';

import "./stationItemsTitle.css"

import WordCutUpHandler from '../../../SecondaryUtils/WordCutUpHandler';

import badFavicon from "../../../img/icons/no-img-pictures.png"

function StationItemsTitle({ favicon, nameStation }) {

   //Обрабатываем отсутвие данных
   const exceptionData = "-"

   // Обработчик выводимого заголовка
   // Eсли пустое значение то выводим exceptionData
   const titleTxt = nameStation ? nameStation : exceptionData

   // Стили для иконки радио
   const styleFavicon = {
      background: `${favicon ? `url(${favicon})` : `url(${badFavicon})`}`,
      backgroundSize: "contain",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: "center center"
   }

   return (
      <div className='search-stations__items-title-body'>

         <div className="search-stations__items-title-img"
            style={styleFavicon}>
         </div>

         <h2 className='search-stations__items-title-txt' >
            <WordCutUpHandler str={titleTxt} amount={4} spliterator={" "} jumper={" "} />
         </h2>
      </div>
   );
}

export default StationItemsTitle;