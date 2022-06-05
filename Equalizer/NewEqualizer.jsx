import React from "react";
import { useSelector } from "react-redux";

// Усредненое значение силы звука
import { getEqualaizerAverage } from "../store/equlaizReduser";

function NewEqualizer({ audioObj, audioCtx }) {
  // вкл выкл аудио
  const playPauseSwitch = useSelector(
    (state) => state.urlAudioSourse.playPauseSwitch
  );

  //Глобальные переменные анализатора звука
  //   audioCtx получаем из AudioController
  const sourceNode = React.useRef();
  const analyser = React.useRef();

  // Управление requestAnimationFrame и рекруссией для volumePower
  const powerSoundFrameSwitch = React.useRef();

  React.useEffect(() => {
    if (audioObj) {
      sourceNode.current = audioCtx.createMediaElementSource(audioObj);
      analyser.current = audioCtx.createAnalyser();
    }

    //  Отключаем аудиоконетекст - на всякий случай
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [audioCtx, audioObj]);

  React.useEffect(() => {
    // Локальные переменные для узла звука, анализатора, массива значений и аудиоконекста
    let analyserAudio = analyser.current;
    let sourceAudio = sourceNode.current;

    // Подключаем аназизатор звука
    function analaizerAudio() {
      // Проверка готовности аналайзера
      if (analyserAudio) {
        // Задаем усреднение волны
        analyserAudio.smoothingTimeConstant = 0.5;

        // Задаем количество блоков с частотой
        analyserAudio.fftSize = 128;

        // Подключаем его к анализатору частот
        sourceAudio.connect(analyserAudio);

        // вывод звука на колонки
        analyserAudio.connect(audioCtx.destination);

        // Когда анализатор готов запускаем общет мошности звука
        volumePower();
      }
    }

    // Получаем силу звука
    function volumePower() {
      // Запускаем рекруссию
      powerSoundFrameSwitch.current = requestAnimationFrame(volumePower);

      // Формируем бинарный массив и заполняем его данными частоты
      let arrAnalaizVolume = new Uint8Array(analyserAudio.frequencyBinCount);
      analyserAudio.getByteFrequencyData(arrAnalaizVolume);

      // Значение для записи расчетной частоты
      let valus = 0;

      // Усредненное значение частоты
      let average;

      // Ограничитель для цикла
      let length = arrAnalaizVolume.length;

      // Расчет усреднения для массива частот
      for (let i = 0; i < length; i++) {
        valus += arrAnalaizVolume[i];
      }

      // Средние значение частоты одного канала
      average = Math.floor(valus / length);

      console.log(average);
      // Получаем усредненное значение частоты и передаем в визуализацию  через Redux equlaizReduser
      // dispatch(getEqualaizerAverage(average));
    }

    //  Стартуем анализ звука
    if (playPauseSwitch) {
      analaizerAudio();
    } else {
      window.cancelAnimationFrame(powerSoundFrameSwitch.current);
    }
  }, [audioCtx, playPauseSwitch]);

  return <div></div>;
}

export default NewEqualizer;
