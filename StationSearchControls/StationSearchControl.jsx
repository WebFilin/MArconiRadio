import React from 'react';

import "./stationSearchControl.css"

import StationSearch from '../StationSearch/StationSearch';

import SearchForms from "../StationSearchControls/SearchForms/SearchForms";

import Pagination from "../StationSearchControls/Pagination/Pagination"

import LimitDrowStationPage from '../StationSearchControls/LimitDrowStationPage/LimitDrowStationPage';

import SwitchSortItems from '../StationSearchControls/SearchForms/SwitchSortItems/SwitchSortItems';

function StationSearchControl() {

   // Обработчик для сортировки станций по рейтингу
   const [voitsCheck, setVoitsCheck] = React.useState(false)

   return (
      <div className='station__control-wraper'>

         <div className="station__control-navigations">
            <SearchForms />

            <div className="station__control-navigations-items-amount">
               <LimitDrowStationPage title="Output" />

               <div className="station__control-navigations-items-amount-voits-wraper"
                  onChange={() => { setVoitsCheck(!voitsCheck) }}>
                  <SwitchSortItems title={"Rating"} />
               </div>
            </div>
            <Pagination />
         </div>

         <StationSearch isRating={voitsCheck} />
      </div >
   );
}

export default StationSearchControl;