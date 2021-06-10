/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { BRAND } from '../../../ui/variables';

interface Props {
  isCartPage?: boolean;
  isMobileBreakPoint?: boolean;
}

export const OutOfStock = ({ isCartPage, isMobileBreakPoint }: Props) => {
  return (
    <div
      css={css`
        color: ${BRAND.ERROR};
        font-weight: ${isCartPage ? 400 : 500};
        font-size: ${!isCartPage || isMobileBreakPoint ? '14px' : '16px'};
      `}
      data-cy="out-of-stock-item"
    >
      Out of stock
    </div>
  );
};
