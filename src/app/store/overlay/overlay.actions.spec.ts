import {
  toggleOverlay,
  TOGGLE_OVERLAY,
  openOverlay,
  OPEN_OVERLAY,
  closeOverlay,
  CLOSE_OVERLAY
} from './overlay.actions';
import { Overlays } from './overlay.types';

describe('Overlay Actions', () => {
  it('should create an action to toggle an overlay open', () => {
    const expectedAction = {
      type: TOGGLE_OVERLAY,
      payload: { overlay: Overlays.AddItemsToCurrentPlanOverlay, isOpen: true }
    };

    const action = toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, true);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to toggle an overlay closed', () => {
    const expectedAction = {
      type: TOGGLE_OVERLAY,
      payload: { overlay: Overlays.AddItemsToCurrentPlanOverlay, isOpen: false }
    };

    const action = toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, false);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to toggle an overlay closed', () => {
    const expectedAction = {
      type: TOGGLE_OVERLAY,
      payload: { overlay: Overlays.AddItemsToCurrentPlanOverlay, isOpen: false }
    };

    const action = toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, false);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to open an overlay', () => {
    const expectedAction = {
      type: OPEN_OVERLAY,
      payload: { overlay: Overlays.AddItemsToCurrentPlanOverlay }
    };

    const action = openOverlay(Overlays.AddItemsToCurrentPlanOverlay);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to close an overlay', () => {
    const expectedAction = {
      type: CLOSE_OVERLAY,
      payload: { overlay: Overlays.AddItemsToCurrentPlanOverlay }
    };

    const action = closeOverlay(Overlays.AddItemsToCurrentPlanOverlay);
    expect(action).toEqual(expectedAction);
  });
});
