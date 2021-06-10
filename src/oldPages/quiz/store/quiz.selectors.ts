import { State as GlobalState } from '../../../types/ReduxState';
import { createSelector } from 'reselect';
import { QuizAnswers } from './quiz.types';

export const getQuizState = ({ quiz }: GlobalState) => quiz;
export const getLocationPathBeforeQuizOpened = ({ quiz }: GlobalState) => quiz.locationPathBeforeQuizOpened;
export const getQuizDeliveryArea = ({ quiz }: GlobalState) => quiz.deliveryArea;
export const getIsSubmitted = ({ quiz }: GlobalState) => quiz.isSubmitted;
export const getSubmittedQuizUuid = ({ quiz }: GlobalState) => quiz.uuid;
export const getName = ({ quiz }: GlobalState) => quiz.name;
export const getEmail = ({ quiz }: GlobalState) => quiz.email;
export const getQuizSteps = ({ quiz }: GlobalState) => quiz.steps;
export const getCurrentStepIndex = ({ quiz }: GlobalState) => quiz.currentStepIndex;
export const getSelectedImages = ({ quiz }: GlobalState) => quiz.selectedImages;
export const getSelectedRooms = ({ quiz }: GlobalState) => quiz.selectedRooms;
export const getReason = ({ quiz }: GlobalState) => quiz.reason;
export const getBudget = ({ quiz }: GlobalState) => quiz.budget;
export const getStyles = ({ quiz }: GlobalState) => quiz.styles;
export const getNumberOfBedrooms = ({ quiz }: GlobalState) => quiz.numberOfBedrooms;
export const getCurrentBedroomIndex = ({ quiz }: GlobalState) => quiz.currentBedroomIndex;
export const getRooms = ({ quiz }: GlobalState) => quiz.rooms;
export const getDirection = ({ quiz }: GlobalState) => quiz.direction;

export const getSanitizedRooms = createSelector(getRooms, (originalRooms) => {
  const rooms = {
    ...originalRooms
  };

  if (rooms.bedrooms.length === 0 || (rooms.bedrooms.length === 1 && rooms.bedrooms[0].bedSize === '')) {
    delete rooms.bedrooms;
  }

  if (!rooms.diningRoom.chairs) {
    delete rooms.diningRoom;
  }

  if (!rooms.homeOffice.workFrequency) {
    delete rooms.homeOffice;
  }

  if (!rooms.livingRoom.function || !rooms.livingRoom.roomSize) {
    delete rooms.livingRoom;
  }

  return rooms;
});

// collect items out of redux that are needed for quiz results API call
// as sanitize the room selections and provide the hard-code value of 12 months
export const getQuizAnswers = createSelector(
  getName,
  getEmail,
  getSanitizedRooms,
  getQuizDeliveryArea,
  getStyles,
  getReason,
  getBudget,
  (name, email, rooms, deliveryArea, styles, reason, budget): QuizAnswers => ({
    name,
    email,
    rooms,
    deliveryArea,
    styles,
    reason,
    budget,
    planMonths: 12
  })
);
