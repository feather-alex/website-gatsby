import { FluxStandardAction } from '../../../../types/FluxStandardActions';
import { APIError } from '../../../../types/ReduxState';
import { RegisterRequestResource } from './register.types';
import * as actions from './register.actions';

describe('Registration', () => {
  const error: APIError = {
    error: 'Here is another',
    message: 'Some error about failure',
    status: 400
  };
  const email = 'user@email.com';
  const password = 'FeatherAccounts2';

  it('should create a register request action', () => {
    const credentials: RegisterRequestResource = { email, password };
    const expectedAction: FluxStandardAction = {
      type: actions.REGISTER_REQUEST,
      payload: { credentials: { email, password } }
    };
    const action = actions.registerRequest(credentials);
    expect(action).toEqual(expectedAction);
  });

  it('should create a register success action', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.REGISTER_SUCCESS
    };
    const action = actions.registerSuccess();
    expect(action).toEqual(expectedAction);
  });

  it('should create a register failure action', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.REGISTER_FAILURE,
      payload: { error }
    };
    const action = actions.registerFailure(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create a reset has registered action', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.RESET_HAS_REGISTERED
    };
    const action = actions.resetHasRegistered();
    expect(action).toEqual(expectedAction);
  });

  it('should set the email for the registration form', () => {
    const expectedAction: FluxStandardAction = {
      type: actions.SET_REGISTER_EMAIL,
      payload: { email }
    };
    const action = actions.setRegisterEmail(email);
    expect(action).toEqual(expectedAction);
  });
});
