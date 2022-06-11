// Начальный стейт
const defaultState = {
   totalStations: 9
}

//Стейт для получения параметров радиостанции для get запроса из stationLists
const GET_AMAUNT_STATIONS = "GET_AMAUNT_STATIONS"

export const totalStationInPage = (state = defaultState, action) => {

   switch (action.type) {
      case "GET_AMAUNT_STATIONS":

         return { ...state, totalStations: state.totalStations = action.payload }

      default:
         return state
   }
}

export const getAmountStations = (payload) => ({ type: GET_AMAUNT_STATIONS, payload })