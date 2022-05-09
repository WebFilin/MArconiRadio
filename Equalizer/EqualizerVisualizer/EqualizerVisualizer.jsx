import React from 'react';

import "./equalizerVisualizer.css"

// Бары ползунков эквалайзера
import RangeBars from '../../RangeBars/RangeBars';

import EqulizerPowerSound from "../EqulizerPowerSound/EqulizerPowerSound"
import { useSelector } from 'react-redux';

function EqualizerVisualizer({ playPauseSwitch }) {

   // Передаем значение ползунков через redux для фильтров эквалайзера из equalizReduser
   let rangesValue = useSelector(state => state.equalizer.rangeValueArr)

   return (
      <div>
         <div className="equalizer-visual__wraper" >

            <div className="equalizer-visual__body">

               <div className="equalizer-visual__body-wraper-sound-power">
                  <EqulizerPowerSound playPauseSwitch={playPauseSwitch} />
               </div>

               <div className="equalizer-visual__body-bars-wraper">
                  <RangeBars rangesValue={rangesValue[0]} />
                  <RangeBars rangesValue={rangesValue[1]} />
                  <RangeBars rangesValue={rangesValue[2]} />
                  <RangeBars rangesValue={rangesValue[3]} />
                  <RangeBars rangesValue={rangesValue[4]} />
                  <RangeBars rangesValue={rangesValue[5]} />
                  <RangeBars rangesValue={rangesValue[6]} />
                  <RangeBars rangesValue={rangesValue[7]} />
                  <RangeBars rangesValue={rangesValue[8]} />
                  <RangeBars rangesValue={rangesValue[9]} />
               </div>

            </div>
         </div>
      </div>
   );
}

export default EqualizerVisualizer;