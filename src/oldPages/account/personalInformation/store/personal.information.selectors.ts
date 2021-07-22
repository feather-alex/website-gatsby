import { State as GlobalState } from "../../../../types/ReduxState";

export const isFetching = ({ accounts }: GlobalState) =>
  accounts.personalInformation.isFetching;
export const isUserFirstLogIn = ({ accounts }: GlobalState) =>
  accounts.personalInformation.accountLastAccessedAt === null;
export const getAddress = ({ accounts }: GlobalState) =>
  accounts.personalInformation.addressInfo;
export const getFirstName = ({ accounts }: GlobalState) =>
  accounts.personalInformation.firstName;
export const getLastName = ({ accounts }: GlobalState) =>
  accounts.personalInformation.lastName;
export const getPhone = ({ accounts }: GlobalState) =>
  accounts.personalInformation.phone;
export const getEmail = ({ accounts }: GlobalState) =>
  accounts.personalInformation.email;
export const getError = ({ accounts }: GlobalState) =>
  accounts.personalInformation.error;
