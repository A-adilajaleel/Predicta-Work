import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sessions: [],
  loading: false,
  error: null,
}

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSessions: (state, action) => {
      state.sessions = action.payload
    },
    addSession: (state, action) => {
      state.sessions.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setSessions, addSession, setLoading, setError } = sessionSlice.actions
export default sessionSlice.reducer