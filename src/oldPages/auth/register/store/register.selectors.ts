import { State as GlobalState } from '../../../../types/ReduxState';

export const getError = ({ auth }: GlobalState) => auth.register.error;
export const getIsFetching = ({ auth }: GlobalState) => auth.register.isFetching;
export const getEmail = ({ auth }: GlobalState) => auth.register.email;
export const getHasRegistered = ({ auth }: GlobalState) => auth.register.hasRegistered;
