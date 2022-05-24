// Начальный стетй
const defaultState = {
   isOpen: false,
}

// Значения частоты и громкости
const OPEN_BURGER = "ADD_TUNING"

// Получаем значение скрола из ScrollControlers
export const isOpenBurger = (state = defaultState, action) => {
   switch (action.type) {

      case OPEN_BURGER:
         // console.log("tuningReduser " + state.tuning)
         return { ...state, open: state.isOpen = action.payload }

      default:
         return state
   }
}

// Функция креатер экшена redux
export const getOpenBurgerState = (payload) => ({ type: OPEN_BURGER, payload })
