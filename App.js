import React from "react";

// Локлаьные для компонента App
import "./app.css";

// Глобальные css переменные
import "./variables/variables.css";

import { useSelector } from "react-redux";

import { Routes, useNavigate, Route } from "react-router-dom";

import MainLayout from "./MainLayout/MainLayout";

import MenuBurger from "./MenuBurger/MenuBurger";

import AudioController from "./Controllers/AudioController";

function App() {
  // состояние открытия или закрытия бургера
  const isOpenBurger = useSelector((state) => state.isOpenBurger.isOpen);

  //   Используем навигацию из роутинга
  const navigate = useNavigate();

  //   Принудительный роутинг на корневой элемент приложения
  React.useEffect(() => {
    if (!isOpenBurger) {
      return navigate("/");
    }
  }, [isOpenBurger, navigate]);

  return (
    <div className="app-wraper">
      <nav className="app-wraper__menu-burger">
        <MenuBurger />
      </nav>

      {/* Вставляем главный интерфейс приложения */}
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>

      {/* Комопнент воспроизведения звука, soundPower громкость в % до 100 */}
      <AudioController />
    </div>
  );
}

export default App;
