import { GetProductListRequestAction } from "./productList.actions";
import { ProductListSuccessPayload } from "./productList.types";
import { PRODUCT_CATEGORY } from "../../../analytics/product-category/events";
import {
  categoryPageViewedPayloadMapping,
  filterListPayloadMapping,
} from "../../../analytics/product-category/payload-mappings";
import Analytics from "../../../analytics/analytics";

export function trackListingAnalytics(
  action: GetProductListRequestAction,
  results: ProductListSuccessPayload
) {
  const { body } = action.payload;
  // We only want to report on first load
  if (body.offset === 0) {
    if (body.categories.length) {
      Analytics.trackEvent(
        PRODUCT_CATEGORY.CATEGORY,
        categoryPageViewedPayloadMapping({
          listId: "products",
          selectedCategory: body.categories[0],
          products: results.products,
        })
      );
    }
    if (
      body.filter.brands.length ||
      body.filter.classes.length ||
      body.filter.subclasses.length ||
      body.order ||
      body.sort
    ) {
      Analytics.trackEvent(
        PRODUCT_CATEGORY.FILTER_LIST,
        filterListPayloadMapping({ body, products: results.products })
      );
    }
  }
}
