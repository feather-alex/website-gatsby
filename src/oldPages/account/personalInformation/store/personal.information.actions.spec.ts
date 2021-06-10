import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import * as actions from './personal.information.actions';
import { PersonalInfoResource } from './personal.information.types';
import { APIError } from '../../../../types/ReduxState';

describe('Personal Info Page', () => {
  const personalInfo: PersonalInfoResource = {
    subscriptions: [],
    accountLastAccessedAt: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  const error: APIError = {
    status: 500,
    error: 'error stack here',
    message: 'error message that tells you nothing'
  };

  describe('Get personal information', () => {
    it('should create a get personal information request action', () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_PERSONAL_INFORMATION_REQUEST
      };

      const action = actions.loadPersonalInfo();
      expect(action).toEqual(expectedAction);
    });

    it('should create a get personal information sucess action', () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_PERSONAL_INFORMATION_SUCCESS,
        payload: personalInfo
      };

      const action = actions.loadPersonalInfoSuccess(personalInfo);
      expect(action).toEqual(expectedAction);
    });

    it('should create a get personal information failure action', () => {
      const expectedAction: FluxStandardAction = {
        type: actions.GET_PERSONAL_INFORMATION_FAILURE,
        payload: error,
        error: true
      };

      const action = actions.loadPersonalInfoFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('Update personal information', () => {
    it('should create an update personal information request action', () => {
      const email = 'eng@livefeather.com';
      const phone = '1231231231';

      const expectedAction: FluxStandardAction = {
        type: actions.UPDATE_PERSONAL_INFORMATION_REQUEST,
        payload: { email, phone }
      };

      const action = actions.updatePersonalInfo(email, phone);
      expect(action).toEqual(expectedAction);
    });

    it('should create an update personal information success action', () => {
      const expectedAction: FluxStandardAction = {
        type: actions.UPDATE_PERSONAL_INFORMATION_SUCCESS,
        payload: personalInfo
      };

      const action = actions.updatePersonalInfoSuccess(personalInfo);
      expect(action).toEqual(expectedAction);
    });

    it('should create an update personal information failure action', () => {
      const expectedAction: FluxStandardAction = {
        type: actions.UPDATE_PERSONAL_INFORMATION_FAILURE,
        payload: error,
        error: true
      };

      const action = actions.updatePersonalInfoFailure(error);
      expect(action).toEqual(expectedAction);
    });
  });
});
