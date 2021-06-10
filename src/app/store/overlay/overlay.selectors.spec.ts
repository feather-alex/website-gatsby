import {
  getAllOverlays,
  getIsAddItemsToCurrentPlanOverlayOpen,
  getOpenOverlay,
  getIsDeliveryOverlayOpen,
  getIsDimensionsOverlayOpen,
  getIsMiniCartOpen,
  getIsMobileProductFiltersOpen,
  getIsProductInfoOverlayOpen,
  getIsQuizOverlayOpen,
  getIsPlanInformationOverlayOpen,
  getIsMembershipSelectedOverlayOpen,
  getIsEditQuizResultsOverlayOpen,
  getIsFailedSSNOverlayOpen,
  getIsNoSSNOverlayOpen,
  getIs3DOverlayOpen
} from './overlay.selectors';
import { OverlayState } from './overlay.types';
import { State as GlobalState } from '../../../types/ReduxState';
import { initialState } from './overlay.reducer';
import { Overlays } from './overlay.types';

describe('Overlay Selectors', () => {
  // in reality we should never have more than one overlay open at once
  // but this is just test setup to ensure selectors are getting the right
  // slice of state
  const state: OverlayState = {
    isMiniCartOpen: false,
    isMobileNavOpen: true,
    isQuizOverlayOpen: false,
    isDeliveryOverlayOpen: true,
    isDimensionsOverlayOpen: false,
    isMembershipOverlayOpen: true,
    isProductInfoOverlayOpen: false,
    isMobileProductFiltersOpen: true,
    isAddItemsToCurrentPlanOverlayOpen: false,
    isPlanSelectionOverlayOpen: false,
    isPlanInformationOverlayOpen: false,
    isMembershipSelectedOverlayOpen: false,
    isEditQuizResultsOverlayOpen: false,
    isFailedSSNOverlayOpen: false,
    isNoSSNOverlayOpen: false,
    is3DOverlayOpen: false
  };

  it('should return whether the mini cart is open', () => {
    expect(getIsMiniCartOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the mobile product filter is open', () => {
    expect(getIsMobileProductFiltersOpen({ app: { overlay: state } } as GlobalState)).toEqual(true);
  });

  it('should return whether the quiz overlay is open', () => {
    expect(getIsQuizOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the product info overlay is open', () => {
    expect(getIsProductInfoOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the dimensions overlay is open', () => {
    expect(getIsDimensionsOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the delivery overlay is open', () => {
    expect(getIsDeliveryOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(true);
  });

  it('should return whether the add items to your current plan overlay is open', () => {
    expect(getIsAddItemsToCurrentPlanOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the plan information overlay is open', () => {
    expect(getIsPlanInformationOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the membership selected overlay is open', () => {
    expect(getIsMembershipSelectedOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the edit quiz results overlay is open', () => {
    expect(getIsEditQuizResultsOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the failed ssn overlay is open', () => {
    expect(getIsFailedSSNOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the no ssn overlay is open', () => {
    expect(getIsNoSSNOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return whether the no ssn overlay is open', () => {
    expect(getIs3DOverlayOpen({ app: { overlay: state } } as GlobalState)).toEqual(false);
  });

  it('should return the whole overlay state', () => {
    expect(getAllOverlays({ app: { overlay: state } } as GlobalState)).toEqual(state);
  });

  describe('Getting the currently open overlay', () => {
    it('should return the currently open overlay when one is open', () => {
      const overlayState = {
        ...initialState,
        isDimensionsOverlayOpen: true
      };
      expect(getOpenOverlay({ app: { overlay: overlayState } } as GlobalState)).toEqual(Overlays.DimensionsOverlay);
    });

    it('should return null if there are no currently open overlays', () => {
      const overlayState = {
        ...initialState
      };
      expect(getOpenOverlay({ app: { overlay: overlayState } } as GlobalState)).toEqual(null);
    });
  });
});
