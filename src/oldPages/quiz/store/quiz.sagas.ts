import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SUBMIT_QUIZ, quizOpened } from './quiz.actions';
import { getLocationPathBeforeQuizOpened, getQuizAnswers } from './quiz.selectors';
import { fetchQuizResults } from '../../detailsPage/components/packages/quizResults/store/quizResults.actions';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import Analytics from '../../../analytics/analytics';
import { QUIZ } from '../../../analytics/quiz/events';
import { quizFinalStepPayloadMapping } from '../../../analytics/quiz/payload-mappings';
import { history } from '../../../store/history';

export function* handleQuizSubmission(action: FluxStandardAction) {
  // get properties from payload for analytics
  const { name, email } = action.payload;
  // track user
  yield call(Analytics.trackUser, {
    properties: {
      name,
      email
    }
  });

  // track event
  yield call(
    Analytics.trackEvent,
    QUIZ.SUBMITTED,
    quizFinalStepPayloadMapping({
      name,
      email
    })
  );

  const quizAnswers = yield select(getQuizAnswers);
  yield put(fetchQuizResults(quizAnswers));
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yield call(history.push as any, '/make-your-own-package');
}

let previousRoutePath = '';
export function* handleLocationChange(action: FluxStandardAction) {
  if (action.payload.location.pathname.includes('/style-quiz')) {
    const currentBackToPath = yield select(getLocationPathBeforeQuizOpened);
    if (currentBackToPath !== previousRoutePath) {
      yield put(quizOpened(previousRoutePath));
    }
  } else {
    previousRoutePath = action.payload.location.pathname;
  }
}

export default function* () {
  yield takeLatest(SUBMIT_QUIZ, handleQuizSubmission);
  yield takeEvery(LOCATION_CHANGE, handleLocationChange);
}
