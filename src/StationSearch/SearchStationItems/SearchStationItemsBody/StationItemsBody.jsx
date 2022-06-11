import React from 'react';

import "./searchStationBody.css"

import BtnTab from '../../Btn/BtnTab/BtnTab';

import WordCutUpHandler from '../../../SecondaryUtils/WordCutUpHandler';

function SearchStationBody({ radioStation }) {

   // открываем доп меню
   const [isVisible, setIsVisible] = React.useState(false)

   //Обрабатываем отсутвие данных
   const exceptionData = "--"

   // ссылка на страницу радио
   const styleHomepage = radioStation.homepage ? radioStation.homepage : exceptionData

   const languageTitle = radioStation.language ? radioStation.language : exceptionData

   const styleTitle = radioStation.tags ? radioStation.tags : exceptionData

   const countryTitle = radioStation.country ? radioStation.country : exceptionData

   const sityTitle = radioStation.state ? radioStation.state : exceptionData

   const musicCodec = radioStation.codec ? radioStation.codec : exceptionData

   const musicBitrate = radioStation.bitrate ? radioStation.bitrate : exceptionData

   return (
      <div className='search-stations__items-wraper'>

         {/*Добавляем разделитель между языками, заглавную букву */}
         <p className='search-stations__items-info search-stations__items-language'>
            Language: <WordCutUpHandler str={languageTitle} amount={0} spliterator={","} jumper={", "} />
         </p>

         {/*Добавляем разделитель между тегами, обрезаем количество */}
         <p className='search-stations__items-info search-stations__items-tags'>
            Style: <WordCutUpHandler str={styleTitle} amount={6} spliterator={","} jumper={", "} />
         </p>

         <div className="search-stations__items-footer">
            <div className="search-stations__items-btn-tab" onClick={() => setIsVisible(!isVisible)}>
               <BtnTab />
            </div>

            <div className="search-stations__items-votes">
               {radioStation.votes}
            </div>
         </div>

         {isVisible &&
            <div className="search-stations__items-tabs">
               <p className='search-stations__items-info search-stations__items-country'>
                  Country: {countryTitle}
               </p>

               <p className='search-stations__items-info search-stations__items-sity'>
                  Sity: {sityTitle}
               </p>

               <p className='search-stations__items-info search-stations__items-href'>
                  Homepage: <a href={radioStation.homepage}>{styleHomepage}</a>
               </p>

               <p className='search-stations__items-info search-stations__items-codec'>
                  Codec: {musicCodec} Bitrate: {musicBitrate}
               </p>
            </div >
         }

      </div >
   );
}

export default SearchStationBody;