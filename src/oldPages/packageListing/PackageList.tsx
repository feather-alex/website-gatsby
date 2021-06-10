/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import HashLinkId from '../../components/HashLinkId';
import { groupByCategoryId } from '../../utils/packages';
import { PackageForListing } from '../../types/Package';
import Header2 from '../../ui/headers/Header2';
import { DeliveryAreaIdentifier, MembershipState } from '../../app/store/plan/plan.types';
import { isThereAVariantPriceDifference } from '../productListing/productList.service';
import { getPackageStatusListing, getCheapestVariant, getPackagePrices } from './packageList.service';
import PackageCard from '../../ui/products/PackageCard';
import { useSelector } from 'react-redux';
import { getIsNavbarBreakpoint } from '../../app/store/dimensions/dimensions.selectors';

interface Props {
  packagesData: PackageForListing[];
  isMobileBreakpoint: boolean;
  membershipState: MembershipState;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  isSearchResults?: boolean;
}

const PackageList = ({
  packagesData,
  isMobileBreakpoint,
  membershipState,
  deliveryAreaIdentifier,
  isSearchResults = false
}: Props) => {
  const isNavbarBreakpoint = useSelector(getIsNavbarBreakpoint);
  const packages = groupByCategoryId(packagesData);

  return (
    <div>
      {Object.keys(packages).map((key) => {
        const packs = packages[key];

        const { name } = packs[0].category;

        return (
          <HashLinkId
            id={name.replace(' ', '')}
            key={key}
            css={css`
              // below css needed for scrollIntoView to work as expected:
              padding-top: 100px;
              margin-top: -100px;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <div
              css={css`
                ${!isSearchResults && `max-width: 1140px`};
                width: 100%;
              `}
            >
              <div
                css={css`
                  padding: ${isMobileBreakpoint ? '40px 24px 24px' : '48px 0 32px'};
                `}
              >
                <Header2>{name}</Header2>
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-columns: ${isNavbarBreakpoint ? '1fr' : '1fr 1fr'};
                  grid-gap: 32px;
                `}
              >
                {packs.map((pack) => {
                  // We don't want to show packages that are not enabled  or oos in the current deliveryArea
                  if (
                    !getPackageStatusListing(deliveryAreaIdentifier, pack.variants, 'isEnabled') ||
                    !getPackageStatusListing(deliveryAreaIdentifier, pack.variants, 'isInStock')
                  ) {
                    return null;
                  }

                  const cheapestVariant = getCheapestVariant(pack.variants);
                  const { memberRentalPrice, nonMemberRentalPrice } = getPackagePrices(cheapestVariant.items);

                  return (
                    <PackageCard
                      key={pack.identifier}
                      to={`/packages/${pack.identifier}`}
                      name={pack.title}
                      listingImages={pack.variants[0].items
                        .sort((a, b) => b.displayOrder - a.displayOrder)
                        .map((item) => item.image)}
                      shouldShowFromPrice={isThereAVariantPriceDifference(pack.variants)}
                      featherPrice={
                        membershipState === MembershipState.NON_MEMBER ? nonMemberRentalPrice : memberRentalPrice
                      }
                      numberOfItems={pack.variants[0].totalProducts}
                      isMobileBreakpoint={isMobileBreakpoint}
                      membershipState={membershipState}
                    />
                  );
                })}
              </div>
            </div>
          </HashLinkId>
        );
      })}
    </div>
  );
};

export default PackageList;
