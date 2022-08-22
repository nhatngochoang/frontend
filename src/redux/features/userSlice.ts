import { createSlice } from '@reduxjs/toolkit';

type UserState = {
   value: {
      _id: string;
      username: string;
      id: string;
   };
};

const initialState: UserState = {
   value: {
      _id: '',
      username: '',
      id: '',
   },
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.value = action.payload;
      },
   },
});

export const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
