import React from 'react';

import "./stationsDefaultUp.css"

import Station from '../Station/Station';

function StationsDefaultUp(props) {
   return (
      <div className="radio-display__station-wraper-up">
         <Station dot={false} min={2} max={5} contryName={"France"} />
         <Station dot={false} min={11} max={14} contryName={"America"} />
         <Station dot={false} min={20} max={22} contryName={"Japan"} />
         <Station dot={false} min={28} max={31} contryName={"Mongolia"} />
         <Station dot={false} min={37} max={40} contryName={"Andorra"} />
      </div>
   );
}

export default StationsDefaultUp;