import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { OverlayState } from './overlay.types';
import { OPEN_OVERLAY, CLOSE_OVERLAY } from './overlay.actions';

export const initialState: OverlayState = {
  isMiniCartOpen: false,
  isMobileNavOpen: false,
  isQuizOverlayOpen: false,
  isDeliveryOverlayOpen: false,
  isDimensionsOverlayOpen: false,
  isMembershipOverlayOpen: false,
  isProductInfoOverlayOpen: false,
  isMobileProductFiltersOpen: false,
  isAddItemsToCurrentPlanOverlayOpen: false,
  isPlanSelectionOverlayOpen: false,
  isPlanInformationOverlayOpen: false,
  isMembershipSelectedOverlayOpen: false,
  isEditQuizResultsOverlayOpen: false,
  isFailedSSNOverlayOpen: false,
  isNoSSNOverlayOpen: false,
  is3DOverlayOpen: false
};

const overlayControl = (state = initialState, action: FluxStandardAction): OverlayState => {
  switch (action.type) {
    case OPEN_OVERLAY:
      return {
        ...state,
        [action.payload.overlay]: true
      };

    case CLOSE_OVERLAY:
      return {
        ...state,
        [action.payload.overlay]: false
      };

    default:
      return state;
  }
};

export default overlayControl;
