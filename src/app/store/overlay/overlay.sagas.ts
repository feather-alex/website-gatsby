import { takeEvery, call, select, put } from "redux-saga/effects";
import { TOGGLE_OVERLAY, openOverlay, closeOverlay } from "./overlay.actions";
import { getOpenOverlay } from "./overlay.selectors";
import { Overlays } from "./overlay.types";
import { FluxStandardAction } from "../../../types/FluxStandardActions";
import Analytics from "../../../analytics/analytics";
import { QUIZ } from "../../../analytics/quiz/events";
import { MEMBERSHIP } from "../../../analytics/membership/events";
import { PRODUCT_CATEGORY } from "../../../analytics/product-category/events";

const backgroundScrollOverlays = {
  [Overlays.MiniCartOverlay]: true,
  [Overlays.MobileNavOverlay]: true,
  [Overlays.MobileProductFilters]: true,
  [Overlays.DimensionsOverlay]: true,
  [Overlays.QuizOverlay]: true,
};

type BodyOverflowStyle = "hidden" | "auto";

export function setBodyOverflowStyle(overflowStyle: BodyOverflowStyle) {
  if (document) {
    document.body.style.overflow = overflowStyle;
  }
}

const analyticsTrackedOverlays = {
  [Overlays.PlanSelectionOverlay]: {
    openEvent: MEMBERSHIP.OPEN,
    closeEvent: MEMBERSHIP.CLOSE,
  },
  [Overlays.QuizOverlay]: { openEvent: QUIZ.OPEN, closeEvent: QUIZ.CLOSE },
  [Overlays.MobileProductFilters]: {
    openEvent: PRODUCT_CATEGORY.OPEN,
    closeEvent: PRODUCT_CATEGORY.CLOSE,
  },
};

export function trackOverlayToggle(overlay: Overlays, isOpen: boolean) {
  const event = isOpen ? "openEvent" : "closeEvent";
  Analytics.trackEvent(analyticsTrackedOverlays[overlay][event]);
}

export function* handleToggleOverlay(action: FluxStandardAction) {
  const { isOpen, overlay } = action.payload;
  // handle if we are opening an overlay
  if (isOpen) {
    // is there any other overlay currently open?
    const currentOpenOverlay = yield select(getOpenOverlay);
    if (currentOpenOverlay) {
      yield put(closeOverlay(currentOpenOverlay));
      // check if its a background scroll overlay
      if (backgroundScrollOverlays[currentOpenOverlay]) {
        yield call(setBodyOverflowStyle, "auto");
      }
      if (analyticsTrackedOverlays[overlay]) {
        yield call(trackOverlayToggle, overlay, false);
      }
    }
    yield put(openOverlay(overlay));
    // check if its a background scroll overlay
    if (backgroundScrollOverlays[overlay]) {
      yield call(setBodyOverflowStyle, "hidden");
    }
    if (analyticsTrackedOverlays[overlay]) {
      yield call(trackOverlayToggle, overlay, true);
    }
  } else {
    // handle if we are closing an overlay
    yield put(closeOverlay(overlay));
    // check if its a background scroll overlay
    if (backgroundScrollOverlays[overlay]) {
      yield call(setBodyOverflowStyle, "auto");
    }
    if (analyticsTrackedOverlays[overlay]) {
      yield call(trackOverlayToggle, overlay, false);
    }
  }
}

export default function* overlayWatcher() {
  yield takeEvery(TOGGLE_OVERLAY, handleToggleOverlay);
}
