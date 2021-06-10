import { PersonalInfoResource } from './personal.information.types';
import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './personal.information.actions';
import { expectSaga } from 'redux-saga-test-plan';
import * as sagas from './personal.information.sagas';
import Request, { RequestMethod } from '../../../../api/request';
import { APIError } from '../../../../types/ReduxState';
import { logOut } from '../../../auth/login/store/login.actions';

describe('Personal Information - Sagas', () => {
  describe('Get personal information', () => {
    it('Should handle successfully fetching personal information', () => {
      const personalInfo: PersonalInfoResource = {
        subscriptions: [],
        accountLastAccessedAt: '',
        firstName: 'Eng',
        lastName: 'Feather',
        phone: '1231231231',
        email: 'eng@livefeather.com'
      };

      return expectSaga(sagas.getPersonalInfo)
        .provide([[matchers.call([Request, 'send'], RequestMethod.GET, '/account/profile'), personalInfo]])
        .put(actions.loadPersonalInfoSuccess(personalInfo))
        .run();
    });

    it('Should handle unsuccessfully fetching personal information', () => {
      const apiError: APIError = {
        error: '',
        message: '',
        status: 500
      };

      return expectSaga(sagas.getPersonalInfo)
        .provide([[matchers.call([Request, 'send'], RequestMethod.GET, '/account/profile'), Promise.reject(apiError)]])
        .put(actions.loadPersonalInfoFailure(apiError))
        .run();
    });

    it('Should handle unsuccessfully fetching personal information due to being unauthenticated', () => {
      const apiError: APIError = {
        error: 'Unauthenticated',
        message: 'do not know you',
        status: 401
      };

      return expectSaga(sagas.getPersonalInfo)
        .provide([[matchers.call([Request, 'send'], RequestMethod.GET, '/account/profile'), Promise.reject(apiError)]])
        .put(actions.loadPersonalInfoFailure(apiError))
        .put(logOut())
        .run();
    });
  });

  describe('Update personal information', () => {
    const updatedInfo = {
      email: 'new.eng@livefeather.com',
      phone: '4564564564'
    };

    const updatedPersonalInfoResource: PersonalInfoResource = {
      subscriptions: [],
      accountLastAccessedAt: '',
      firstName: 'Eng',
      lastName: 'Feather',
      phone: '4564564564',
      email: 'new.eng@livefeather.com'
    };

    const action: FluxStandardAction = {
      type: actions.UPDATE_PERSONAL_INFORMATION_REQUEST,
      payload: updatedInfo
    };

    it('Should handle successfully updating personal information', () => {
      return expectSaga(sagas.updatePersonalInfo, action)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.PUT, '/account/profile', undefined, updatedInfo),
            updatedPersonalInfoResource
          ]
        ])
        .put({
          type: actions.UPDATE_PERSONAL_INFORMATION_SUCCESS,
          payload: updatedPersonalInfoResource
        })
        .run();
    });

    it('Should handle unsuccessfully updating personal information', () => {
      const apiError: APIError = {
        error: '',
        message: '',
        status: 500
      };

      return expectSaga(sagas.updatePersonalInfo, action)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.PUT, '/account/profile', undefined, updatedInfo),
            Promise.reject(apiError)
          ]
        ])
        .put(actions.updatePersonalInfoFailure(apiError))
        .run();
    });

    it('Should handle unsuccessfully updating personal information due to being unauthenticated', () => {
      const apiError: APIError = {
        error: 'Unauthenticated',
        message: 'who you dude?',
        status: 401
      };

      return expectSaga(sagas.updatePersonalInfo, action)
        .provide([
          [
            matchers.call([Request, 'send'], RequestMethod.PUT, '/account/profile', undefined, updatedInfo),
            Promise.reject(apiError)
          ]
        ])
        .put(actions.updatePersonalInfoFailure(apiError))
        .put(logOut())
        .run();
    });
  });
});
