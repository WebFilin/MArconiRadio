import React from "react";

import "./btnZerroValueEqualilzer.css";

import { useSelector } from "react-redux";

function BtnZerroValueEqualilzer({ isDisabled }) {
  // Получаем массив значений полузнков эквалайзера
  const arrValuesRange = useSelector((state) => state.equalizer.rangeValueArr);

  //   Отключаем включаем кнопку
  const [isActiveBtn, setIsActiveBtn] = React.useState(false);

  React.useEffect(() => {
    // Если ползунок был сдвинут кнопка сброса активируется
    arrValuesRange.map((elem) => {
      if (Number(elem) !== 0) {
        setIsActiveBtn(true);
      }
      return null;
    });

    //  Переключаем состояние кнопки
    if (isDisabled) {
      setIsActiveBtn(false);
    }
  }, [arrValuesRange, isDisabled]);

  return (
    <div className="equlizer-btn__zerro-wrapper">
      <div
        className={
          isActiveBtn
            ? "equlizer-btn__zerro-body_active"
            : "equlizer-btn__zerro-body"
        }
      ></div>
      <span className="equlizer-btn__zerro-title">reset equalizer</span>
    </div>
  );
}

export default BtnZerroValueEqualilzer;
