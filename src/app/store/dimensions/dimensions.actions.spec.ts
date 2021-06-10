import { FluxStandardAction } from '../../../types/FluxStandardActions';
import * as actions from './dimensions.actions';

describe('Window Dimensions - Actions', () => {
  it('Should create an action to update window dimensions.', () => {
    const windowHeight = 13;
    const windowWidth = 7;

    const payload = {
      height: windowHeight,
      width: windowWidth
    };

    const expectedAction: FluxStandardAction = {
      type: actions.HANDLE_WINDOW_RESIZE,
      payload
    };

    const actionCreator = actions.handleWindowResize(windowHeight, windowWidth);

    expect(actionCreator).toEqual(expectedAction);
  });
});
