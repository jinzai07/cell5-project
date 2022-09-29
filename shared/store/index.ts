import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import plantsReducer from './slices/plant.slice';

export const store = configureStore({
  reducer: {
    plants: plantsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;
