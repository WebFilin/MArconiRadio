import React from "react";

import "./btnAdd.css";

function BtnAdd({ idStations, isActive, localStorageTriger }) {
  // Флаг для передачи id в localStorage
  const [isActiveClic, setActiveClic] = React.useState(false);

  // Переключаем содержимое кнопки крестик галочка
  const [isActiveClicAnimo, setIsActiveClicAnimo] = React.useState(null);

  // Управление визуалом кнопок
  const btnDisabled = "search-stations__items-btn-add-disabled";

  const btnWraper = "search-stations__items-btn-add-wraper";

  // Отключаем / включаем кнопки на страницы
  // Управление от лимита станций в локал сторадж
  const [isDisabledBtn, setIsDisabledBtn] = React.useState(null);

  // Переключаем вид тела кнопки
  const [isWraperBtn, setIsWraperBtn] = React.useState(btnWraper);

  // Обрабатываем клик кнопки
  function handlerClick() {
    // Меняем состояние флага
    setActiveClic(!isActiveClic);

    if (isActiveClic) {
      localStorage.removeItem(idStations);
    }
  }

  React.useEffect(() => {
    const btnActive = (
      <div className="search-stations__btn-add-body-active"></div>
    );

    const btnDefault = (
      <div className="search-stations__items-btn-add-body-elem"></div>
    );

    const btnBodyDisabled = (
      <div className="search-stations__items-btn-add-body-disabled"></div>
    );

    // Добавляем, удаляем элемент из localStorage
    if (localStorage.getItem(idStations)) {
      setActiveClic(true);
    }

    // Добавляем станции в stationsList
    function setLocalStorage() {
      if (isActiveClic) {
        localStorage.setItem(idStations, idStations);
      }
    }

    // Меняем визуал кнопки от наличия элемента в localStorage
    // Визуал отключения
    function changeBtn() {
      if (idStations === localStorage.getItem(idStations)) {
        setIsActiveClicAnimo(btnActive);
        setIsWraperBtn(btnWraper);
      } else if (isActive) {
        setIsActiveClicAnimo(btnBodyDisabled);
        setIsWraperBtn(btnDisabled);
      } else {
        setIsActiveClicAnimo(btnDefault);
        setIsWraperBtn(btnWraper);
      }
    }

    setLocalStorage();
    changeBtn();
  }, [idStations, isActiveClic, isActive, isDisabledBtn]);

  // Состояние кнопок при загрузке страницы
  React.useEffect(() => {
    setIsDisabledBtn(isActive);
  }, [isActive]);

  // Если айди в сторадж то разблокируем кнопку
  // Если элементов меньше лимита - разблокируем все кнопки
  // через  localStorageTriger из StationSearch
  React.useEffect(() => {
    if (idStations === localStorage.getItem(idStations)) {
      setIsDisabledBtn(false);
    }

    localStorageTriger();
  }, [idStations, localStorageTriger]);

  return (
    <div className={isWraperBtn}>
      <button
        disabled={isDisabledBtn}
        className="search-stations__items-btn-add-body"
        onClick={handlerClick}
      >
        {isActiveClicAnimo}
      </button>
    </div>
  );
}

export default BtnAdd;
