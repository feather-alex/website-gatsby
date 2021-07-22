import { State as GlobalState } from "../../../types/ReduxState";

export const getError = ({ app }: GlobalState) => app.newsletter.error;
export const getEmail = ({ app }: GlobalState) => app.newsletter.email;
export const getIsFetching = ({ app }: GlobalState) =>
  app.newsletter.isFetching;
export const getDisplaySuccessMessage = ({ app }: GlobalState) =>
  app.newsletter.displaySuccess;
