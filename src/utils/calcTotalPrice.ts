import { CartItemType } from '../redux/slices/cartSlice';

export const calcTotalPrice = (products: CartItemType[]) => {
  return products.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
