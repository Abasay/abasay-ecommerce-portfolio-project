import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);
      state.productList = [...action.payload.products];
      return state;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
