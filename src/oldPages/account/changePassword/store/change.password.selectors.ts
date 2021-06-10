import { State as GlobalState } from '../../../../types/ReduxState';

export const getError = ({ accounts }: GlobalState) => accounts.changePassword.error;
export const getIsFetching = ({ accounts }: GlobalState) => accounts.changePassword.isFetching;
export const getIsPasswordUpdated = ({ accounts }: GlobalState) => accounts.changePassword.isPasswordUpdated;
