import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Редюсер станций
import { getStationParams } from "../../../store/stationReduser";

function StationListsDefault() {
  // Выбираем старну
  const [country, setCountry] = useState("GR");

  // Номер радиостанции
  const [numStation, setNumStation] = useState(2);

  // значение скрола из redux
  const valueScroll = useSelector((state) => state.tuning.tuning);

  // Получаем обьект радиостанции
  const dispatch = useDispatch();

  useEffect(() => {
    let stationParams = { land: country, station: numStation };

    if (valueScroll === 0) {
      setCountry("CA");
      setNumStation(3);
    } else if (valueScroll === 6) {
      setCountry("CH");
      setNumStation(0);
    } else if (valueScroll === 11) {
      setCountry("US");
      setNumStation(3);
    } else if (valueScroll === 15) {
      setCountry("DE");
      setNumStation(2);
    } else if (valueScroll === 21) {
      setCountry("JP");
      setNumStation(1);
    } else if (valueScroll === 24) {
      setCountry("IT");
      setNumStation(3);
    } else if (valueScroll === 30) {
      setCountry("AW");
      setNumStation(0);
    } else if (valueScroll === 35) {
      setCountry("NO");
      setNumStation(4);
    } else if (valueScroll === 39) {
      setCountry("MT");
      setNumStation(2);
    } else if (valueScroll === 43) {
      setCountry("ES");
      setNumStation(1);
    }

    dispatch(getStationParams(stationParams));
  }, [valueScroll, country, numStation, dispatch]);

  return <div></div>;
}

export default StationListsDefault;
