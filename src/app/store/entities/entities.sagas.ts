import Request, { RequestMethod } from '../../../api/request';
import { SagaIterator } from 'redux-saga';
import * as actions from './entities.actions';
import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';

export function* getProductEntities(): SagaIterator {
  try {
    // Make API request.
    const payload = yield call([Request, 'send'], RequestMethod.GET, '/entities');

    // Dispatch action for successful request.
    yield put(actions.getEntitiesSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.getEntitiesFailure(error));
  }
}

export function* getUpdatedDeliveryDates(): SagaIterator {
  try {
    // Make API request.
    const payload = yield call([Request, 'send'], RequestMethod.GET, '/entities');

    // Dispatch action for successful request.
    yield put(actions.getUpdatedDeliveryDatesSuccess(payload));
  } catch (error) {
    // Dispatch action for failed request.
    yield put(actions.getUpdatedDeliveryDatesFailure(error));
  }
}

export default function* entitiesWatcher(): SagaIterator {
  yield takeLatest(actions.GET_ENTITIES_REQUEST, getProductEntities);
  yield takeLatest(actions.GET_DELIVERY_DATES_REQUEST, getUpdatedDeliveryDates);
}
