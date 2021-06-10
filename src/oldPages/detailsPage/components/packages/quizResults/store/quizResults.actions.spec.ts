import {
  QuizResultsActions,
  FETCH_QUIZ_RESULTS_REQUEST,
  fetchQuizResults,
  FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
  fetchQuizResultsByUuid,
  FETCH_QUIZ_RESULTS_SUCCESS,
  fetchQuizResultsSuccess,
  FETCH_QUIZ_RESULTS_FAILURE,
  fetchQuizResultsFailure,
  UPDATE_QUIZ_RESULTS_REQUEST,
  updateQuizResultsRequest,
  UPDATE_QUIZ_RESULTS_SUCCESS,
  updateQuizResultsSuccess,
  UPDATE_QUIZ_RESULTS_FAILURE,
  updateQuizResultsFailure,
  TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
  toggleEditQuizResultsOverlay
} from './quizResults.actions';
import { QuizAnswers, FurnitureReason, BudgetTier, DeliveryAreaChoice } from '../../../../../quiz/store/quiz.types';
import { QuizPkgs, StyleQuizResult, QuizRoom } from './quizResults.types';
import { APIError } from '../../../../../../types/ReduxState';

describe('Quiz results - Actions', () => {
  const quizAnswers: QuizAnswers = {
    deliveryArea: DeliveryAreaChoice.LA,
    name: 'Bob',
    email: 'bob@mail.com',
    reason: FurnitureReason.MovingSameCity,
    budget: BudgetTier.Tier2,
    rooms: {
      diningRoom: { chairs: 'four' },
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
    },
    styles: ['mid-century', 'industrial', 'contemporary', 'mid-century', 'scandinavian'],
    planMonths: 12
  };

  const quizPkgs: QuizPkgs = {
    email: 'bob@mail.com',
    name: 'bob',
    uuid: '70b13689-049a-43f7-aea1-6ec45501f2b6',
    diningRoom: [
      [
        {
          identifier: 'wren-dining-table',
          title: 'Wren dining table',
          variantIdentifier: 'default',
          brand: { identifier: 'feather', name: 'Feather' },
          retailPrice: 389,
          image: {
            mobile: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg',
            desktop: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg'
          },
          rentalPrices: { 3: 55, 12: 16 },
          options: [],
          selected: true,
          type: 'package',
          description: 'Bring a breath of fresh air into your dining space',
          dimensions: {
            width: '35.5"',
            height: '29.3"',
            length: '59"',
            weight: '',
            image: { mobile: null, desktop: null }
          },
          displayOrder: 0,
          availability: []
        },
        {
          identifier: 'wren-dining-table',
          title: 'Wren dining table',
          variantIdentifier: 'default',
          brand: { identifier: 'feather', name: 'Feather' },
          retailPrice: 389,
          image: {
            mobile: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg',
            desktop: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg'
          },
          rentalPrices: { 3: 55, 12: 16 },
          options: [],
          selected: true,
          type: 'package',
          description: 'Bring a breath of fresh air into your dining space',
          dimensions: {
            width: '35.5"',
            height: '29.3"',
            length: '59"',
            weight: '',
            image: { mobile: null, desktop: null }
          },
          displayOrder: 0,
          availability: []
        }
      ]
    ],
    livingRoom: [],
    bedroom1: [],
    bedroom2: [],
    bedroom3: [],
    homeOffice: []
  };

  const error: APIError = {
    error: 'This is an error',
    message: 'Something bad',
    status: 400
  };

  it('should create a fetch quiz results request action', () => {
    const expectedAction: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_REQUEST,
      payload: { quizAnswers }
    };

    const action = fetchQuizResults(quizAnswers);
    expect(action).toEqual(expectedAction);
  });

  it('should create a fetch quiz results by uuid request action', () => {
    const uuid = 'th1sUuiD';
    const expectedAction: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
      payload: { uuid }
    };

    const action = fetchQuizResultsByUuid(uuid);
    expect(action).toEqual(expectedAction);
  });

  it('should create a fetch quiz results success action', () => {
    const expectedAction: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_SUCCESS,
      payload: { quizPkgs }
    };

    const action = fetchQuizResultsSuccess(quizPkgs);
    expect(action).toEqual(expectedAction);
  });

  it('should create a fetch quiz results failure action', () => {
    const expectedAction: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_FAILURE,
      payload: { error }
    };

    const action = fetchQuizResultsFailure(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create an update quiz results request action', () => {
    const uuid = 'th1sUuiD';

    const quizPackages: StyleQuizResult = {
      email: 'bob@mail.com',
      name: 'bob',
      items: {
        diningRoom: [
          [
            {
              identifier: 'wren-dining-table',
              title: 'Wren dining table',
              variantIdentifier: 'default',
              brand: { identifier: 'feather', name: 'Feather' },
              retailPrice: 389,
              image: {
                mobile: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg',
                desktop: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg'
              },
              rentalPrices: { 3: 55, 12: 16 },
              options: [],
              selected: true,
              type: 'package',
              description: 'Bring a breath of fresh air into your dining space',
              dimensions: {
                width: '35.5"',
                height: '29.3"',
                length: '59"',
                weight: '',
                image: { mobile: null, desktop: null }
              },
              displayOrder: 0,
              availability: []
            },
            {
              identifier: 'wren-dining-table',
              title: 'Wren dining table',
              variantIdentifier: 'default',
              brand: { identifier: 'feather', name: 'Feather' },
              retailPrice: 389,
              image: {
                mobile: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg',
                desktop: 'https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg'
              },
              rentalPrices: { 3: 55, 12: 16 },
              options: [],
              selected: true,
              type: 'package',
              description: 'Bring a breath of fresh air into your dining space',
              dimensions: {
                width: '35.5"',
                height: '29.3"',
                length: '59"',
                weight: '',
                image: { mobile: null, desktop: null }
              },
              displayOrder: 0,
              availability: []
            }
          ]
        ]
      }
    };

    const expectedAction: QuizResultsActions = {
      type: UPDATE_QUIZ_RESULTS_REQUEST,
      payload: { uuid, quizPackages }
    };

    const action = updateQuizResultsRequest(uuid, quizPackages);
    expect(action).toEqual(expectedAction);
  });

  it('should create an update quiz results success action', () => {
    const expectedAction: QuizResultsActions = {
      type: UPDATE_QUIZ_RESULTS_SUCCESS,
      payload: { quizPkgs }
    };

    const action = updateQuizResultsSuccess(quizPkgs);
    expect(action).toEqual(expectedAction);
  });

  it('should create an update quiz results failure action', () => {
    const expectedAction: QuizResultsActions = {
      type: UPDATE_QUIZ_RESULTS_FAILURE,
      payload: { error }
    };

    const action = updateQuizResultsFailure(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create an action to toggle the edit quiz results overlay', () => {
    const expectedAction: QuizResultsActions = {
      type: TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
      payload: {
        roomId: QuizRoom.DiningRoom
      }
    };

    const action = toggleEditQuizResultsOverlay(QuizRoom.DiningRoom);
    expect(action).toEqual(expectedAction);
  });
});
