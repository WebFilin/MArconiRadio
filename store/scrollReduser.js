// Начальный стетй
const defaultState = {
   tuning: 0,
   volume: 1
}

// Значения частоты и громкости
const ADD_TUNING = "ADD_TUNING"
const ADD_VOLUME = "ADD_VOLUME"

// Получаем значение скрола из ScrollControlers
export const scrollReduser = (state = defaultState, action) => {
   switch (action.type) {

      case ADD_TUNING:
         // console.log("tuningReduser " + state.tuning)
         return { ...state, tuning: state.tuning = action.payload }

      case ADD_VOLUME:
         // console.log("volumeReduser " + state.volume)
         return { ...state, volume: state.volume = action.payload }

      default:
         return state
   }
}

// Функция креатер экшена redux
export const getValueTuning = (payload) => ({ type: ADD_TUNING, payload })
export const getValueVolume = (payload) => ({ type: ADD_VOLUME, payload })

