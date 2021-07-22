import React from "react";
import styled from "@emotion/styled";

import CartProduct from "./CartProduct";
import { SHADES } from "../../../ui/variables";
import { isItemUnavailable } from "../store/cart.utils";
import { CartItem, ProductIdentifiers } from "../store/cart.types";

const CartPageProductsList = styled.div`
  max-width: 1112px;
  width: 100%;
  border-top: 1px solid ${SHADES.SHADE_LIGHTER};
  flex: 1;
`;

export interface Props {
  products: CartItem[];
  isMobileBreakpoint: boolean;
  unavailableItems: ProductIdentifiers[];
}

const CartProductsList = ({
  products,
  unavailableItems,
  isMobileBreakpoint,
}: Props) => (
  <CartPageProductsList>
    {products.map((product: CartItem, index: number) => {
      return (
        <CartProduct
          key={index}
          product={product}
          isMobileBreakpoint={isMobileBreakpoint}
          isItemUnavailable={isItemUnavailable(product, unavailableItems)}
        />
      );
    })}
  </CartPageProductsList>
);

export default CartProductsList;
