import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search.ts';
import productsReducer from '../features/products.ts';
import modalReducer from '../features/modal.ts';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    search: searchReducer,
    products: productsReducer,
    modal: modalReducer
  },
});

export default store;