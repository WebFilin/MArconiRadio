// Начальный стетй
const defaultState = {
   isOpen: false,
}

// Открытие закрытие бургера
const OPEN_BURGER = "OPEN_BURGER"

export const isOpenBurger = (state = defaultState, action) => {
   switch (action.type) {

      case OPEN_BURGER:
         return { ...state, isOpen: state.isOpen = action.payload }

      default:
         return state
   }
}

// Функция креатер экшена redux
export const getOpenBurgerState = (payload) => ({ type: OPEN_BURGER, payload })
