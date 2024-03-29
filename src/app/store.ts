import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import boardReducer from 'redux/features/boardSlice';
import favouriteReducer from 'redux/features/favouriteSlice';
import userReducer from 'redux/features/userSlice';

const rootReducer = combineReducers({
   user: userReducer,
   board: boardReducer,
   favourites: favouriteReducer,
});

export const store = configureStore({
   reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
