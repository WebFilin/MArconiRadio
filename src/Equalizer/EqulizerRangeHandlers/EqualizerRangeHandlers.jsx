import React, { useState } from "react";

import "./equalizerRangeHandlers.css";

import { useDispatch } from "react-redux";

// Ползунок эквалайзера
import EqualizerRanges from "../../Buttons/EqulaizerRange/EqulaizerRanges";

// Компонент для шкал ползунков - чистый визуал
import EqualizerScaleRange from "../EqualizerScaleRange/EqualizerScaleRange";

// Передаем значение полей ползунков эквалайзера и их параметры в redux
import { getEqualaizerRangesArr } from "../../store/equlaizReduser";

import BtnZerroValueEqualilzer from "../../Buttons/BtnZerroValueEqualilzer/BtnZerroValueEqualilzer";

function EqualizerRangeHandlers() {
  const dispatch = useDispatch();

  // Параметры ползунков эквалайзера
  let rangesParams = {
    minWave: -20,
    maxWave: 20,
    step: 1,
    defaultValue: 0,
    CoefficientValueDec: 30,
    CoefficientValueInc: 40,
    ColorDec: "var( --neon-color-active-elem)",
    ColorInc: "var( --range-background)",
  };

  // Получаем значение из скролов эквалайзера
  const [range60, setRange60] = useState(0);
  const [range170, setRange170] = useState(0);
  const [range310, setRange310] = useState(0);
  const [range600, setRange600] = useState(0);
  const [range1000, setRange1000] = useState(0);
  const [range3000, setRange3000] = useState(0);
  const [range6000, setRange6000] = useState(0);
  const [range12000, setRange12000] = useState(0);
  const [range14000, setRange14000] = useState(0);
  const [range16000, setRange16000] = useState(0);

  //   Сбрасываем value range в 0
  const [rangeValueZerro, setRangeValueZerro] = React.useState(false);

  // Передаем значение полей ползунков эквалайзера в redux
  React.useEffect(() => {
    const arrRangesValue = [
      range60,
      range170,
      range310,
      range600,
      range1000,
      range3000,
      range6000,
      range12000,
      range14000,
      range16000,
    ];

    dispatch(getEqualaizerRangesArr(arrRangesValue));
  }, [
    dispatch,
    range60,
    range170,
    range310,
    range600,
    range1000,
    range3000,
    range6000,
    range12000,
    range14000,
    range16000,
  ]);

  //   Функция для обнуления ползунков эквалайзера
  function rangeValuesZerro() {
    //  Визуальное обнуление ползунков
    setRangeValueZerro(true);

    //  Обнуление фильтров эквалайзера
    setRange60(0);
    setRange170(0);
    setRange310(0);
    setRange600(0);
    setRange1000(0);
    setRange3000(0);
    setRange6000(0);
    setRange12000(0);
    setRange14000(0);
    setRange16000(0);
  }

  return (
    <div className="equlizer-handlers__wraper">
      <div className="equlizer-handlers__body">
        <EqualizerScaleRange high={20} middle={0} low={"-20"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange60(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"60"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange170(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"170"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange310(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"310"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange600(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"600"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange1000(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"1K"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange3000(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"3K"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange6000(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"6K"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange12000(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"12K"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange14000(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"14K"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>

        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
        <div
          className="equlizer-handlers__element"
          onChange={(elem) => {
            setRangeValueZerro(false);
            setRange16000(elem.target.value);
          }}
        >
          <EqualizerRanges
            waveRange={"16K"}
            params={rangesParams}
            valueZerro={rangeValueZerro}
          />
        </div>
        <EqualizerScaleRange high={"-"} middle={"-"} low={"-"} />
      </div>

      <div className="equlizer-handlers__btn-zerro" onClick={rangeValuesZerro}>
        <BtnZerroValueEqualilzer isDisabled={rangeValueZerro} />
      </div>
    </div>
  );
}

export default EqualizerRangeHandlers;
