/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import { getDeliveryAreaIdentifier, getMembershipState } from '../../../app/store/plan/plan.selectors';
import Loading from '../../../components/Loading';
import Header2 from '../../../ui/headers/Header2';
import ItemCard, { DescriptionDisplay, ItemType } from '../../../ui/products/ItemCard';
import { MembershipState } from '../../../app/store/plan/plan.types';
import { isThereAVariantPriceDifference } from '../../productListing/productList.service';
import { getProductPairingsRequest } from '../store/productPairings/productPairings.actions';
import { getProductPairing, getError, getIsFetching } from '../store/productPairings/productPairings.selectors';
import { BRAND, SHADES } from '../../../ui/variables';
import useMount from '../../../utils/useMount';
import Analytics from '../../../analytics/analytics';
import { DETAILS_PAGE } from '../../../analytics/details-page/events';
import { clickRelatedItemPayloadMapping } from '../../../analytics/details-page/payload-mappings';

interface Props {
  productIdentifiers: string[];
  categoryIdentifier: string;
}

const ProductPairings = ({ productIdentifiers, categoryIdentifier }: Props) => {
  const dispatch = useDispatch();

  const deliveryArea = useSelector(getDeliveryAreaIdentifier);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const membershipState = useSelector(getMembershipState);
  const productPairings = useSelector(getProductPairing);
  const isFetching = useSelector(getIsFetching);
  const apiError = useSelector(getError);

  useMount(() => {
    const requestBody = {
      identifiers: productIdentifiers,
      categoryIdentifier,
      ...(deliveryArea && { deliveryArea })
    };

    dispatch(getProductPairingsRequest(requestBody));
  });

  if (apiError || (!isFetching && (!productPairings || productPairings.length === 0))) {
    return null;
  }

  if (isFetching || !productPairings || !productPairings.length) {
    return <Loading />;
  }

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${BRAND.BACKGROUND};
        ${isMobileBreakpoint ? 'padding: 64px 24px 80px' : 'padding: 112px 32px 144px'};
      `}
    >
      <Header2>Complete the look</Header2>

      <div
        data-cy="product-pairings"
        css={css`
          padding: ${isMobileBreakpoint ? '48px 48px 0' : '64px 164px 0'};
          ${isMobileBreakpoint
            ? 'max-width: 664px;'
            : `display: flex;
              flex-direction: row;
              justify-content: center;
              width: 100%;
              `}
        `}
      >
        {productPairings.slice(0, 4).map((product) => {
          const firstProductVariant = product.variants[0];
          const featherPrice =
            membershipState === MembershipState.NON_MEMBER
              ? firstProductVariant.rentalPrices[3]
              : firstProductVariant.rentalPrices[12];

          return (
            <ItemCard
              descriptionDisplay={DescriptionDisplay.Center}
              backgroundColor={SHADES.WHITE}
              featherPrice={featherPrice}
              isMobileBreakpoint={isMobileBreakpoint}
              itemType={ItemType.Product}
              shouldShowFromPrice={isThereAVariantPriceDifference(product.variants)}
              listingImage={product.variants[0].listingImage}
              key={product.identifier}
              name={product.title}
              to={`/products/${product.identifier}`}
              onClick={() =>
                Analytics.trackEvent(
                  DETAILS_PAGE.CLICK_RELATED,
                  clickRelatedItemPayloadMapping({
                    currentItemIdentifier: productIdentifiers[0],
                    relatedItemIdentifier: product.identifier
                  })
                )
              }
              membershipState={membershipState}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProductPairings;
