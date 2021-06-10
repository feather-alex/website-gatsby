import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { put, takeLeading } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as actions from './dimensions.actions';

export function* handleWindowResize(action: FluxStandardAction): SagaIterator {
  // Destructure height and width from payload.
  const { height, width } = action.payload;

  // Dispatch action creator.
  yield put(actions.handleWindowResize(height, width));
}

export default function* dimensionsWatcher(): SagaIterator {
  yield takeLeading(actions.HANDLE_WINDOW_RESIZE, handleWindowResize);
}
