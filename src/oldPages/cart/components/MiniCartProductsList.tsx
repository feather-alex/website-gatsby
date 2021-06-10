/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { ItemUnavailableError } from '../../checkout/store/checkout.types';
import MiniCartProduct from './MiniCartProduct';
import { CartItem, ProductIdentifiers } from '../store/cart.types';
import { isItemUnavailable } from '../store/cart.utils';
import React from 'react';
import { MARGINS, SHADES } from '../../../ui/variables';
import { Z_INDICIES } from '../../../ui/zIndicies';

export interface Props {
  products: CartItem[];
  closeCart?: () => void;
  itemsErrors?: ItemUnavailableError[];
  rentalLength: number | null;
  unavailableProducts: ProductIdentifiers[];
  isMobileBreakpoint: boolean;
  inCheckout?: boolean;
}

interface State {
  expandItems: boolean;
}

class MiniCartProductsList extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    expandItems: false
  };

  handleItemExpansion = () => {
    this.setState((prevState) => ({ expandItems: !prevState.expandItems }));
  };

  render() {
    const {
      products,
      closeCart,
      itemsErrors,
      rentalLength,
      unavailableProducts,
      inCheckout = false,
      isMobileBreakpoint
    } = this.props;

    // TODO: we need to update these non-brand colors (#ececec) when we come back to componentize Checkout
    return (
      <div
        css={css`
          background-color: ${SHADES.WHITE};
          overflow-y: scroll;
          height: 100%;
          ${inCheckout
            ? `
            // Checkout Order Summary:
            padding: ${isMobileBreakpoint ? `20px ${MARGINS.MOBILE}` : '20px 50px 50px'};
            ${!isMobileBreakpoint && `border-left: 1px solid #ececec`};
            `
            : `
            // Mini Cart:
            padding: ${isMobileBreakpoint ? `40px ${MARGINS.MOBILE}` : '22px 50px 0'};
            width: ${isMobileBreakpoint ? 100 : 50}vw;
            z-index: ${Z_INDICIES.MINI_CART_PRODUCT_LIST};
            ${!isMobileBreakpoint && `border-left: 1px solid #ececec; border-top: 1px solid #ececec;`}
            `}
        `}
      >
        {products.map((product: CartItem, index: number) => (
          <MiniCartProduct
            key={index}
            product={product}
            rentalLength={rentalLength}
            itemsErrors={itemsErrors}
            closeCart={closeCart}
            inCheckout={inCheckout}
            isItemUnavailable={isItemUnavailable(product, unavailableProducts)}
          />
        ))}
      </div>
    );
  }
}

export default MiniCartProductsList;
