import { CartItem } from "../oldPages/cart/store/cart.types";

export const calcSubTotal = (
  items: CartItem[],
  rentalLength: number
): number => {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total += items[i].quantity * items[i].rentalPrices[rentalLength];
  }

  return total;
};
