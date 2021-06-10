import { SagaIterator } from "redux-saga";
import { put, call, select, takeLatest, delay } from "redux-saga/effects";
import { stopSubmit, reset } from "redux-form";
import { FluxStandardAction } from "../../../types/FluxStandardActions";
import { State as GlobalState } from "../../../types/ReduxState";
import Request, { RequestMethod } from "../../../api/request";
import {
  RESET_ZIPCODE,
  ZIPCODE_SUBMIT_REQUEST,
  zipcodeSubmitFailure,
  zipcodeSubmitSuccess,
  CHANGE_MEMBERSHIP_SELECTION,
  changeMembershipSelection,
} from "./plan.actions";
import { history } from "../../../store/history";
import { toggleOverlay } from "../overlay/overlay.actions";
import { getIsPlanSelectionOverlayOpen } from "../overlay/overlay.selectors";
import { Overlays } from "../overlay/overlay.types";
import {
  dismissNavbarBanner,
  showNavbarBanner,
} from "../navbar/navbar.actions";
import { BannerType } from "../navbar/navbar.types";
import { getIsInDeliveryZone } from "./plan.selectors";
import {
  getIsNavbarBannerVisible,
  getNavbarBannerType,
} from "../navbar/navbar.selectors";
import Analytics from "../../../analytics/analytics";
import { MembershipState } from "./plan.types";
import { MEMBERSHIP } from "../../../analytics/membership/events";
import { ZIPCODE } from "../../../analytics/zipcode/events";
import { enterZipcodePayloadMapping } from "../../../analytics/zipcode/payload-mappings";
import { normalizeCartPrices } from "../../../oldPages/cart/store/cart.actions";

export const determinePlanActionOrigin = ({
  isPlanSelectionOverlayOpen,
  isNavbarBannerOpen,
  navbarBannerType,
  pathname,
}: {
  isPlanSelectionOverlayOpen: boolean;
  isNavbarBannerOpen: boolean;
  navbarBannerType: BannerType;
  pathname: string;
}): string => {
  if (isPlanSelectionOverlayOpen) {
    return "overlay";
  }
  if (isNavbarBannerOpen && navbarBannerType === BannerType.ZipCode) {
    return "navbar banner";
  }
  if (pathname.includes("/products")) {
    return "product details page form";
  } else if (pathname.includes("/packages")) {
    return "package details page form";
  } else if (pathname.includes("/how-it-works")) {
    return "how it works";
  }
  return "unknown";
};

export function* handleZipcode(action: FluxStandardAction): SagaIterator {
  try {
    const enteredZipcode = action.payload.zipcode;
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(
      [Request, "send"],
      RequestMethod.GET,
      `/delivery/postal/${enteredZipcode}`
    );

    const isPlanSelectionOverlayOpen = yield select(
      getIsPlanSelectionOverlayOpen
    );
    const isNavbarBannerOpen = yield select(getIsNavbarBannerVisible);
    const navbarBannerType = yield select(getNavbarBannerType);
    const { pathname } = yield select(
      (state: GlobalState) => state.router.location
    );

    // fire analytics event
    yield call(
      Analytics.trackEvent,
      ZIPCODE.ENTER,
      enterZipcodePayloadMapping({
        zipcode: enteredZipcode,
        deliveryAreaIdentifier: response.identifier,
        origin: determinePlanActionOrigin({
          isPlanSelectionOverlayOpen,
          isNavbarBannerOpen,
          navbarBannerType,
          pathname,
        }),
      })
    );
    // Do we need to show an error message on the input field after receiving the response from the API?
    if (action.payload.shouldShowError && response.identifier === null) {
      yield put(stopSubmit("planForm", { zipcode: "outside delivery area" }));
    }
    // if triggered from overlay, close the overlay
    if (isPlanSelectionOverlayOpen) {
      yield put(toggleOverlay(Overlays.PlanSelectionOverlay, false));
    }
    // handle if we are supposed to navigate to the product listing page
    if (action.payload.navigateToListing && response.identifier) {
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yield call(history.push as any, "/products");
    }

    // Do we need to show a navbar banner?
    if (action.payload.isInBanner) {
      // Is it a zipcode failure one?
      if (response.identifier === null) {
        yield put(dismissNavbarBanner());
        yield delay(500);
        yield put(showNavbarBanner({ bannerType: BannerType.ZipCodeFailure }));

        // or a zipcode success one?
      } else {
        yield put(dismissNavbarBanner());
        yield delay(500);
        yield put(showNavbarBanner({ bannerType: BannerType.ZipCodeSuccess }));
      }
    }

    yield put(zipcodeSubmitSuccess(response));

    // handle if we are supposed to change membership along with this zipcode
    if (action.payload.shouldSelectPlan) {
      yield put(changeMembershipSelection(action.payload.shouldSelectPlan));
    }
  } catch (error) {
    yield put(zipcodeSubmitFailure(error));
  }
}

// When clicking on `Change zip code` on a details page
// we want to make sure the input is reset to its initial state
export function* handleResetZipCode(): SagaIterator {
  yield put(reset("planForm"));
}

const membershipChangeEventMap = {
  [MembershipState.MEMBER]: MEMBERSHIP.MEMBERSHIP_SELECTED,
  [MembershipState.NON_MEMBER]: MEMBERSHIP.NON_MEMBERSHIP_SELECTED,
};

export function* handleMembershipChange({
  payload: { membershipState },
}: FluxStandardAction): SagaIterator {
  const isPlanSelectionOverlayOpen = yield select(
    getIsPlanSelectionOverlayOpen
  );
  const isInDeliveryZone = yield select(getIsInDeliveryZone);
  const isNavbarBannerOpen = yield select(getIsNavbarBannerVisible);
  const navbarBannerType = yield select(getNavbarBannerType);
  const { pathname } = yield select(
    (state: GlobalState) => state.router.location
  );

  // fire analytics event
  yield call(Analytics.trackEvent, membershipChangeEventMap[membershipState], {
    origin: determinePlanActionOrigin({
      isPlanSelectionOverlayOpen,
      isNavbarBannerOpen,
      navbarBannerType,
      pathname,
    }),
  });

  // if select change happened from the overlay, we need to dismiss
  if (isPlanSelectionOverlayOpen && isInDeliveryZone) {
    yield put(toggleOverlay(Overlays.PlanSelectionOverlay, false));
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yield call(history.push as any, "/products");
  }

  // now show success banner for confirming new plan selection
  if (membershipState !== MembershipState.NONE && isInDeliveryZone) {
    const message = `You’ve selected ${
      membershipState === MembershipState.MEMBER
        ? "Membership"
        : "Short-Term Plan"
    } : start choosing items to add to your plan!`;
    yield put(showNavbarBanner({ bannerType: BannerType.Success, message }));
    yield put(normalizeCartPrices(membershipState));
    yield delay(3000);
    yield put(dismissNavbarBanner());
  }
}

export default function* planWatcher() {
  yield takeLatest(ZIPCODE_SUBMIT_REQUEST, handleZipcode);
  yield takeLatest(RESET_ZIPCODE, handleResetZipCode);
  yield takeLatest(CHANGE_MEMBERSHIP_SELECTION, handleMembershipChange);
}
