export enum Overlays {
  MiniCartOverlay = 'isMiniCartOpen',
  MobileNavOverlay = 'isMobileNavOpen',
  QuizOverlay = 'isQuizOverlayOpen',
  DeliveryOverlay = 'isDeliveryOverlayOpen',
  DimensionsOverlay = 'isDimensionsOverlayOpen',
  MembershipOverlay = 'isMembershipOverlayOpen',
  ProductInfoOverlay = 'isProductInfoOverlayOpen',
  MobileProductFilters = 'isMobileProductFiltersOpen',
  AddItemsToCurrentPlanOverlay = 'isAddItemsToCurrentPlanOverlayOpen',
  PlanSelectionOverlay = 'isPlanSelectionOverlayOpen',
  PlanInformationOverlay = 'isPlanInformationOverlayOpen',
  MembershipSelectedOverlay = 'isMembershipSelectedOverlayOpen',
  EditQuizResultsOverlay = 'isEditQuizResultsOverlayOpen',
  FailedSSNOverlay = 'isFailedSSNOverlayOpen',
  NoSSNOverlay = 'isNoSSNOverlayOpen',
  ThreeDOverlayOpen = 'is3DOverlayOpen'
}

export interface OverlayState {
  isMiniCartOpen: boolean;
  isMobileNavOpen: boolean;
  isQuizOverlayOpen: boolean;
  isDeliveryOverlayOpen: boolean;
  isDimensionsOverlayOpen: boolean;
  isMembershipOverlayOpen: boolean;
  isProductInfoOverlayOpen: boolean;
  isMobileProductFiltersOpen: boolean;
  isAddItemsToCurrentPlanOverlayOpen: boolean;
  isPlanSelectionOverlayOpen: boolean;
  isPlanInformationOverlayOpen: boolean;
  isMembershipSelectedOverlayOpen: boolean;
  isEditQuizResultsOverlayOpen: boolean;
  isFailedSSNOverlayOpen: boolean;
  isNoSSNOverlayOpen: boolean;
  is3DOverlayOpen: boolean;
}
