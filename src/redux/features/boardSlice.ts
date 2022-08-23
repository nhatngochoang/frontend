import { createSlice } from '@reduxjs/toolkit';
import { Board } from 'models';

export type BoardState = {
   value: Board[];
};

const initialState: BoardState = { value: [] };

export const boardSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setBoards: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { setBoards } = boardSlice.actions;
const boardReducer = boardSlice.reducer;
export default boardReducer;
