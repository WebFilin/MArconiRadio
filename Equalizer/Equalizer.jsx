import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import "./equalizer.css";

// Блок скролов эквалайзера
import EqualizerRangeHandlers from "./EqulizerRangeHandlers/EqualizerRangeHandlers";

// Усредненое значение силы звука
import { getEqualaizerAverage } from "../store/equlaizReduser";
import { useSelector } from "react-redux";

function Equalizer({ playPauseSwitch }) {
  const dispatch = useDispatch();

  // Передаем обьект аудио через redux из equalizReduser
  const audio = useSelector((state) => state.equalizer.equalaizAudioObj);
  //   Обнуляем политику источника
  audio.crossOrigin = "anonymous";

  // Передаем значение ползунков через redux для фильтров эквалайзера из equalizReduser
  let ranges = useSelector((state) => state.equalizer.rangeValueArr);

  //Глобальные переменные анализатора звука
  const audioContext = useRef();
  const audioSource = useRef();
  const analyser = useRef();

  // Управление requestAnimationFrame для getVolumeEcqualaiz
  const powerSoundFrameSwitch = useRef();

  // состояние открытия или закрытия бургера
  const isOpenBurger = useSelector((state) => state.isOpenBurger.isOpen);

  if (isOpenBurger) {
  }


  // Создаем инструменты анализа
  //   useEffect(() => {
  //     // Обходим баг при роутинге страниц и обеспечиваем кроссбраузерность
  //     // Создаем контекс аудио
  //     audioContext.current = new (window.AudioContext ||
  //       window.webkitAudioContext)();

  //     // Анализатор звука
  //     analyser.current = audioContext.current.createAnalyser();

  //     // Создаем аудиоузел по полученной ссылке из обьекта audio
  //     if (audio.children) {
  //       audioSource.current =
  //         audioContext.current.createMediaElementSource(audio);
  //     }

  //   }, [audio]);

  useEffect(() => {
    // Локальные переменные для узла звука, анализатора, массива значений и аудиоконекста
    let analyserAudio = analyser.current;
    let sourceAudio = audioSource.current;
    let audioCtx = audioContext.current;

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

    // Управление стартом и остановкой эквалайзера
    if (playPauseSwitch === true) {
      // analaizerAudio();
    } else {
      window.cancelAnimationFrame(powerSoundFrameSwitch.current);
    }
  }, [playPauseSwitch, dispatch, analyser, audioContext]);

  // Создаем набор фильтров для эквалайзера
  useEffect(() => {
    // Локальная переменная для аудиоконтекста фильтров эквалайзера
    let audioCtx = audioContext.current;

    // Получаем сформированные аудио обьект для эквалайзера
    let equlizerAudioObj = audioSource.current;

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
      function getFiltersAudio() {
        filters[0].gain.value = isFinite(ranges[0]);
        filters[1].gain.value = isFinite(ranges[1]);
        filters[2].gain.value = isFinite(ranges[2]);
        filters[3].gain.value = isFinite(ranges[3]);
        filters[4].gain.value = isFinite(ranges[4]);
        filters[5].gain.value = isFinite(ranges[5]);
        filters[6].gain.value = isFinite(ranges[6]);
        filters[7].gain.value = isFinite(ranges[7]);
        filters[8].gain.value = isFinite(ranges[8]);
        filters[9].gain.value = isFinite(ranges[9]);

        // источник цепляем к первому фильтру
        equlizerAudioObj.connect(filters[0]);

        // а последний фильтр - к выходу
        filters[filters.length - 1].connect(audioCtx.destination);
      }

      if (playPauseSwitch === true) {
        //   getFiltersAudio();
      }
    }
  }, [ranges, playPauseSwitch]);

  return (
    <div className="equalizer-wraper">
      <div className="equalizer__body">
        <EqualizerRangeHandlers />
      </div>
    </div>
  );
}

export default Equalizer;
