import { Overlays } from "./overlay.types";
import { FluxStandardAction } from "../../../types/FluxStandardActions";

export const TOGGLE_OVERLAY = "TOGGLE_OVERLAY";

export type ToggleOverlay = (
  overlay: Overlays,
  isOpen: boolean
) => FluxStandardAction;

export const toggleOverlay: ToggleOverlay = (
  overlay: Overlays,
  isOpen: boolean
) => ({
  type: TOGGLE_OVERLAY,
  payload: { overlay, isOpen },
});

export const OPEN_OVERLAY = "OPEN_OVERLAY";

export type OpenOverlay = (overlay: Overlays) => FluxStandardAction;

export const openOverlay: OpenOverlay = (overlay) => ({
  type: OPEN_OVERLAY,
  payload: { overlay },
});

export const CLOSE_OVERLAY = "CLOSE_OVERLAY";

export type CloseOverlay = (overlay: Overlays) => FluxStandardAction;

export const closeOverlay: CloseOverlay = (overlay) => ({
  type: CLOSE_OVERLAY,
  payload: { overlay },
});
