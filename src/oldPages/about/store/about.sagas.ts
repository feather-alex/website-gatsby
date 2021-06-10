import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_OPEN_POSITIONS_REQUEST, fetchOpenPositionsSuccess, fetchOpenPositionsFailure } from './about.actions';
import { Department } from './about.types';

export function fetchJobs() {
  return (
    fetch('https://boards-api.greenhouse.io/v1/boards/feather/departments')
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => res.json())
      .catch((error) => error)
  );
}

export function* handleFetchOpenPositions(): SagaIterator {
  try {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(fetchJobs);

    yield put(fetchOpenPositionsSuccess(response.departments as Department[]));
  } catch (error) {
    yield put(fetchOpenPositionsFailure());
  }
}

export default function* aboutWatchers() {
  yield takeLatest(FETCH_OPEN_POSITIONS_REQUEST, handleFetchOpenPositions);
}
