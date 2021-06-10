import { combineReducers } from 'redux';
import forgotPassword, {
  initialState as forgotPasswordInitialState
} from './forgotPassword/store/forgot.password.reducer';
import login, { initialState as loginInitialState } from './login/store/login.reducer';
import register, { initialState as registerInitialState } from './register/store/register.reducer';
import verification, { initialState as verificationInitialState } from './verification/store/verification.reducer';

export const initialState = {
  forgotPassword: forgotPasswordInitialState,
  login: loginInitialState,
  register: registerInitialState,
  verification: verificationInitialState
};

export default combineReducers({
  forgotPassword,
  login,
  register,
  verification
});
