// Начальный стейт
const defaultState = {
   totalLenght: 0
}

//Стейт для получения параметров радиостанции для get запроса из stationLists
const GET_LOCAL_STORAGE_LENGHT = "GET_LOCAL_STORAGE_LENGHT"

export const localStorageLength = (state = defaultState, action) => {

   switch (action.type) {
      case "GET_LOCAL_STORAGE_LENGHT":

         return { ...state, totalLenght: state.totalLenght = action.payload }

      default:
         return state
   }
}

export const getlocalStorageLength = (payload) => ({ type: GET_LOCAL_STORAGE_LENGHT, payload })