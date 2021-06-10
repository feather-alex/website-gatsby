/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Overlays } from '../../../../../app/store/overlay/overlay.types';
import { getIsMobileBreakpoint } from '../../../../../app/store/dimensions/dimensions.selectors';
import { getDeliveryAreaIdentifier } from '../../../../../app/store/plan/plan.selectors';
import { toggleOverlay, ToggleOverlay } from '../../../../../app/store/overlay/overlay.actions';
import { getIsProductInfoOverlayOpen } from '../../../../../app/store/overlay/overlay.selectors';
import { PkgItem } from '../../../../../types/Package';
import { State as GlobalState } from '../../../../../types/ReduxState';
import ProductInfoModal from '../ProductInfoModal';
import PackageItemsDisplay from '../PackageItemsDisplay';
import { DeliveryAreaIdentifier } from '../../../../../app/store/plan/plan.types';

interface StateProps {
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  isMobileBreakpoint: boolean;
  isProductInfoOverlayOpen: boolean;
}

interface DispatchProps {
  dispatchToggleOverlay: ToggleOverlay;
}

interface OwnProps {
  packageTitle: string;
  selectedItems: PkgItem[];
  handleSwapItem: (index: number, identifier: string) => void;
  selectedItemsQuantity: { [id: string]: number };
  packageHasChanged: boolean;
  isItemSwappable: (index: number) => boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
  selectedPkgItem: PkgItem | null;
}

class QuizResultsIncludes extends React.Component<Props, State> {
  public readonly state: Readonly<State> = {
    selectedPkgItem: null
  };

  handleOpenProductInfo = (selectedItem: PkgItem) => {
    this.setState(
      {
        selectedPkgItem: selectedItem
      },
      () => {
        this.props.dispatchToggleOverlay(Overlays.ProductInfoOverlay, true);
      }
    );
  };

  handleCloseProductInfo = (overlay: Overlays, isOpen: false) => {
    this.setState(
      {
        selectedPkgItem: null
      },
      () => {
        this.props.dispatchToggleOverlay(overlay, isOpen);
      }
    );
  };

  render() {
    const { selectedPkgItem } = this.state;
    const {
      isMobileBreakpoint,
      isProductInfoOverlayOpen,
      selectedItems,
      deliveryAreaIdentifier,
      isItemSwappable,
      handleSwapItem,
      selectedItemsQuantity
    } = this.props;

    return (
      <Fragment>
        {selectedPkgItem && (
          <ProductInfoModal
            isMobileDevice={isMobileBreakpoint}
            isProductInfoOverlayOpen={isProductInfoOverlayOpen}
            pkgItem={selectedPkgItem}
            toggleOverlay={this.handleCloseProductInfo}
          />
        )}

        <section
          css={css`
            width: ${isMobileBreakpoint ? 100 : 50}%;
            ${!isMobileBreakpoint && 'padding-left: 9vw'};
          `}
        >
          <PackageItemsDisplay
            isMobileBreakpoint={isMobileBreakpoint}
            handleOpenProductInfo={this.handleOpenProductInfo}
            selectedItems={selectedItems}
            selectedItemsQuantity={selectedItemsQuantity}
            deliveryAreaIdentifier={deliveryAreaIdentifier}
            isQuizResults={true}
            isItemSwappable={isItemSwappable}
            handleSwapItem={handleSwapItem}
          />
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  isProductInfoOverlayOpen: getIsProductInfoOverlayOpen(state)
});

const mapDispatchToProps: DispatchProps = {
  dispatchToggleOverlay: toggleOverlay
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizResultsIncludes);
