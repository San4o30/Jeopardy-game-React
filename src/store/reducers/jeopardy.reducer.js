import { createSlice } from "@reduxjs/toolkit";


const jeopardySlice = createSlice({
  name: 'jeopardy',
  initialState: {
    categories: [],
    currentGame: {
      user: '',
      points: 0,
      correct: 0,
      incorrect: 0,
      attemps: 0,
      clock: [],
      clockEnd: [],
    },
    history: [],
    answer: false,
    clues: [],
    currentClue: null
  },
  reducers: {
    setUserName: (state, action) => {
      state.currentGame.user = action.payload
    },
    setCurrentClue: (state, action) => {
      state.currentClue = action.payload
    },
    setClues: (state, action) => {
      const item = action.payload.map(res => {
        return res.clues.map(res => {
          return {
            ...res,
            right: null,
          }
        })
      });
      state.categories = action.payload.map(res => {
        return res.title;
      })
      state.clues = item;
    },
    resetClues: (state) => {
      const item = state.clues.map(res => {
        return res.map(res => {
          return {
            ...res,
            right:null
          }
        })
      })
      state.clues = item
    },
    colorChanger: (state, action) => {
      state.clues.forEach((item) => {
        item.forEach((i) => {
          if (i.id === state.currentClue) {
            i.right = action.payload;
          }
        })
      })
    },
    clearCluesStatus: (state) => {
      state.clues.forEach((item) => {
        item.forEach((i) => {
          i.right = null;
        })
      })
    },
    corrects: (state, action) => {
      state.currentGame.correct = state.currentGame.correct + 1;
      state.currentGame.attemps = state.currentGame.attemps + 1;
      state.currentGame.points += action.payload;
    },
    incorrects: (state, action) => {
      state.currentGame.incorrect = state.currentGame.incorrect + 1;
      state.currentGame.attemps = state.currentGame.attemps + 1;
      state.currentGame.points -= action.payload;
    },
    setClock: (state, action) => {
      state.currentGame.clock.push(action.payload)
    },
    setClockEnd: (state, action) => {
      state.currentGame.clockEnd.push(action.payload)
    },
    startGame: (state, action) => {
      state.game.push(action.payload);
    },
    endGame: (state) => {
      state.history.push(state.currentGame)
    },
    clearCurrentGame: (state) => {
      state.currentGame = {
        points: 0,
        correct: 0,
        incorrect: 0,
        attemps: 0,
        clock: [],
        clockEnd: [],
      }
    },
    changeGameStatus: (state, action) => {
      state.answer = action.payload;
    },
    cleanHistory: (state) => {
      state.history = []
    },

  }

})
export const {
  setUserName,
  getClues,
  setClues,
  setCurrentClue,
  cleanHistory,
  endGame,
  corrects,
  incorrects,
  setClock,
  setClockEnd,
  clearCurrentGame,
  changeGameStatus,
  colorChanger,
  clearCluesStatus,
  resetClues
} = jeopardySlice.actions
export default jeopardySlice.reducer;