// Начальный стейт
const defaultState = {
   stepPage: 0,
}

//Стейт для получения номера старницы и тд
const GET_STEP = "GET_STEP"

export const paginationReduser = (state = defaultState, action) => {

   switch (action.type) {
      case "GET_STEP":
         return { ...state, stepPage: state.stepPage = action.payload }

      default:
         return state
   }
}

export const getStep = (payload) => ({ type: GET_STEP, payload })
