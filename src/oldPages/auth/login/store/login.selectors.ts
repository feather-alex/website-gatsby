import { State as GlobalState } from "../../../../types/ReduxState";
import { createSelector } from "reselect";

export const getError = ({ auth }: GlobalState) => auth.login.error;
export const getIsFetching = ({ auth }: GlobalState) => auth.login.isFetching;
export const getEmail = ({ auth }: GlobalState) => auth.login.email;
export const getIsAuthenticated = ({ auth }: GlobalState) =>
  auth.login.authenticated;
export const getIsFirstLogIn = ({ auth }: GlobalState) =>
  auth.login.isFirstLogin;
export const getName = ({ auth }: GlobalState) => auth.login.name;
export const getHasViewedWelcomeModal = ({ auth }: GlobalState) =>
  auth.login.hasViewedWelcomeModal;

export const getAccountName = createSelector(
  getIsAuthenticated,
  getName,
  (authenticated, name) => {
    if (!authenticated || name === "") {
      return null;
    } else {
      const accountName = name.charAt(0).toUpperCase() + name.slice(1);
      let whose = `${accountName}'s`;
      if (accountName && accountName.slice(-1) === "s") {
        whose = `${accountName}'`;
      }
      return whose;
    }
  }
);
export const getEmailHasNotBeenVerified = createSelector(
  getError,
  (error) => error && error.status === 403
);
