/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';

import Analytics from '../../../../../analytics/analytics';
import { DETAILS_PAGE } from '../../../../../analytics/details-page/events';
import { quizResultDetailPageViewedPayloadMapping } from '../../../../../analytics/details-page/payload-mappings';
import { PACKAGE } from '../../../../../analytics/package/events';
import {
  updateActionsPackagePayloadMapping,
  swapPackageItemPayloadMapping,
  removePackageItemPayloadMapping
} from '../../../../../analytics/package/payload-mappings';
import { DeliveryAreaIdentifier, MembershipState } from '../../../../../app/store/plan/plan.types';
import { PkgItem } from '../../../../../types/Package';
import { getPackagePrices, getUniqueItemsData } from '../../../detailsPage.service';
import DetailsPageInfo from '../../../DetailsPageInfo';
import { Availability, OptionType } from '../../../../../types/Product';
import QuizResultsIncludes from './QuizResultsIncludes';
import { QuizRoom, QuizPkgs } from './store/quizResults.types';
import {
  getMembershipState,
  getDeliveryZipCode,
  getDeliveryAreaIdentifier,
  getDeliveryTimelineText
} from '../../../../../app/store/plan/plan.selectors';
import { getIsMobileBreakpoint } from '../../../../../app/store/dimensions/dimensions.selectors';
import { getQuizResults } from './store/quizResults.selectors';
import { State as GlobalState } from '../../../../../types/ReduxState';

export interface QuizPackageInfo {
  title: string;
  description: string;
  items: PkgItem[][];
}

interface StateProps {
  membershipState: MembershipState;
  isMobileBreakpoint: boolean;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  postalCode: string | null;
  quizResults: QuizPkgs | null;
  deliveryTimelineText: string;
}

interface OwnProps {
  packageInfo: QuizPackageInfo;
  room: QuizRoom;
  selectedItems: PkgItem[];
}

type Props = StateProps & OwnProps;

interface State {
  uniqueItems: PkgItem[];
  uniqueItemsQuantity: { [id: string]: number };
  packageHasChanged: boolean;
}

