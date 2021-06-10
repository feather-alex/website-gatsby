import { State as GlobalState } from '../../../types/ReduxState';
import { createSelector } from 'reselect';

export const getPages = ({ app }: GlobalState) => app.contentfulPages.pages;

export const getCityPages = createSelector(getPages, (pages) =>
  pages.filter((location) => location.template === 'City Page')
);

export const getPagesError = ({ app }: GlobalState) => app.contentfulPages.error;

export const getIsFetchingPages = ({ app }: GlobalState) => app.contentfulPages.isFetching;
