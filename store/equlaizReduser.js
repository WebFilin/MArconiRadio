// Начальный стетй
const defaultState = {
   average: 0,
   rangeValueArr: [],
   equalaizAudioObj: {},
   equalaizRangeParams: {}
}

// Значения частоты,громкости и обьект аудио
const ADD_AVERAGE = " ADD_AVERAGE"
const ADD_RANGE_ARR = "ADD_RANGE_ARR"
const GET_AUDIO_OBJ = "GET_AUDIO_OBJ"

// Получаем значение скрола из ScrollControlers
export const equlaizReduser = (state = defaultState, action) => {
   switch (action.type) {
      // Усредненое значение частоты аудио
      case ADD_AVERAGE:
         // console.log(state.average)
         return { ...state, average: state.average = action.payload }

      // массив значений ползунков эквалайзера
      case ADD_RANGE_ARR:
         // console.log(state.rangeValueArr)
         return { ...state, rangeValueArr: state.rangeValueArr = action.payload }

      // Получаем сформированный из get запроса в radioController обьект аудио
      case GET_AUDIO_OBJ:
         // console.log(state.equalaizAudioObj)
         return { ...state, equalaizAudioObj: state.equalaizAudioObj = action.payload }

      default:
         return state
   }
}

// Функция-криэйтер экшена redux
export const getEqualaizerAverage = (payload) => ({ type: ADD_AVERAGE, payload })
export const getEqualaizerRangesArr = (payload) => ({ type: ADD_RANGE_ARR, payload })
export const getEqualaizerAudioObj = (payload) => ({ type: GET_AUDIO_OBJ, payload })

