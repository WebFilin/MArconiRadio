import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Усредненое значение силы звука
import { getEqualaizerAverage } from "../store/equlaizReduser";

function NewEqualizer({ audioObj, audioCtx }) {
  const dispatch = useDispatch();

  // вкл выкл аудио
  const playPauseSwitch = useSelector(
    (state) => state.urlAudioSourse.playPauseSwitch
  );

  // Передаем значение ползунков через redux для фильтров эквалайзера из equalizReduser
  let ranges = useSelector((state) => state.equalizer.rangeValueArr);

  //Глобальные переменные анализатора звука
  //   audioCtx получаем из AudioController
  const sourceNode = React.useRef();
  const analyser = React.useRef();

  // Управление requestAnimationFrame и рекруссией для volumePower
  const powerSoundFrameSwitch = React.useRef();

  React.useEffect(() => {
    if (audioCtx !== undefined && audioObj) {
      sourceNode.current = audioCtx.createMediaElementSource(audioObj);
      analyser.current = audioCtx.createAnalyser();
    }

    //   Отключаем аудиоконетекст - на всякий случай
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

      // Получаем усредненное значение частоты и передаем в визуализацию  через Redux equlaizReduser
      dispatch(getEqualaizerAverage(average));
    }

    //  Стартуем анализ звука
    if (playPauseSwitch) {
      analaizerAudio();
    } else {
      window.cancelAnimationFrame(powerSoundFrameSwitch.current);
    }
  }, [audioCtx, playPauseSwitch, dispatch]);

  React.useEffect(() => {}, []);

  // Создаем набор фильтров для эквалайзера
  React.useEffect(() => {
    // Получаем сформированные аудио обьект для эквалайзера
    let equlizerAudioObj = sourceNode.current;

    if (audioCtx && equlizerAudioObj) {
      // Фильтр и его параметры
      function filter(frequency) {
        let biquadFilter = audioCtx.createBiquadFilter();
        biquadFilter.type = "peaking"; // тип фильтра
        biquadFilter.frequency.value = frequency; // частота
        biquadFilter.Q.value = 1; // Q-factor
        biquadFilter.gain.value = 0;
        return biquadFilter;
      }

      // передаем частоты в фильтр эквалайзера
      function createFilters() {
        // Массив значений частот для фильра
        var frequencies = [
          60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000,
        ];

        // Подключаем фильтра последовательно
        let filters = frequencies.map(filter);

        filters.reduce((prev, curr) => {
          prev.connect(curr);
          return curr;
        });

        return filters;
      }

      // Получаем значение для фильтрации каждой полосы фильтра
      let filters = createFilters();

      // Управляем усилинием частот фильтра через ползунки эквалайзера
      // через isFinite убираем баг с типом значения с плавающией запятой и протяжкой ползунка вместо клика
      filters[0].gain.value = isFinite(ranges[0]) ? Number(ranges[0]) : 0;
      filters[1].gain.value = isFinite(ranges[1]) ? Number(ranges[1]) : 0;
      filters[2].gain.value = isFinite(ranges[2]) ? Number(ranges[2]) : 0;
      filters[3].gain.value = isFinite(ranges[3]) ? Number(ranges[3]) : 0;
      filters[4].gain.value = isFinite(ranges[4]) ? Number(ranges[4]) : 0;
      filters[5].gain.value = isFinite(ranges[5]) ? Number(ranges[5]) : 0;
      filters[6].gain.value = isFinite(ranges[6]) ? Number(ranges[6]) : 0;
      filters[7].gain.value = isFinite(ranges[7]) ? Number(ranges[7]) : 0;
      filters[8].gain.value = isFinite(ranges[8]) ? Number(ranges[8]) : 0;
      filters[9].gain.value = isFinite(ranges[9]) ? Number(ranges[9]) : 0;

      // источник цепляем к первому фильтру
      equlizerAudioObj.connect(filters[0]);

      // а последний фильтр - к выходу
      filters[filters.length - 1].connect(audioCtx.destination);

      return () => {
        equlizerAudioObj.disconnect(filters[0]);
        filters[filters.length - 1].disconnect(audioCtx.destination);
      };
    }
  }, [ranges, playPauseSwitch, audioCtx]);
  return <div></div>;
}

export default NewEqualizer;
