import { configureStore } from '@reduxjs/toolkit'
import navSlice from './slices/navSlice'
export const store = configureStore({
  reducer: navSlice
})

