import React from "react";
import { useSelector } from "react-redux";

// Усредненое значение силы звука
import { getEqualaizerAverage } from "../store/equlaizReduser";

function NewEqualizer({ audioObj }) {
  // вкл выкл аудио
  const playPauseSwitch = useSelector(
    (state) => state.urlAudioSourse.playPauseSwitch
  );

//   audioObj.crossOrigin = "anonymous";

  console.log(audioObj);
  return <div></div>;
}

export default NewEqualizer;
