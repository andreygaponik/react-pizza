import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  products: CartItemType[];
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  products: cartData.products,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItemType>) => {
      const findProductId = state.products.find((obj) => obj.id === action.payload.id);

      if (findProductId) {
        findProductId.count++;
      } else {
        state.products = [
          ...state.products,
          {
            ...action.payload,
            count: 1,
          },
        ];
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    minusProduct: (state, action: PayloadAction<string>) => {
      const findProductId = state.products.find((obj) => obj.id === action.payload);

      if (findProductId) {
        findProductId.count--;

        state.totalPrice -= findProductId.price;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const findProductId = state.products.find((obj) => obj.id === action.payload);

      state.products = state.products.filter((obj) => obj.id !== action.payload);

      if (findProductId) {
        state.totalPrice -= findProductId.price * findProductId.count;
      }
    },
    clearProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addProduct, removeProduct, clearProducts, minusProduct } = cartSlice.actions;

export default cartSlice.reducer;
