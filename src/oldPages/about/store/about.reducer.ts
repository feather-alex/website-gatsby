import { FluxStandardAction } from "../../../types/FluxStandardActions";
import {
  FETCH_OPEN_POSITIONS_REQUEST,
  FETCH_OPEN_POSITIONS_SUCCESS,
  FETCH_OPEN_POSITIONS_FAILURE,
} from "./about.actions";

import { About } from "./about.types";

export const initialState: About = {
  isFetching: false,
  error: false,
  allDepartments: null,
};

const about = (state = initialState, action: FluxStandardAction) => {
  switch (action.type) {
    case FETCH_OPEN_POSITIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
      };

    case FETCH_OPEN_POSITIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allDepartments: action.payload,
      };

    case FETCH_OPEN_POSITIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};
export default about;
