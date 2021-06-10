import {
  Quiz,
  Steps,
  Direction,
  FurnitureReason,
  BudgetTier,
  QuizStepChoicesAndSelections,
  DeliveryAreaChoice
} from './quiz.types';
import { QUIZ_OPENED, QuizActions, QUIZ_STEP_COMPLETED, QUIZ_STEP_BACK, SUBMIT_QUIZ, RESET_QUIZ } from './quiz.actions';
import { handleQuizStepCompleted } from './quiz.utils';
import { FETCH_QUIZ_RESULTS_SUCCESS } from '../../detailsPage/components/packages/quizResults/store/quizResults.actions';

export const initialRoomState = {
  diningRoom: { chairs: '' },
  livingRoom: {
    function: '',
    roomSize: ''
  },
  homeOffice: {
    workFrequency: ''
  },
  bedrooms: [
    {
      bedSize: ''
    }
  ]
};

export const initialState: Quiz = {
  isSubmitted: false,
  isChanged: false,
  deliveryArea: DeliveryAreaChoice.All,
  name: '',
  email: '',
  reason: FurnitureReason.None,
  budget: BudgetTier.None,
  rooms: initialRoomState,
  currentBedroomIndex: 0,
  numberOfBedrooms: 0,
  selectedRooms: [],
  selectedImages: [],
  currentStepIndex: 0,
  steps: [Steps.SelectLocation, Steps.Why, Steps.WhatRooms],
  styles: [],
  dateChanged: null,
  locationPathBeforeQuizOpened: '/',
  direction: Direction.Forward,
  uuid: ''
};

const quiz = (state: Quiz = initialState, action: QuizActions): Quiz => {
  switch (action.type) {
    case QUIZ_STEP_BACK:
      return {
        ...state,
        direction: Direction.Backward,
        currentStepIndex: state.currentStepIndex - 1,
        currentBedroomIndex:
          state.steps[state.currentStepIndex] === Steps.BedSize && state.currentBedroomIndex > 0
            ? state.currentBedroomIndex - 1
            : state.currentBedroomIndex
      };

    case QUIZ_STEP_COMPLETED: {
      return {
        ...state,
        ...handleQuizStepCompleted(state, {
          ...action.payload
        } as QuizStepChoicesAndSelections),
        currentStepIndex: state.currentStepIndex + 1,
        direction: Direction.Forward
      };
    }

    case FETCH_QUIZ_RESULTS_SUCCESS: {
      const { uuid, name, email } = action.payload.quizPkgs;

      return {
        ...state,
        uuid: uuid ? uuid : state.uuid,
        name: name ? name : state.name,
        email: email ? email : state.email
      };
    }

    case QUIZ_OPENED:
      return {
        ...state,
        locationPathBeforeQuizOpened: action.payload.pathname
      };

    case RESET_QUIZ:
      return {
        ...state,
        isSubmitted: false,
        uuid: '',
        currentStepIndex: 0,
        currentBedroomIndex: 0,
        numberOfBedrooms: 0,
        selectedRooms: [],
        selectedImages: [],
        styles: [],
        steps: [Steps.SelectLocation, Steps.Why, Steps.WhatRooms],
        deliveryArea: DeliveryAreaChoice.All,
        name: '',
        email: '',
        reason: FurnitureReason.None,
        budget: BudgetTier.None,
        rooms: initialRoomState
      };

    case SUBMIT_QUIZ:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        isSubmitted: true
      };

    default:
      return state;
  }
};

export default quiz;
