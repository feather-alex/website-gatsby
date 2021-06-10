import { createSelector } from 'reselect';
import { State as GlobalState } from '../../../../../../types/ReduxState';

export const getQuizResults = ({ quizPackages }: GlobalState) => quizPackages.data;
export const getActiveQuizRoom = ({ quizPackages }: GlobalState) => quizPackages.activeQuizRoom;
export const getIsFetchingQuizResults = ({ quizPackages }: GlobalState) => quizPackages.isFetching;
export const getQuizResultsError = ({ quizPackages }: GlobalState) => quizPackages.error;

export const getActiveRoomItems = createSelector(getActiveQuizRoom, getQuizResults, (activeRoom, quizResults) => {
  if (activeRoom && quizResults) {
    return quizResults[activeRoom];
  }
  return null;
});
