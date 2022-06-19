import React from "react";

import "./btnZerroValueEqualilzer.css";

import { useSelector } from "react-redux";

function BtnZerroValueEqualilzer({ isDisabled }) {
  const arrValuesRange = useSelector((state) => state.equalizer.rangeValueArr);

  const [isActiveBtn, setIsActiveBtn] = React.useState(false);

  //   console.log(arrValuesRange);

  console.log(isDisabled);

  React.useEffect(() => {
    arrValuesRange.map((elem) => {
      if (Number(elem) !== 0) {
        setIsActiveBtn(true);
      }
      return null;
    });

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
