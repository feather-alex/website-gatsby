import { ADD_TRACKING_PARAMETERS } from '../constants/actions';

interface Action {
  response: { [x: string]: string }[];
  type: string;
}

// ===== Reducers =====
export const initialState = {};

const trackingParameters = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TRACKING_PARAMETERS: {
      let stateObj = { ...state };

      action.response.map((obj) => {
        stateObj = { ...stateObj, ...obj };
      });

      return stateObj;
    }
    default:
      return state;
  }
};

export default trackingParameters;

export interface AddParameters {
  (parameters: { [x: string]: string }[]): {
    type: string;
    response: { [x: string]: string }[];
  };
}
// ===== Actions =====
export const addParameters = (parameters: { [x: string]: string }[]) => {
  return {
    type: ADD_TRACKING_PARAMETERS,
    response: parameters
  };
};
