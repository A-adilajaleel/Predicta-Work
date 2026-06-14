import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'focus',
  timeLeft: 25 * 60,
  isRunning: false,
  sessions: 0,
  burnoutWarning: false,
  totalFocusMinutes: 0,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState,

  reducers: {

    setMode: (state, action) => {
      state.mode = action.payload
    },

    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload
    },

    setIsRunning: (state, action) => {
      state.isRunning = action.payload
    },

    setSessions: (state, action) => {
      state.sessions = action.payload
    },

    setBurnoutWarning: (state, action) => {
      state.burnoutWarning = action.payload
    },

    setTotalFocusMinutes: (state, action) => {
      state.totalFocusMinutes = action.payload
    },

  },
})

export const {
  setMode,
  setTimeLeft,
  setIsRunning,
  setSessions,
  setBurnoutWarning,
  setTotalFocusMinutes,
} = timerSlice.actions

export default timerSlice.reducer