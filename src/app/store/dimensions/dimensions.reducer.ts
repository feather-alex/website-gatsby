import { HANDLE_WINDOW_RESIZE } from './dimensions.actions';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { DimensionsState } from './dimensions.types';

export const initialState: DimensionsState = {
  height: document.documentElement.clientHeight,
  width: document.documentElement.clientWidth
};

const windowDimensions = (state: DimensionsState = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case HANDLE_WINDOW_RESIZE: {
      const { height, width } = action.payload;
      return {
        ...state,
        height,
        width
      };
    }
    default:
      return state;
  }
};

export default windowDimensions;
