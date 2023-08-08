import { createSlice } from '@reduxjs/toolkit';
import { itemsData } from '../data/data';
import { ItemPropsType } from '../types';

const selectedProducts: ItemPropsType[] = []

const initialState = { itemsData, selectedProducts }

function convertFromProxy(arg: object | number) {
  return JSON.parse(JSON.stringify(arg));
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      // action.payload = { name, price, code, image, id }
      const product = action.payload;

      // Check if the product already exists. If it does then increment the counter
      const thatOneProduct = convertFromProxy(state.selectedProducts.find((singleProduct) => singleProduct.id === product.id) || {});

      const thatOneProductIndex = state.selectedProducts.findIndex(obj => obj.id === product.id);

      if (!(Object.keys(thatOneProduct).length === 0)) {
        convertFromProxy(state.selectedProducts[thatOneProductIndex].quantity++);
        return;
      }

      console.log("selected using scanner");

      console.log(product);

      state.selectedProducts.push(product);
    },
    increment: (state, action) => {
      const id = action.payload;

      const thatOneProductIndex = state.selectedProducts.findIndex(obj => obj.id === id);

      convertFromProxy(state.selectedProducts[thatOneProductIndex].quantity++);
    },
    decrement: (state, action) => {
      const id = action.payload;

      const thatOneProductIndex = state.selectedProducts.findIndex(obj => obj.id === id);

      if (state.selectedProducts[thatOneProductIndex].quantity === 1) {
        state.selectedProducts = state.selectedProducts.filter(product => product.id !== id);
        return;
      }

      convertFromProxy(state.selectedProducts[thatOneProductIndex].quantity--);
    },
    deleteProduct: (state, action) => {
      const id = action.payload;

      state.selectedProducts = state.selectedProducts.filter(product => product.id !== id);
      return;
    },
    clearAll: (state) => {
      state.selectedProducts = [];
    }
  }
});

// Can use search action to set search to something
export const { selectProduct, increment, decrement, deleteProduct, clearAll } = productSlice.actions;

export default productSlice.reducer;