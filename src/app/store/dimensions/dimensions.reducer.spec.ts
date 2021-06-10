import { FluxStandardAction } from '../../../types/FluxStandardActions';
import dimensionsReducer from './dimensions.reducer';
import { DimensionsState } from './dimensions.types';
import * as actions from './dimensions.actions';

describe('Window Dimensions - Reducer', () => {
  const initialState: DimensionsState = {
    height: 0,
    width: 0
  };

  it('Should handle action: HANDLE_WINDOW_RESIZE', () => {
    const payload = {
      height: 13,
      width: 7
    };

    const action: FluxStandardAction = {
      type: actions.HANDLE_WINDOW_RESIZE,
      payload
    };

    const reduced = dimensionsReducer(initialState, action);

    expect(reduced.height).toBe(payload.height);
    expect(reduced.width).toBe(payload.width);
  });
});
