/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

import { DeliveryAreaIdentifier, MembershipState } from '../../../../../app/store/plan/plan.types';
import Analytics from '../../../../../analytics/analytics';
import { DETAILS_PAGE } from '../../../../../analytics/details-page/events';
import { packageDetailPageViewedPayloadMapping } from '../../../../../analytics/details-page/payload-mappings';
import { PACKAGE } from '../../../../../analytics/package/events';
import {
  updateActionsPackagePayloadMapping,
  removePackageItemPayloadMapping
} from '../../../../../analytics/package/payload-mappings';
import { FullPackageDetails, PkgItem } from '../../../../../types/Package';
import { BRAND } from '../../../../../ui/variables';
import {
  getInitialSelectedItems,
  getInitialSelectedOptions,
  getPackagePrices,
  getSelectedItemsArray,
  getUniqueItemsData,
  determineSelectedPackageVariant
} from '../../../detailsPage.service';
import DetailsPageInfo from '../../../DetailsPageInfo';
import ThisPackageIncludes from './ThisPackageIncludes';
import { isInStockAndEnabled } from '../../../../../utils';
import { SelectedOptions, SelectedOption } from '../../../store/productDetails/product.types';
import { OptionType } from '../../../../../types/Product';

interface Props {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  membershipState: MembershipState;
  isMobileBreakpoint: boolean;
  packageData: FullPackageDetails;
  postalCode: string | null;
  deliveryTimelineText: string;
}

interface State {
  // List of included product items where each element object corresponds to a single item
  // that customer will receive (i.e. there may be repeated products, for example, 4 chairs)
  // The customer can modify by removing items, and this collection is ultimately passed to checkout flow
  uniqueItems: PkgItem[];
  selectedOptions: SelectedOptions;
  uniqueItemsQuantity: { [id: string]: number };
  packageHasChanged: boolean;
}

class CuratedPackageDetailsContainer extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    packageHasChanged: false,
    selectedOptions: getInitialSelectedOptions(this.props.packageData),
    ...getUniqueItemsData(getInitialSelectedItems(this.props.packageData))
  };

  componentDidMount() {
    const { deliveryAreaIdentifier, membershipState, packageData, postalCode } = this.props;

    Analytics.trackEvent(
      DETAILS_PAGE.VIEW_PACKAGE,
      packageDetailPageViewedPayloadMapping({
        packageData,
        membershipState,
        postal: postalCode ? postalCode : '',
        deliveryAreaIdentifier: deliveryAreaIdentifier || DeliveryAreaIdentifier.All
      })
    );
  }

  handleOptionSelect = (optionType: OptionType) => (selection: SelectedOption) => {
    this.setState((prevState, prevProps) => {
      const newSelectedOptions = {
        ...prevState.selectedOptions,
        [optionType]: { identifier: selection.identifier, name: selection.name }
      };

      return {
        selectedOptions: newSelectedOptions,
        selectedVariant: determineSelectedPackageVariant(newSelectedOptions, prevProps.packageData.variants),
        ...getUniqueItemsData(getSelectedItemsArray(newSelectedOptions, prevProps.packageData)),
        uniqueItemsQuantity: prevState.uniqueItemsQuantity
      };
    });
  };

  handleResetPackageItems = () => {
    const { packageData } = this.props;
    const { selectedOptions } = this.state;

    const packageItems = getSelectedItemsArray(selectedOptions, packageData);
    const { uniqueItems, uniqueItemsQuantity } = getUniqueItemsData(packageItems);

    this.setState({
      uniqueItems,
      uniqueItemsQuantity,
      packageHasChanged: false
    });

    Analytics.trackEvent(
      PACKAGE.UNDO,
      updateActionsPackagePayloadMapping({ packageIdentifier: packageData.identifier })
    );
  };

  handleSelectedItemsQuantity = (identifier: string) => (itemsQuantity: number) => {
    this.setState((prevState) => ({
      uniqueItemsQuantity: { ...prevState.uniqueItemsQuantity, [identifier]: itemsQuantity },
      packageHasChanged: true
    }));
    // fire the removed analytics event if quantity is 0
    if (itemsQuantity === 0) {
      Analytics.trackEvent(
        PACKAGE.REMOVE,
        removePackageItemPayloadMapping({
          packageIdentifier: this.props.packageData.identifier,
          removedItem: identifier
        })
      );
    }
  };

  render() {
    const {
      isMobileBreakpoint,
      membershipState,
      packageData,
      deliveryAreaIdentifier,
      deliveryTimelineText
    } = this.props;
    const { uniqueItems, selectedOptions, uniqueItemsQuantity, packageHasChanged } = this.state;

    const itemsInStockAndEnabled = uniqueItems.filter((item) =>
      isInStockAndEnabled(deliveryAreaIdentifier, item.availability)
    );

    const { memberRentalPrice, nonMemberRentalPrice, retailPrice } = getPackagePrices(
      itemsInStockAndEnabled,
      uniqueItemsQuantity
    );
    const selectedPackageVariant = determineSelectedPackageVariant(selectedOptions, packageData.variants);

    return (
      <section
        css={css`
          background-color: ${BRAND.BACKGROUND};
          display: flex;
          padding: ${isMobileBreakpoint ? `50px 0 64px` : `16px 0 112px`};
          ${isMobileBreakpoint && `flex-direction: column;`}
        `}
      >
        <ThisPackageIncludes
          packageIdentifier={packageData.identifier}
          selectedItems={uniqueItems}
          selectedItemsQuantity={uniqueItemsQuantity}
        />

        <div
          // For mobile view, hide the header title from DetailsPageInfo b/c displayed inside ThisPackageIncludes
          css={css`
            ${isMobileBreakpoint
              ? `width: 100%;
                  padding-top: 8px;
                  overflow-x: hidden;
                  h3 {
                  display: none;
                }`
              : `width: 50%;
                padding: 0 9vw;
            `}
          `}
        >
          {selectedPackageVariant && (
            <DetailsPageInfo
              title={packageData.title}
              identifier={packageData.identifier}
              mainImage={packageData.lifestyle.image}
              categories={[packageData.category]} // needs array of objects
              options={packageData.options}
              variants={packageData.variants}
              availability={selectedPackageVariant.availability}
              selectedOptions={selectedOptions}
              selectedVariant={selectedPackageVariant}
              selectedItems={uniqueItems}
              selectedItemsQuantity={uniqueItemsQuantity}
              handleSelectedItemsQuantity={this.handleSelectedItemsQuantity}
              handleOptionSelect={this.handleOptionSelect}
              handleResetPackage={this.handleResetPackageItems}
              packageHasChanged={packageHasChanged}
              memberRentalPrice={memberRentalPrice}
              nonMemberRentalPrice={nonMemberRentalPrice}
              retailPrice={retailPrice}
              isPackage={true}
              membershipState={membershipState}
              isMobileBreakpoint={isMobileBreakpoint}
              description={packageData.description}
              deliveryTimelineText={deliveryTimelineText}
            />
          )}
        </div>
      </section>
    );
  }
}

export default CuratedPackageDetailsContainer;
