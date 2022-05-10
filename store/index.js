import { combineReducers, createStore } from "redux"

import { scrollReduser } from "./scrollReduser"

import { stationParams } from "./stationReduser"

import { equlaizReduser } from "./equlaizReduser"

import { visualLoadAudio } from "./visualLoadAudio"

import { searchInputsValue } from "./searchImputsValueReduser"

import { paginationReduser } from "./paginationReduser"

import { totalStationInPage } from "./totalStationInPage"

import { localStorageLength } from "./localStorageLength"

import { urlAudioSourseReduser } from "./urlAudioSourseReduser"

import { isBurgerOpen } from "./isBurgerOpen"

const rootReducer = combineReducers({
   tuning: scrollReduser,
   volume: scrollReduser,
   stationParams: stationParams,
   equalizer: equlaizReduser,
   visualLoad: visualLoadAudio,
   valueSearch: searchInputsValue,
   valuePagination: paginationReduser,
   totalStationInPage: totalStationInPage,
   localStorageInLength: localStorageLength,
   urlAudioSourse: urlAudioSourseReduser,
   burgerOpen: isBurgerOpen,
})

const store = createStore(rootReducer)

export default store