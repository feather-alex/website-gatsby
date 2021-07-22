import { FluxStandardAction } from "../../../../../../types/FluxStandardActions";
import { QuizAnswers } from "../../../../../quiz/store/quiz.types";
import { QuizPkgs, StyleQuizResult, QuizRoom } from "./quizResults.types";
import { APIError } from "../../../../../../types/ReduxState";

// Get quiz results request
export const FETCH_QUIZ_RESULTS_REQUEST = "FETCH_QUIZ_RESULTS_REQUEST";

export type FetchQuizResults = (quizAnswers: QuizAnswers) => QuizResultsActions;

export const fetchQuizResults: FetchQuizResults = (
  quizAnswers: QuizAnswers
) => ({
  type: FETCH_QUIZ_RESULTS_REQUEST,
  payload: { quizAnswers },
});

// Get quiz results by uuid request
export const FETCH_QUIZ_RESULTS_BY_UUID_REQUEST =
  "FETCH_QUIZ_RESULTS_BY_UUID_REQUEST";

export type FetchQuizResultsByUuid = (uuid: string) => QuizResultsActions;

export const fetchQuizResultsByUuid: FetchQuizResultsByUuid = (
  uuid: string
) => ({
  type: FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
  payload: { uuid },
});

// Get quiz results success
export const FETCH_QUIZ_RESULTS_SUCCESS = "FETCH_QUIZ_RESULTS_SUCCESS";

export type FetchQuizResultsSuccess = (
  quizPkgs: QuizPkgs
) => QuizResultsActions;

export const fetchQuizResultsSuccess: FetchQuizResultsSuccess = (
  quizPkgs: QuizPkgs
) => ({
  type: FETCH_QUIZ_RESULTS_SUCCESS,
  payload: { quizPkgs },
});

// Get quiz results failure
export const FETCH_QUIZ_RESULTS_FAILURE = "FETCH_QUIZ_RESULTS_FAILURE";

export type FetchQuizResultsFailure = (error: APIError) => QuizResultsActions;

export const fetchQuizResultsFailure: FetchQuizResultsFailure = (
  error: APIError
) => ({
  type: FETCH_QUIZ_RESULTS_FAILURE,
  payload: { error },
});

// Update quiz packages request
export const UPDATE_QUIZ_RESULTS_REQUEST = "UPDATE_QUIZ_RESULTS_REQUEST";

export type UpdateQuizResultsRequest = (
  uuid: string,
  quizPackages: StyleQuizResult
) => QuizResultsActions;

export const updateQuizResultsRequest: UpdateQuizResultsRequest = (
  uuid: string,
  quizPackages: StyleQuizResult
) => ({
  type: UPDATE_QUIZ_RESULTS_REQUEST,
  payload: { uuid, quizPackages },
});

// Update quiz packages success
export const UPDATE_QUIZ_RESULTS_SUCCESS = "UPDATE_QUIZ_RESULTS_SUCCESS";

export type UpdateQuizResultsSuccess = (
  quizPkgs: QuizPkgs
) => QuizResultsActions;

export const updateQuizResultsSuccess: UpdateQuizResultsSuccess = (
  quizPkgs: QuizPkgs
) => ({
  type: UPDATE_QUIZ_RESULTS_SUCCESS,
  payload: { quizPkgs },
});

// Update quiz packages failure
export const UPDATE_QUIZ_RESULTS_FAILURE = "UPDATE_QUIZ_RESULTS_FAILURE";

export type UpdateQuizResultsFailure = (error: APIError) => QuizResultsActions;

export const updateQuizResultsFailure: UpdateQuizResultsFailure = (
  error: APIError
) => ({
  type: UPDATE_QUIZ_RESULTS_FAILURE,
  payload: { error },
});

// Set the active quiz room and toggle the edit quiz results overlay
export const TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY =
  "TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY";

export type ToggleEditQuizResultsOverlay = (
  roomId: QuizRoom
) => QuizResultsActions;

export const toggleEditQuizResultsOverlay: ToggleEditQuizResultsOverlay = (
  roomId: QuizRoom
) => ({
  type: TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
  payload: { roomId },
});

export type QuizResultsActions =
  | FluxStandardAction<
      typeof FETCH_QUIZ_RESULTS_REQUEST,
      {
        quizAnswers: QuizAnswers;
      }
    >
  | FluxStandardAction<
      typeof FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
      {
        uuid: string;
      }
    >
  | FluxStandardAction<
      typeof FETCH_QUIZ_RESULTS_SUCCESS,
      {
        quizPkgs: QuizPkgs;
      }
    >
  | FluxStandardAction<
      typeof FETCH_QUIZ_RESULTS_FAILURE,
      {
        error: APIError;
      }
    >
  | FluxStandardAction<
      typeof UPDATE_QUIZ_RESULTS_REQUEST,
      {
        uuid: string;
        quizPackages: StyleQuizResult;
      }
    >
  | FluxStandardAction<
      typeof UPDATE_QUIZ_RESULTS_SUCCESS,
      {
        quizPkgs: QuizPkgs;
      }
    >
  | FluxStandardAction<
      typeof UPDATE_QUIZ_RESULTS_FAILURE,
      {
        error: APIError;
      }
    >
  | FluxStandardAction<
      typeof TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
      {
        roomId: QuizRoom;
      }
    >;
