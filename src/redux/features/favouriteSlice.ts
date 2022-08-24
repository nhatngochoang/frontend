import { createSlice } from '@reduxjs/toolkit';
import { BoardState } from './boardSlice';

const initialState: BoardState = { value: [] };

export const favouriteSlice = createSlice({
   name: 'favourites',
   initialState,
   reducers: {
      setFavouriteList: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { setFavouriteList } = favouriteSlice.actions;
const favouriteReducer = favouriteSlice.reducer;
export default favouriteReducer;
