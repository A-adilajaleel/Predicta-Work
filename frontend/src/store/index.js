import { configureStore } from "@reduxjs/toolkit";

import authReducer from './authSlice'
import taskReducer from './taskSlice'
import sessionReducer from './sessionSlice'
import timerReducer from './timerSlice'

export const store = configureStore({
 reducer: {
  auth: authReducer,
  tasks: taskReducer,
  session: sessionReducer,
  timer: timerReducer,
}
})

export default store