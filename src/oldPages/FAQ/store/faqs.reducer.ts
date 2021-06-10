import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { FaqContentState, FaqContentSuccessPayload } from './faqs.types';
import { APIError } from '../../../types/ReduxState';
import { getFaqContent } from './faqs.actions';

export const initialState: FaqContentState = {
  isFetching: false,
  error: null,
  faqCategories: [],
  meta: {
    name: '',
    description: '',
    imageUrl: '',
    title: ''
  }
};

export default createReducer(initialState, {
  [getFaqContent.request.type](state: FaqContentState) {
    state.isFetching = true;
    state.error = null;
  },

  [getFaqContent.success.type](state: FaqContentState, action: PayloadAction<FaqContentSuccessPayload>) {
    state.isFetching = false;
    state.error = null;
    state.meta = action.payload.meta;
    state.faqCategories = action.payload.faqCategories;
  },

  [getFaqContent.failure.type](state: FaqContentState, action: PayloadAction<APIError>) {
    state.isFetching = false;
    state.error = action.payload;
  }
});
