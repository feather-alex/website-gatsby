/** @jsx jsx */
import { ProductForListing, VariantDetails } from '../../types/Product';
import React from 'react';
import { css, jsx } from '@emotion/core';
import ItemCard, { ItemType, DescriptionDisplay } from '../../ui/products/ItemCard';
import { getShouldShowProduct, isThereAVariantPriceDifference, getVariantLink } from './productList.service';
import SampleSaleCard from './SampleSaleCard';
import { DeliveryAreaIdentifier, MembershipState } from '../../app/store/plan/plan.types';
import Analytics from '../../analytics/analytics';
import { PRODUCT_CATEGORY } from '../../analytics/product-category/events';
import { productClickedPayloadMapping } from '../../analytics/product-category/payload-mappings';

interface Props {
  products: ProductForListing[];
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  loadMoreProducts: () => void;
  isMobileBreakpoint: boolean;
  membershipState: MembershipState;
}

const ProductList = ({
  products,
  deliveryAreaIdentifier,
  loadMoreProducts,
  isMobileBreakpoint,
  membershipState
}: Props): JSX.Element => {
  const renderProducts = React.useCallback((): ((JSX.Element | null)[] | null)[] => {
    const productsLength = products.length;

    return products.map((product, index) => {
      if (!getShouldShowProduct(product, deliveryAreaIdentifier)) {
        // Skip it if it has no variants enabled or is not available
        return null;
      }
      const isWaypoint = index === Math.ceil(productsLength / 2) || index === productsLength - 1;

      // For each product we want a card to show for all variants whose option type is a displayable difference
      // i.e. we want a card for each variant with a unique listing image
      const { elements } = product.variants.reduce(
        (acc: { variants: VariantDetails[]; elements: JSX.Element[] }, variant, idx: number) => {
          // TODO: This is inefficient
          if (
            acc.variants.filter((accVariant) => accVariant.listingImage.desktop === variant.listingImage.desktop).length
          ) {
            return acc;
          }
          // if non-member is selected, show those prices
          // otherwise, show member prices
          const featherPrice =
            membershipState === MembershipState.NON_MEMBER ? variant.rentalPrices[3] : variant.rentalPrices[12];

          // basically limits the 'from $**' string to when there is listing image w/ multiple variants that aren't
          // displayed (i.e. we don't have 4 different images for bed sizes but should make a note that the price varies)
          const shouldShowFromPrice =
            isThereAVariantPriceDifference(product.variants) &&
            variant.options.some((option) =>
              ['Twin', 'Full', 'Full/Queen', 'Queen', 'King'].includes(option.valueName)
            );

          const variantLink = getVariantLink(product, variant);

          return {
            variants: [...acc.variants, variant],
            elements: [
              ...acc.elements,
              <ItemCard
                to={variantLink}
                onClick={() =>
                  Analytics.trackEvent(
                    PRODUCT_CATEGORY.CLICK_PRODUCT,
                    productClickedPayloadMapping({
                      product,
                      variant,
                      featherPrice,
                      variantLink,
                      productListIndex: index
                    })
                  )
                }
                name={product.title}
                featherPrice={featherPrice}
                listingImage={variant.listingImage}
                isMobileBreakpoint={isMobileBreakpoint}
                itemType={ItemType.Product}
                descriptionDisplay={DescriptionDisplay.PLP}
                shouldShowFromPrice={shouldShowFromPrice}
                key={`${product.identifier}-${variant.identifier}`}
                membershipState={membershipState}
                intersectionCallback={isWaypoint && idx === 0 ? loadMoreProducts : undefined}
              />
            ]
          };
        },
        { variants: [], elements: [] }
      );
      return elements;
    });
  }, [isMobileBreakpoint, loadMoreProducts, deliveryAreaIdentifier, products, membershipState]);

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {renderProducts()}
      <SampleSaleCard isMobileBreakpoint={isMobileBreakpoint} />
    </div>
  );
};

export default ProductList;
