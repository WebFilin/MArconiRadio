import React from 'react';

import "./stationsDefaultList.css"

import Station from '../Station/Station';

function StationsDefaultUp(props) {
   return (

      <div className='default-stations-lists__wraper'>

         <div className="default-stations__wraper-up">
            <Station dot={false} min={2} max={5} contryName={"France"} />
            <Station dot={false} min={11} max={14} contryName={"America"} />
            <Station dot={false} min={20} max={22} contryName={"Japan"} />
            <Station dot={false} min={28} max={31} contryName={"Mongolia"} />
            <Station dot={false} min={37} max={40} contryName={"Andorra"} />
         </div>

         <div className="default-stations__wraper-down">
            <Station dot={true} min={6} max={10} contryName={"Switzerland"} />
            <Station dot={true} min={15} max={18} contryName={"Germany"} />
            <Station dot={true} min={25} max={27} contryName={"Italy"} />
            <Station dot={true} min={32} max={36} contryName={"Czechia"} />
            <Station dot={true} min={41} max={45} contryName={"Panama"} />
         </div>

      </div>
   );
}

export default StationsDefaultUp;