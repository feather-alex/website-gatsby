import {
  MobileNavContentRequestPayload,
  MobileNavContentSuccessPayload,
  ShowNavbarBannerPayload
} from './navbar.types';
import createRequestAction from '../../../utils/createRequestAction';
import { APIError } from '../../../types/ReduxState';
import { createAction } from '@reduxjs/toolkit';

export const SHOW_NAVBAR_BANNER = 'SHOW_NAVBAR_BANNER';
export const showNavbarBanner = createAction<ShowNavbarBannerPayload>(SHOW_NAVBAR_BANNER);

export const DISMISS_NAVBAR_BANNER = 'DISMISS_NAVBAR_BANNER';
export const dismissNavbarBanner = createAction(DISMISS_NAVBAR_BANNER);

export const RESET_NAVBAR_BANNER = 'RESET_NAVBAR_BANNER';
export const resetNavbarBanner = createAction(RESET_NAVBAR_BANNER);

export const getMobileNavContent = createRequestAction<
  MobileNavContentRequestPayload,
  MobileNavContentSuccessPayload,
  APIError
>('GET_MOBILE_NAV_CONTENT');
