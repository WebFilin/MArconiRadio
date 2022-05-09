// Начальный стейт
const defaultState = {
   station: {}
}

//Стейт для получения параметров радиостанции для get запроса из stationLists
const GET_PARAM_STATION = "GET_PARAM_STATION"

export const stationParams = (state = defaultState, action) => {

   switch (action.type) {
      case "GET_PARAM_STATION":
         return { ...state, station: state.station = action.payload }

      default:
         return state
   }
}

export const getStationParams = (payload) => ({ type: GET_PARAM_STATION, payload })