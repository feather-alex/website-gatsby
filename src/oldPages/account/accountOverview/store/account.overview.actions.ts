import { createAction } from '@reduxjs/toolkit';

import createRequestAction from '../../../../utils/createRequestAction';
import { Subscription } from './account.overview.types';
import { APIError } from '../../../../types/ReduxState';

export const getAccountOverview = createRequestAction<undefined, Subscription, APIError>('GET_ACCOUNT_OVERVIEW');

export const SET_ACCOUNT_SUBSCRIPTION_START_DATE = 'SET_ACCOUNT_SUBSCRIPTION_START_DATE';
export const setAccountSubscriptionStartDate = createAction<Date>(SET_ACCOUNT_SUBSCRIPTION_START_DATE);
