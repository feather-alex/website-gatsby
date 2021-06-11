/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Link } from "gatsby";
import FixedSizeImage from "../../../ui/images/FixedSizeImage";
import Title3 from "../../../ui/titles/Title3";
import { BRAND } from "../../../ui/variables";
import { OutOfStock } from "./OutOfStock";

interface Props {
  to: string;
  onClick?: () => void;
  title: string;
  imageUrl: string;
  variant: string;
  isItemUnavailable: boolean;
  showError: string;
}

const MiniCartProductInfo = ({
  to,
  onClick,
  title,
  imageUrl,
  variant,
  isItemUnavailable,
  showError,
}: Props) => (
  <Link
    to={to}
    onClick={onClick}
    css={css`
      display: flex;
      align-items: center;
    `}
  >
    <FixedSizeImage src={imageUrl} height={86} width={86} />
    <div
      css={css`
        margin-left: 10px;
      `}
    >
      <Title3>{title}</Title3>
      <div
        css={css`
          font-size: 10px;
          color: ${BRAND.SECONDARY_TEXT};
        `}
      >
        {variant}
      </div>
      <Title3 dataCy="mini-cart-out-of-stock" isBold={true} color={BRAND.ERROR}>
        {showError}
      </Title3>
      {isItemUnavailable && <OutOfStock />}
    </div>
  </Link>
);

export default MiniCartProductInfo;
