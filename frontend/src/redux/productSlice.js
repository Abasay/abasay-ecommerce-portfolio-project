import { createSlice } from '@reduxjs/toolkit';
import { toastFunction } from '../utility/toastFunction';

const initialState = {
  productList: [],
  cartItem: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = [...action.payload.products];
      return state;
    },
    initialCart: (state, action) => {
      console.log(action);
      state.cartItem = [...action.payload];
      return state;
    },
    addCartItem: (state, action) => {
      if (action.payload?.length > 0) {
        const cartItem = action.payload.map((item) => {
          return { ...item, qty: 1, total: item.price };
        });

        state.cartItem = [...cartItem];
      } else {
        const check = state.cartItem.some(
          (el) => el._id === action.payload._id
        );
        if (check) {
          toastFunction('error', 'Item  already in Cart');
        } else {
          toastFunction('success', 'Item added successfully');
          const total = action.payload.price;
          state.cartItem = [
            ...state.cartItem,
            { ...action.payload, qty: 1, total: total },
          ];
        }
      }
    },
    deleteCartItem: (state, action) => {
      toastFunction('success', 'Item Deleted');
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setProducts,
  addCartItem,
  increaseQty,
  decreaseQty,
  deleteCartItem,
  initialCart,
} = productSlice.actions;

export default productSlice.reducer;
