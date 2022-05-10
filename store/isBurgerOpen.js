// Начальный стетй
const defaultState = {
   isOpen: ""
}

const ADD_OPEN_BURGER = "ADD_OPEN_BURGER"

// Получаем значение скрола из ScrollControlers
export const isBurgerOpen = (state = defaultState, action) => {
   switch (action.type) {

      case ADD_OPEN_BURGER:
         return { ...state, isOpen: state.isOpen = action.payload }

      default:
         return state
   }
}

// Функция креатер экшена redux
export const getBurgerOpenState = (payload) => ({ type: ADD_OPEN_BURGER, payload })