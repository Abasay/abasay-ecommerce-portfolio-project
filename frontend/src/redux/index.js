import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import productSliceReducer from './productSlice';
import { Tuple } from '@reduxjs/toolkit';
import headerSliceReducer from './headerSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    products: productSliceReducer,
    header: headerSliceReducer,

    middleware: () => new Tuple(),
  },
});
