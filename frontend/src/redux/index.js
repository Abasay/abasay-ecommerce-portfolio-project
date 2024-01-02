import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import productSliceReducer from './productSlice';
import { Tuple } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    products: productSliceReducer,

    middleware: () => new Tuple(),
  },
});
