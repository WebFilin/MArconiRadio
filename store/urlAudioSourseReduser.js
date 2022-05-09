// Начальный стетй
const defaultState = {
   urlAudio: "",
   playPauseSwitch: false,
}

// Получаем ссылку на потоковое аудио
const ADD_SOURSE_URL_AUDIO = "ADD_SOURSE_URL_AUDIO"

// вкл выкл музыки
const ADD_PLAY_PAUSE_STATE = " ADD_PLAY_PAUSE_STATE"

export const urlAudioSourseReduser = (state = defaultState, action) => {
   switch (action.type) {

      case ADD_SOURSE_URL_AUDIO:

         return { ...state, urlAudio: state.urlAudio = action.payload }


      case ADD_PLAY_PAUSE_STATE:

         return { ...state, playPauseSwitch: state.playPauseSwitch = action.payload }

      default:
         return state
   }
}

// Функция креатер экшена redux
export const getUrlAudio = (payload) => ({ type: ADD_SOURSE_URL_AUDIO, payload })
export const getPlayPause = (payload) => ({ type: ADD_PLAY_PAUSE_STATE, payload })
