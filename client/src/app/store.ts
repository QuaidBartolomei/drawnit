import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import roomReducer from 'features/roomSlice'

export const store = configureStore({
  reducer: {
    counter: roomReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
