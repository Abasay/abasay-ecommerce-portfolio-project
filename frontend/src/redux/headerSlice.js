import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeHeaderRedux: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { changeHeaderRedux } = headerSlice.actions;

export default headerSlice.reducer;
