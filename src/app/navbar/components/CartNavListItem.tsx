/** @jsx jsx **/
import { css, jsx } from "@emotion/core";
import CartIcon from "../../../ui/icons/CartIcon";
import { FONTS, BRAND, BREAKPOINTS } from "../../../ui/variables";

interface Props {
  totalItems: number;
  toggleMiniCart: () => void;
  dataCy?: string;
}

const CartNavListItem = ({ totalItems, toggleMiniCart, dataCy }: Props) => (
  <button
    data-cy={dataCy}
    type="button"
    css={css`
      padding: 0;
      border: none;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
    onClick={toggleMiniCart}
  >
    <CartIcon />
    {totalItems > 0 && (
      <div
        css={css`
          margin-left: 4px;
        `}
      >
        <p
          css={css`
            padding: 0;
            margin: 0;
            position: relative;
            width: fit-content;
            font-family: ${FONTS.PRIMARY};
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
            color: ${BRAND.PRIMARY_TEXT};
            @media ${BREAKPOINTS.MOBILE} {
              font-size: 14px;
            }
          `}
          data-cy="total-items"
        >
          {totalItems}
        </p>
      </div>
    )}
  </button>
);

export default CartNavListItem;
