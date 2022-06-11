// Начальный стетй
const defaultState = {
   valueInput: ""
}

const ADD_VALUE_SEARCH = "ADD_VALUE_SEARCH"

export const searchInputsValue = (state = defaultState, action) => {
   switch (action.type) {

      case ADD_VALUE_SEARCH:
         return { ...state, valueInput: state.valueInput = action.payload }

      default:
         return state
   }
}

// Функция креатер экшена redux
export const getValueSearch = (payload) => ({ type: ADD_VALUE_SEARCH, payload })
