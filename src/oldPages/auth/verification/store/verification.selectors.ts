import { State as GlobalState } from '../../../../types/ReduxState';

export const getError = ({ auth }: GlobalState) => auth.verification.error;
export const getIsFetching = ({ auth }: GlobalState) => auth.verification.isFetching;
export const getHasResentVerificationEmail = ({ auth }: GlobalState) => auth.verification.hasResentVerification;
