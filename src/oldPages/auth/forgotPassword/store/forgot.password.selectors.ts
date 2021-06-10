import { State as GlobalState } from '../../../../types/ReduxState';

export const getError = ({ auth }: GlobalState) => auth.forgotPassword.error;
export const getIsFetching = ({ auth }: GlobalState) => auth.forgotPassword.isFetching;
export const getHasSentResetPasswordLink = ({ auth }: GlobalState) => auth.forgotPassword.hasSentResetPasswordLink;
export const getEmail = ({ auth }: GlobalState) => auth.forgotPassword.email;
