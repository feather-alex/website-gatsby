import { QuizResultsState } from "./quizResults.types";
import {
  FETCH_QUIZ_RESULTS_REQUEST,
  FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
  FETCH_QUIZ_RESULTS_SUCCESS,
  FETCH_QUIZ_RESULTS_FAILURE,
  UPDATE_QUIZ_RESULTS_REQUEST,
  TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
  QuizResultsActions,
} from "./quizResults.actions";

export const initialState: QuizResultsState = {
  isFetching: false,
  error: null,
  data: null,
  activeQuizRoom: null,
};

const quizResultsReducer = (
  state: QuizResultsState = initialState,
  action: QuizResultsActions
) => {
  switch (action.type) {
    case FETCH_QUIZ_RESULTS_REQUEST:
    case FETCH_QUIZ_RESULTS_BY_UUID_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case FETCH_QUIZ_RESULTS_SUCCESS:
      return {
        ...state,
        isFetching: false,

        data: action.payload.quizPkgs,
      };

    case FETCH_QUIZ_RESULTS_FAILURE:
      return {
        ...state,
        isFetching: false,

        error: action.payload.error,
      };

    case UPDATE_QUIZ_RESULTS_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.quizPackages.items,
        },
      };

    case TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY:
      return {
        ...state,
        activeQuizRoom: action.payload.roomId,
      };

    default:
      return state;
  }
};

export default quizResultsReducer;
