import Request, { RequestMethod } from '../../../../api/request';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { SagaIterator } from 'redux-saga';
import {
  loadPersonalInfoFailure,
  loadPersonalInfoSuccess,
  GET_PERSONAL_INFORMATION_REQUEST,
  updatePersonalInfoFailure,
  updatePersonalInfoSuccess,
  UPDATE_PERSONAL_INFORMATION_REQUEST
} from './personal.information.actions';
import { PersonalInfoResource } from './personal.information.types';
import { logOut } from '../../../auth/login/store/login.actions';

// Load Personal Information
export function* getPersonalInfo(): SagaIterator {
  try {
    const response: PersonalInfoResource = yield call([Request, 'send'], RequestMethod.GET, '/account/profile');
    yield put(loadPersonalInfoSuccess(response));
  } catch (error) {
    yield put(loadPersonalInfoFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

// Update Personal Information
export function* updatePersonalInfo(action: FluxStandardAction): SagaIterator {
  try {
    const response: PersonalInfoResource = yield call(
      [Request, 'send'],
      RequestMethod.PUT,
      '/account/profile',
      undefined,
      {
        phone: action.payload.phone,
        email: action.payload.email
      }
    );
    yield put(updatePersonalInfoSuccess(response));
  } catch (error) {
    yield put(updatePersonalInfoFailure(error));
    if (error && error.status === 401) {
      yield put(logOut());
    }
  }
}

export default function* personalInformationWatcher(): SagaIterator {
  yield takeLatest(GET_PERSONAL_INFORMATION_REQUEST, getPersonalInfo);
  yield takeLatest(UPDATE_PERSONAL_INFORMATION_REQUEST, updatePersonalInfo);
}
