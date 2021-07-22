/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";

import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import {
  getProductBestsellers,
  getError,
  getIsFetching,
} from "../detailsPage/store/productPairings/productPairings.selectors";
import Loading from "../../components/Loading";
import ErrorPage from "../../components/ErrorPage";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import Header2 from "../../ui/headers/Header2";
import ItemCard, {
  DescriptionDisplay,
  ItemType,
} from "../../ui/products/ItemCard";
import Analytics from "../../analytics/analytics";
import { HOMEPAGE, AnalyticsEventKey } from "../../analytics/homepage/events";
import { homepageClickLinkPayloadMapping } from "../../analytics/homepage/payload-mappings";
import { MembershipState } from "../../app/store/plan/plan.types";
import { getMembershipState } from "../../app/store/plan/plan.selectors";
import { isThereAVariantPriceDifference } from "../productListing/productList.service";
import { getProductBestsellersRequest } from "../detailsPage/store/productPairings/productPairings.actions";
import { SHADES } from "../../ui/variables";
import { getHomepageBestSellers } from "./store/homepage.selectors";
import useMount from "../../utils/useMount";

const Bestsellers = () => {
  const dispatch = useDispatch();

  const bestSellers = useSelector(getHomepageBestSellers);
  const membershipState = useSelector(getMembershipState);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const errorFetching = useSelector(getError);
  const isFetchingProducts = useSelector(getIsFetching);
  const productDetails = useSelector(getProductBestsellers);

  useMount(() => {
    bestSellers &&
      dispatch(
        getProductBestsellersRequest({
          productIdentifiers: bestSellers.furnitureIdentifiers,
        })
      );
  });

  const renderProductBestsellers = () => {
    if (productDetails) {
      return productDetails.map((product) => {
        const firstEnabledProductVariant =
          product.variants.find((variant) =>
            variant.availability.some((va) => va.isEnabled)
          ) || product.variants[0];
        const featherPrice =
          membershipState === MembershipState.NON_MEMBER
            ? firstEnabledProductVariant.rentalPrices[3]
            : firstEnabledProductVariant.rentalPrices[12];

        return (
          <ItemCard
            descriptionDisplay={DescriptionDisplay.Center}
            backgroundColor={SHADES.WHITE}
            featherPrice={featherPrice}
            isMobileBreakpoint={isMobileBreakpoint}
            itemType={ItemType.Product}
            shouldShowFromPrice={isThereAVariantPriceDifference(
              product.variants
            )}
            listingImage={firstEnabledProductVariant.mainImage}
            key={product.identifier}
            name={product.title}
            to={`/products/${product.identifier}`}
            membershipState={membershipState}
          />
        );
      });
    }

    return null; // shouldn't hit this unless there is a serious problem
  };

  if (errorFetching) {
    return (
      <ErrorPage
        title={`${errorFetching.status} ${errorFetching.error}`}
        content={errorFetching.message}
      />
    );
  }

  if (!productDetails || !productDetails.length || isFetchingProducts) {
    return <Loading />;
  }

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        ${isMobileBreakpoint
          ? "margin: 48px auto 24px;"
          : "margin: 112px auto 144px;"}
      `}
    >
      {bestSellers && <Header2>{bestSellers.title}</Header2>}

      <div
        css={css`
          padding: 56px 8%;
          ${!isMobileBreakpoint &&
          `display: flex;
              flex-direction: row;
              justify-content: center;
              width: 90%;
              `}
        `}
      >
        {renderProductBestsellers()}
      </div>

      {!isMobileBreakpoint && (
        <Button
          style={ButtonStyle.TEXT}
          to={"/products"}
          onClick={() =>
            Analytics.trackEvent(
              HOMEPAGE.CLICK_CTA,
              homepageClickLinkPayloadMapping({
                link: AnalyticsEventKey.bestsellersFurniture,
              })
            )
          }
        >
          Shop All Furniture
        </Button>
      )}
    </section>
  );
};

export default Bestsellers;
