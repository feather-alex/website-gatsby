/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import { BRAND } from "../../ui/variables";
import Analytics from "../../analytics/analytics";
import { PRODUCT_CATEGORY } from "../../analytics/product-category/events";
import Subheader2 from "../../ui/subheaders/Subheader2";
import { useSelector } from "react-redux";
import { getIsNavbarBreakpoint } from "../../app/store/dimensions/dimensions.selectors";

const SampleSaleCard = ({
  isMobileBreakpoint,
}: {
  isMobileBreakpoint: boolean;
}) => {
  const isNavbarBreakpoint = useSelector(getIsNavbarBreakpoint);
  return (
    <div
      css={css`
        background-color: ${BRAND.BACKGROUND};
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(${isNavbarBreakpoint ? 50 : 33.3333}% - 4px);
        height: auto;
        min-height: ${isMobileBreakpoint ? "256px" : "388px"};
        margin: 2px;
        vertical-align: top;
      `}
    >
      <div
        css={css`
          width: ${isMobileBreakpoint ? "156px" : "214px"};
          text-align: center;
          margin-bottom: 32px;
        `}
      >
        <Subheader2>Can’t find what you’re looking for?</Subheader2>
      </div>
      <Button
        style={
          isMobileBreakpoint
            ? ButtonStyle.COMPACT_TERTIARY
            : ButtonStyle.TERTIARY
        }
        external="https://feather.floorfound.store/"
        onClick={() => Analytics.trackEvent(PRODUCT_CATEGORY.SAMPLE_SALE)}
      >
        Shop Sample Sale
      </Button>
    </div>
  );
};

export default SampleSaleCard;
