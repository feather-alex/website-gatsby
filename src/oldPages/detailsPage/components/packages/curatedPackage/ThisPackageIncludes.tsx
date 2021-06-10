/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';

import { getIsMobileBreakpoint } from '../../../../../app/store/dimensions/dimensions.selectors';
import { Overlays } from '../../../../../app/store/overlay/overlay.types';
import { toggleOverlay, ToggleOverlay } from '../../../../../app/store/overlay/overlay.actions';
import { getIsProductInfoOverlayOpen } from '../../../../../app/store/overlay/overlay.selectors';
import { getDeliveryAreaIdentifier } from '../../../../../app/store/plan/plan.selectors';
import ProductInfoModal from '../ProductInfoModal';
import { PkgItem } from '../../../../../types/Package';
import { State as GlobalState } from '../../../../../types/ReduxState';
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
  packageIdentifier: string;
  selectedItems: PkgItem[];
  selectedItemsQuantity: { [id: string]: number };
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
  // Currently only used to open ProductInfoOverlay; could be used to remove items?
  selectedPkgItem: PkgItem | null;
}

class ThisPackageIncludes extends React.Component<Props, State> {
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

  render() {
    const {
      deliveryAreaIdentifier,
      dispatchToggleOverlay,
      isMobileBreakpoint,
      isProductInfoOverlayOpen,
      selectedItems,
      selectedItemsQuantity
    } = this.props;
    const { selectedPkgItem } = this.state;

    return (
      <React.Fragment>
        {selectedPkgItem && (
          <ProductInfoModal
            isMobileDevice={isMobileBreakpoint}
            isProductInfoOverlayOpen={isProductInfoOverlayOpen}
            pkgItem={selectedPkgItem}
            toggleOverlay={dispatchToggleOverlay}
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
          />
        </section>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThisPackageIncludes);
