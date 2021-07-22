import { State as GlobalState } from "../../../../types/ReduxState";

export const getIsFetching = ({ featherPerks }: GlobalState) =>
  featherPerks.isFetching;
export const getError = ({ featherPerks }: GlobalState) => featherPerks.error;
export const getPerks = ({ featherPerks }: GlobalState) => featherPerks.perks;
