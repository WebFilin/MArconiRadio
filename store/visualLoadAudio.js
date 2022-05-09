// Начальный стейт
const defaultState = {
   switchProgresBar: {}
}

//Получаем логическое значение для включения визуализации загрузки из RadioController
const GET_STATE = "GET_STATE"

export const visualLoadAudio = (state = defaultState, action) => {

   switch (action.type) {
      case "GET_STATE":

         // console.log(state.switchProgresBar)
         return { ...state, switchProgresBar: state.switchProgresBar = action.payload }

      default:
         return state
   }
}

export const getVisualLoadState = (payload) => ({ type: GET_STATE, payload })