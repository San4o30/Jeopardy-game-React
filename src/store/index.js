import { configureStore } from '@reduxjs/toolkit'
import jeopardyReducer from './reducers/jeopardy.reducer'

export const store = configureStore({
  reducer: {
    jeopardy: jeopardyReducer,
  }
})
