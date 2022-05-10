import React from 'react';

import "./stationsDefaultDown.css"

import Station from '../Station/Station';

function StationsDefaultDown(props) {
   return (
      <>
         <Station dot={true} min={6} max={10} contryName={"Switzerland"} />
         <Station dot={true} min={15} max={18} contryName={"Germany"} />
         <Station dot={true} min={25} max={27} contryName={"Italy"} />
         <Station dot={true} min={32} max={36} contryName={"Czechia"} />
         <Station dot={true} min={41} max={45} contryName={"Panama"} />
      </>
   );
}

export default StationsDefaultDown;