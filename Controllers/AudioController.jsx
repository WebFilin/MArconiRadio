import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { getEqualaizerAudioObj } from "../store/equlaizReduser";

import { getVisualLoadState } from "../store/visualLoadAudio";

import NewEqualizer from "../Equalizer/NewEqualizer";

function AudioController() {
  // Сформированный обьект аудио
  const audioRef = React.useRef();
  let audioObj = audioRef.current;

  //  отключаем политику CORS
  if (audioObj) {
    audioObj.crossOrigin = "anonymous";
  }

  const audioContext = React.useRef();

//   Создаем один контекст аудио для всего приложения
  React.useEffect(() => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();
  }, []);

  // передаем обьект через redux
  const dispatch = useDispatch();

  // Уровень громокости из scrollReduser
  const soundLvl = useSelector((state) => state.volume.volume);

  // получаем источник аудио
  const urlAudio = useSelector((state) => state.urlAudioSourse.urlAudio);

  // вкл выкл аудио
  const playPauseSwitch = useSelector(
    (state) => state.urlAudioSourse.playPauseSwitch
  );

  //   Переменная для установки источника звука на странице
  const [audioSourse, setAudioSourse] = React.useState(null);

  // Получаем источник звука через urlAudioSourseReduser
  React.useEffect(() => {
    setAudioSourse(urlAudio);
  }, [urlAudio]);

  // Управление аудио
  React.useEffect(() => {
    // обработчик проигрывания звука
    function canPlay(obj) {
      // Старт воспроизведения по готовности

      obj.addEventListener("canplay", () => {
        if (playPauseSwitch) {
          obj.play();
        } else {
          obj.pause();
        }
      });

      let loadStart = () => {
        dispatch(getVisualLoadState(false));
      };

      let loadedData = () => {
        dispatch(getVisualLoadState(true));
      };

      if (playPauseSwitch === true) {
        // слушаем старт загрузки аудио
        obj.addEventListener("loadstart", loadStart);

        // слушаем окончание загрузки
        obj.addEventListener("loadeddata", loadedData);
      } else {
        obj.removeEventListener("loadstart", loadStart);
        obj.removeEventListener("loadeddata", loadedData);
      }
    }

    // Обработчик динамического изменения источника звука
    // Закрывает баг с прерыванием проигрывания и крашем приложения при смене url источника
    if (audioObj) {
      audioObj.pause();
      audioObj.load();
      canPlay(audioObj);
    }
  }, [playPauseSwitch, audioObj, dispatch, audioSourse, urlAudio]);

  // Управление громкостью
  React.useEffect(() => {
    if (audioObj) {
      if (soundLvl) {
        audioObj.volume = soundLvl / 10;
      }

      // Передаем аудио элемент в эквалайзер через redux и equlaizReduser
      dispatch(getEqualaizerAudioObj(audioObj));
    }
  }, [soundLvl, audioObj, dispatch]);

  return (
    <div>
      <audio ref={audioRef} type="audio/mpeg">
        <source src={audioSourse} />
      </audio>

      <NewEqualizer audioObj={audioObj} audioCtx = { audioContext.current} />
    </div>
  );
}

export default AudioController;
