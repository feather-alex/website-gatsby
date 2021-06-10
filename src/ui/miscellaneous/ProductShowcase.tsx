/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  getMembershipState,
  getIsFetching,
} from "../../app/store/plan/plan.selectors";
import { getProductBestsellers } from "../../oldPages/detailsPage/store/productPairings/productPairings.selectors";
import { getError } from "../../oldPages/account/planAndBilling/store/billing.information.selectors";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import useMount from "../../utils/useMount";
import { getProductBestsellersRequest } from "../../oldPages/detailsPage/store/productPairings/productPairings.actions";
import { MembershipState } from "../../app/store/plan/plan.types";
import ItemCard, { DescriptionDisplay, ItemType } from "../products/ItemCard";
import { SHADES, BREAKPOINTS } from "../variables";
import { isThereAVariantPriceDifference } from "../../oldPages/productListing/productList.service";
import ErrorPage from "../../components/ErrorPage";
import Header2 from "../headers/Header2";
import Loading from "../../components/Loading";
import Button, { ButtonStyle } from "../buttons/Button";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 112px auto 144px;

  @media ${BREAKPOINTS.MOBILE} {
    margin: 48px auto 24px;
  }
`;

const ProductsContainer = styled.div`
  padding: 56px 8%;

  @media ${BREAKPOINTS.DESKTOP} {
    display: flex;
    justify-content: center;
    width: 90%;
  }
`;

interface Props {
  title: string;
  productIdentifiers: string[];
  variants?: string[];
  showCTA?: boolean;
  CTAOnClick?: () => void;
}

const ProductShowcase = ({
  title,
  productIdentifiers,
  variants,
  showCTA,
  CTAOnClick,
}: Props) => {
  const dispatch = useDispatch();
  const membershipState = useSelector(getMembershipState);
  const productDetails = useSelector(getProductBestsellers);
  const errorFetching = useSelector(getError);
  const isFetchingProducts = useSelector(getIsFetching);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

  useMount(() => {
    dispatch(
      getProductBestsellersRequest({
        productIdentifiers,
      })
    );
  });

  const renderProducts = () => {
    if (productDetails) {
      if (variants) {
        return variants.map((variantIdentifier) => {
          const productDetail = productDetails.find((product) =>
            product.variants.find(
              (variant) => variant.identifier === variantIdentifier
            )
          );
          if (!productDetail) {
            return null;
          }
          const productVariant = productDetail?.variants.find(
            (variant) => variant.identifier === variantIdentifier
          );
          if (!productVariant) {
            return null;
          }

          return (
            <ItemCard
              descriptionDisplay={DescriptionDisplay.Center}
              backgroundColor={SHADES.WHITE}
              featherPrice={
                membershipState === MembershipState.NON_MEMBER
                  ? productVariant.rentalPrices[3]
                  : productVariant.rentalPrices[12]
              }
              isMobileBreakpoint={isMobileBreakpoint}
              itemType={ItemType.Product}
              shouldShowFromPrice={isThereAVariantPriceDifference(
                productDetail.variants
              )}
              listingImage={productVariant.mainImage}
              key={productDetail.identifier}
              name={productDetail.title}
              to={`/products/${productDetail.identifier}?variant=${productVariant.identifier}`}
              membershipState={membershipState}
            />
          );
        });
      }

      return productDetails.map((product) => {
        const variantDetails =
          product.variants.find((variant) =>
            variant.availability.some((va) => va.isEnabled)
          ) || product.variants[0];

        const featherPrice =
          membershipState === MembershipState.NON_MEMBER
            ? variantDetails.rentalPrices[3]
            : variantDetails.rentalPrices[12];

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
            listingImage={variantDetails.mainImage}
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

  return (
    <Container>
      <Header2>{title}</Header2>
      <ProductsContainer>
        {!productDetails || !productDetails.length || isFetchingProducts ? (
          <Loading />
        ) : (
          renderProducts()
        )}
      </ProductsContainer>
      {showCTA && (
        <Button
          style={ButtonStyle.TERTIARY}
          to="/products"
          onClick={CTAOnClick}
        >
          Shop All Furniture
        </Button>
      )}
    </Container>
  );
};

export default ProductShowcase;
