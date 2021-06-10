/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Title2 from "../titles/Title2";
import FixedSizeImage from "../images/FixedSizeImage";
import { SHADES, BREAKPOINTS } from "../variables";
import Title3 from "../titles/Title3";

interface Props {
  to?: string;
  productImage: string;
  productName: string;
  variantName: string;
}

const ProductListItem = ({
  to,
  productImage,
  productName,
  variantName,
}: Props) => (
  <div
    css={css`
      height: 99px;
      width: 288px;
      background-color: ${SHADES.WHITE};
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 3px;

      @media ${BREAKPOINTS.MOBILE} {
        width: 100%;
      }
    `}
  >
    <FixedSizeImage src={productImage} to={to} width={83} height={83} />
    <span
      css={css`
        margin-left: 24px;
      `}
    >
      <Title2 isBold={true}>{productName}</Title2>
      <Title3>{variantName}</Title3>
    </span>
  </div>
);

export default ProductListItem;
