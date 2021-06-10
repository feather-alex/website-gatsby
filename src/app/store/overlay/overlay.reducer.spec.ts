import overlayReducer, { initialState } from './overlay.reducer';
import { OverlayState, Overlays } from './overlay.types';
import { openOverlay, closeOverlay } from './overlay.actions';

describe('Overlay Reducer', () => {
  it('should handle the open overlay action', () => {
    const state: OverlayState = {
      ...initialState
    };
    const expectedState = {
      ...state,
      isQuizOverlayOpen: true
    };

    const action = openOverlay(Overlays.QuizOverlay);

    const overlayState = overlayReducer(state, action);

    expect(overlayState).toEqual(expectedState);
  });

  it('should handle the close overlay action', () => {
    const state: OverlayState = {
      ...initialState,
      isMiniCartOpen: true
    };
    const expectedState = {
      ...initialState
    };

    const action = closeOverlay(Overlays.MiniCartOverlay);

    const overlayState = overlayReducer(state, action);

    expect(overlayState).toEqual(expectedState);
  });
});