class QuizResultsDetailsContainer extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    packageHasChanged: false,
    ...getUniqueItemsData(this.props.selectedItems)
  };

  componentDidMount() {
    const {
      deliveryAreaIdentifier,
      membershipState,
      packageInfo,
      postalCode,
      room,
      quizResults,
      selectedItems
    } = this.props;

    if (quizResults && quizResults.uuid) {
      Analytics.trackEvent(
        DETAILS_PAGE.VIEW_QUIZ_RESULT,
        quizResultDetailPageViewedPayloadMapping({
          quizResults,
          packageInfo,
          selectedItems,
          room,
          membershipState,
          postalCode,
          deliveryAreaIdentifier
        })
      );
    }
  }

  isItemSwappable = (index: number) => {
    if (this.props.quizResults) {
      const roomItemGroups = this.props.quizResults[this.props.room];
      return roomItemGroups[index].length > 1;
    }

    return false;
  };

  handleSwapItem = (roomItemsGroupIndex: number, productToSwapIdentifier: string) => {
    if (this.props.quizResults) {
      // figure out with furniture grouping for the room we are working with
      const roomItemGroups = this.props.quizResults[this.props.room];
      // get a reference to the full array
      const roomItemGroup = roomItemGroups[roomItemsGroupIndex];
      // figure out the index of the option
      const selectedOptionIndex = roomItemGroup.findIndex((item) => item.identifier === productToSwapIdentifier);
      // figure out the index of the new option
      const newSelectedOptionIndex = selectedOptionIndex + 1 <= roomItemGroup.length - 1 ? selectedOptionIndex + 1 : 0;
      // get a reference to the full product details
      const newSelectedOption = roomItemGroup[newSelectedOptionIndex];

      this.setState((prevState) => {
        // iterate over previous unique items and replace the swapped
        // one with our new option
        const newUniqueItems = prevState.uniqueItems.map((item) =>
          item.identifier === productToSwapIdentifier ? newSelectedOption : item
        );
        // make new unique items quantity map, but add new option identifier
        // as key and assign it the quantity of the item that was swapped
        const newUniqueItemsQuantity = {
          ...prevState.uniqueItemsQuantity,
          [newSelectedOption.identifier]: prevState.uniqueItemsQuantity[productToSwapIdentifier]
        };
        // delete the swapped item quantity key
        delete newUniqueItemsQuantity[productToSwapIdentifier];
        // update state!
        return {
          uniqueItems: newUniqueItems,
          uniqueItemsQuantity: newUniqueItemsQuantity,
          packageHasChanged: true
        };
      });

      Analytics.trackEvent(
        PACKAGE.SWAP,
        swapPackageItemPayloadMapping({
          packageIdentifier: 'make-your-own-package',
          swappedItem: productToSwapIdentifier
        })
      );
    }
  };

  handleResetPackage = () => {
    const { selectedItems } = this.props;

    const { uniqueItems, uniqueItemsQuantity } = getUniqueItemsData(selectedItems);

    this.setState({
      uniqueItems,
      uniqueItemsQuantity,
      packageHasChanged: false
    });

    Analytics.trackEvent(PACKAGE.UNDO, updateActionsPackagePayloadMapping({ packageIdentifier: 'quiz-results' }));
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
          packageIdentifier: 'make-your-own-package',
          removedItem: identifier
        })
      );
    }
  };

  render() {
    const {
      deliveryAreaIdentifier,
      packageInfo,
      membershipState,
      isMobileBreakpoint,
      deliveryTimelineText
    } = this.props;
    const { uniqueItems, uniqueItemsQuantity, packageHasChanged } = this.state;

    const { memberRentalPrice, nonMemberRentalPrice, retailPrice } = getPackagePrices(uniqueItems, uniqueItemsQuantity);

    // Since the DetailsPageInfo component requires an array of Availability,
    // and since the API endpoint responsible for retrieving quiz results
    // already filters out all unavailable products, we can safely assume that
    // all product data traveling through this component are available.
    const spoofedAvailability: Availability = {
      deliveryArea: deliveryAreaIdentifier || DeliveryAreaIdentifier.All,
      isInStock: true,
      isEnabled: true,
      stockExpectedDate: null
    };

    return (
      <section
        css={css`
          display: flex;
          padding: ${isMobileBreakpoint ? `30px 0 50px` : `10px 0 100px`};
          ${isMobileBreakpoint && `flex-direction: column;`}
        `}
      >
        <QuizResultsIncludes
          packageTitle={packageInfo.title}
          selectedItems={uniqueItems}
          isItemSwappable={this.isItemSwappable}
          handleSwapItem={this.handleSwapItem}
          selectedItemsQuantity={uniqueItemsQuantity}
          packageHasChanged={packageHasChanged}
        />

        <div
          // For mobile view, hide the header title from DetailsPageInfo b/c displayed inside ThisPackageIncludes
          css={css`
            ${isMobileBreakpoint
              ? `width: 100%;
                  padding-top: 24px;
                  h3 {
                  display: none;
                }`
              : `width: 50%;
                padding: 0 9vw;
            `}
          `}
        >
          <DetailsPageInfo
            title={packageInfo.title}
            identifier="make-your-own-package"
            categories={[]}
            availability={[spoofedAvailability]}
            selectedOptions={{ [OptionType.Color]: null, [OptionType.Material]: null, [OptionType.Structure]: null }}
            selectedVariant={null}
            selectedItems={uniqueItems}
            selectedItemsQuantity={uniqueItemsQuantity}
            handleSelectedItemsQuantity={this.handleSelectedItemsQuantity}
            handleResetPackage={this.handleResetPackage}
            packageHasChanged={this.state.packageHasChanged}
            memberRentalPrice={memberRentalPrice}
            nonMemberRentalPrice={nonMemberRentalPrice}
            retailPrice={retailPrice}
            isPackage={true}
            membershipState={membershipState}
            isMobileBreakpoint={isMobileBreakpoint}
            description={packageInfo.description}
            mainImage={uniqueItems[0].image}
            isQuizResults={true}
            deliveryTimelineText={deliveryTimelineText}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  postalCode: getDeliveryZipCode(state),
  membershipState: getMembershipState(state),
  quizResults: getQuizResults(state),
  deliveryTimelineText: getDeliveryTimelineText(state)
});

export default connect(mapStateToProps)(QuizResultsDetailsContainer);
