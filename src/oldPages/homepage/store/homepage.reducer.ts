import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { HomepageContentState, HomepageContentSuccessPayload } from './homepage.types';
import { APIError } from '../../../types/ReduxState';
import { getHomepageContent } from './homepage.actions';

export const initialState: HomepageContentState = {
  isFetching: false,
  error: null,
  meta: null,
  textLockup: null,
  hero: null,
  sections: null,
  bestSellers: null,
  shopByRoom: null,
  reviews: null
};

export default createReducer(initialState, {
  [getHomepageContent.request.type](state: HomepageContentState) {
    state.isFetching = true;
    state.error = null;
  },

  [getHomepageContent.success.type](state: HomepageContentState, action: PayloadAction<HomepageContentSuccessPayload>) {
    state.isFetching = false;
    state.error = null;
    state.meta = action.payload.meta;
    state.textLockup = action.payload.textLockup;
    state.hero = action.payload.hero;
    state.sections = action.payload.homepageSections;
    state.bestSellers = action.payload.bestSellers;
    state.shopByRoom = action.payload.shopByRoom;
    state.reviews = action.payload.reviews;
  },

  [getHomepageContent.failure.type](state: HomepageContentState, action: PayloadAction<APIError>) {
    state.isFetching = false;
    state.error = action.payload;
  }
});
