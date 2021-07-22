/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { ItemUnavailableError } from "../../checkout/store/checkout.types";
import { CartItem } from "../store/cart.types";
import Title3 from "../../../ui/titles/Title3";
import { BRAND } from "../../../ui/variables";
import MiniCartProductInfo from "./MiniCartProductInfo";
import { useCallback } from "react";
import { getCartItemImage } from "../store/cart.utils";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../store/cart.actions";

export interface Props {
  product: CartItem;
  inCheckout: boolean;
  closeCart?: () => void;
  rentalLength: number | null;
  itemsErrors?: ItemUnavailableError[];
  isItemUnavailable: boolean;
}

const MiniCartProduct = ({
  product,
  closeCart,
  itemsErrors,
  rentalLength,
  isItemUnavailable,
  inCheckout,
}: Props) => {
  const dispatch = useDispatch();
  const backgroundImage = getCartItemImage(product.image);

  const showError = useCallback(
    (cartItem: CartItem) => {
      if (itemsErrors && itemsErrors.length > 0) {
        const errorFound = itemsErrors.find((err) => {
          return (
            (err.identifier === cartItem.identifier ||
              err.identifier === cartItem.bundleIdentifier) &&
            (err.variantIdentifier === cartItem.variantIdentifier ||
              err.variantIdentifier === cartItem.bundleVariantIdentifier)
          );
        });

        if (errorFound) {
          return `Item is out of stock or unavailable`;
        }
      }

      return "";
    },
    [itemsErrors]
  );

  const urlCategory = product.type === "bundle" ? "/packages" : "/products";

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 10px 0;
      `}
    >
      <MiniCartProductInfo
        to={`${urlCategory}/${product.identifier}`}
        onClick={closeCart}
        title={product.title}
        imageUrl={backgroundImage}
        variant={product.variantName}
        isItemUnavailable={isItemUnavailable}
        showError={showError(product)}
      />

      <div
        css={css`
          flex: 1;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <div
          css={css`
            text-align: right;
            margin-top: 13px;
          `}
        >
          {rentalLength && (
            <Title3 isBold={true}>
              ${product.rentalPrices![rentalLength] * product.quantity}/mo
            </Title3>
          )}
          {!inCheckout && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => dispatch(removeCartItem(product))}
              css={css`
                font-size: 12px;
                color: ${BRAND.SECONDARY_TEXT};
                text-decoration: underline;
                cursor: pointer;
              `}
            >
              Remove
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniCartProduct;
