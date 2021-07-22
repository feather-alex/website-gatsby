import { State as GlobalState } from "../../../types/ReduxState";
import { createSelector } from "reselect";

export const getAllOverlays = ({ app }: GlobalState) => app.overlay;
export const getOpenOverlay = createSelector(getAllOverlays, (overlayState) => {
  for (const overlay in overlayState) {
    if (overlay) {
      const isOpen = overlayState[overlay];
      if (isOpen) {
        return overlay;
      }
    }
  }
  return null;
});
export const getIsMiniCartOpen = ({ app }: GlobalState) =>
  app.overlay.isMiniCartOpen;
export const getIsMobileNavOpen = ({ app }: GlobalState) =>
  app.overlay.isMobileNavOpen;
export const getIsQuizOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isQuizOverlayOpen;
export const getIsAddItemsToCurrentPlanOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isAddItemsToCurrentPlanOverlayOpen;
export const getIsMobileProductFiltersOpen = ({ app }: GlobalState) =>
  app.overlay.isMobileProductFiltersOpen;
export const getIsDeliveryOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isDeliveryOverlayOpen;
export const getIsDimensionsOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isDimensionsOverlayOpen;
export const getIsProductInfoOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isProductInfoOverlayOpen;
export const getIsPlanSelectionOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isPlanSelectionOverlayOpen;
export const getIsPlanInformationOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isPlanInformationOverlayOpen;
export const getIsMembershipSelectedOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isMembershipSelectedOverlayOpen;
export const getIsEditQuizResultsOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isEditQuizResultsOverlayOpen;
export const getIsFailedSSNOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isFailedSSNOverlayOpen;
export const getIsNoSSNOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.isNoSSNOverlayOpen;
export const getIs3DOverlayOpen = ({ app }: GlobalState) =>
  app.overlay.is3DOverlayOpen;
