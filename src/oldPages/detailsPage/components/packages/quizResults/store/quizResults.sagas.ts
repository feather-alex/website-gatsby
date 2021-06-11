import { FluxStandardAction } from "../../../../../../types/FluxStandardActions";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeLatest } from "redux-saga/effects";
// import Report from '../../../../../../errorReporter';
import Request, { RequestMethod } from "../../../../../../api/request";
import {
  fetchQuizResultsSuccess,
  fetchQuizResultsFailure,
  FETCH_QUIZ_RESULTS_REQUEST,
  FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
  updateQuizResultsSuccess,
  updateQuizResultsFailure,
  UPDATE_QUIZ_RESULTS_REQUEST,
  TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
} from "./quizResults.actions";
import {
  getQuizAnswers,
  getQuizState,
} from "../../../../../quiz/store/quiz.selectors";
import { toggleOverlay } from "../../../../../../app/store/overlay/overlay.actions";
import { Overlays } from "../../../../../../app/store/overlay/overlay.types";
import { history } from "../../../../../../store/history";

export function* handleQuizResultsRequest(): SagaIterator {
  try {
    const quizAnswers = yield select(getQuizAnswers);

    const quizPkgs = yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/quiz/results",
      undefined,
      quizAnswers
    );

    yield call<(x: string) => void>(
      history.replace,
      `/quiz-results/${quizPkgs.uuid}`
    );
    yield put(fetchQuizResultsSuccess(quizPkgs));
  } catch (error) {
    yield put(fetchQuizResultsFailure(error));
    // start giving us some more insight as to why the quiz request is malformed / failed
    const quizState = yield select(getQuizState);
    const quizAnswers = yield select(getQuizAnswers);
    // yield call(Report.setContext, { quizState, quizAnswers });
    // yield call(Report.captureException, error);
    // yield call(Report.resetContext);
  }
}

export function* handleQuizResultsRequestByUuid(
  action: FluxStandardAction
): SagaIterator {
  try {
    const quizPkgs = yield call(
      [Request, "send"],
      RequestMethod.GET,
      `/quiz/results/${action.payload.uuid}`,
      undefined
    );

    yield put(
      fetchQuizResultsSuccess({
        ...quizPkgs.items,
        name: quizPkgs.name,
        email: quizPkgs.email,
        uuid: action.payload.uuid,
      })
    );
  } catch (error) {
    yield put(fetchQuizResultsFailure(error));
  }
}

export function* handleUpdateQuizResults(
  action: FluxStandardAction
): SagaIterator {
  try {
    const quizPkgs = yield call(
      [Request, "send"],
      RequestMethod.PUT,
      `/quiz/results/${action.payload.uuid}`,
      undefined,
      action.payload.quizPackages
    );

    yield put(
      updateQuizResultsSuccess({ ...quizPkgs, uuid: action.payload.uuid })
    );
  } catch (error) {
    yield put(updateQuizResultsFailure(error));
  }
}

// The TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY sets the current active room and then
// calls TOGGLE_OVERLAY to actually toggle the overlay
export function* handleEditQuizResultsToggleOverlay() {
  yield put(toggleOverlay(Overlays.EditQuizResultsOverlay, true));
}

export default function* quizResultsWatcher(): SagaIterator {
  yield takeLatest(FETCH_QUIZ_RESULTS_REQUEST, handleQuizResultsRequest);
  yield takeLatest(
    FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
    handleQuizResultsRequestByUuid
  );
  yield takeLatest(UPDATE_QUIZ_RESULTS_REQUEST, handleUpdateQuizResults);
  yield takeLatest(
    TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
    handleEditQuizResultsToggleOverlay
  );
}
