import { FluxStandardAction, ActionCreator } from '../../../../types/FluxStandardActions';
import { AccountHistoryResource } from './account.history.types';
import { APIError } from '../../../../types/ReduxState';

export const GET_ACCOUNT_HISTORY_REQUEST = 'GET_ACCOUNT_HISTORY_REQUEST';
export const GET_ACCOUNT_HISTORY_SUCCESS = 'GET_ACCOUNT_HISTORY_SUCCESS';
export const GET_ACCOUNT_HISTORY_FAILURE = 'GET_ACCOUNT_HISTORY_FAILURE';
export const RESET_STATE = 'RESET_STATE';

export type GetAccountHistorySuccess = (accountHistory: AccountHistoryResource) => FluxStandardAction;
export type GetAccountHistoryFailure = (error: APIError) => FluxStandardAction;

export const getAccountHistory: ActionCreator = () => ({
  type: GET_ACCOUNT_HISTORY_REQUEST
});

export const getAccountHistorySuccess: GetAccountHistorySuccess = (accountHistory: AccountHistoryResource) => ({
  type: GET_ACCOUNT_HISTORY_SUCCESS,
  payload: accountHistory
});

export const getAccountHistoryFailure: GetAccountHistoryFailure = (error: APIError) => ({
  type: GET_ACCOUNT_HISTORY_FAILURE,
  payload: error,
  error: true
});

export const resetState: ActionCreator = () => ({
  type: RESET_STATE
});
