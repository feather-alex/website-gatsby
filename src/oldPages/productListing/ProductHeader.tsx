/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { BRAND } from "../../ui/variables";
import { Categories } from "../../app/store/entities/entities.types";
import { useHistory, useRouteMatch } from "react-router";
// TODO: add that analytics events to filters
// import { categoryPageViewedPayloadMapping } from '../../analytics/product-category/payload-mappings';

import { newProductCategories } from "./product.categories";
import Subheader1 from "../../ui/subheaders/Subheader1";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import { useSelector } from "react-redux";

interface Props {
  categories: Categories | null;
}

export const productHeaderHeight = 88;

const ProductHeader = ({ categories }: Props) => {
  const routeMatch = useRouteMatch<{ productIdentifier?: string }>();
  const history = useHistory();
  const { location } = history;
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

  let currentCategory = "All Furniture";
  if (categories && !location.pathname.match(/\/products\/?$/)) {
    // TODO: temp until API is ready with new product categories
    const allCategories = [...categories.products, ...newProductCategories];

    const selectedCategory = allCategories.find(
      (category) => category.identifier === routeMatch.params.productIdentifier
    );
    currentCategory = selectedCategory
      ? selectedCategory.name
      : currentCategory;
  }
  if (location.pathname.match(/packages(\/|#\S*)?$/)) {
    currentCategory = "Curated Packages";
  }

  return (
    <div
      css={css`
        padding: ${isMobileBreakpoint ? "24px 8px 32px" : "48px 0"};
        height: ${productHeaderHeight}px;
        background-color: ${BRAND.BACKGROUND};
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Subheader1>Shop {currentCategory}</Subheader1>
      </div>
    </div>
  );
};

export default ProductHeader;
