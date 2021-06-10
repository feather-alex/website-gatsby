import { APIError } from '../../../../../../types/ReduxState';
import { QuizResultsState, QuizPkgs, StyleQuizResult, QuizRoom } from './quizResults.types';
import quizResultsReducer, { initialState } from './quizResults.reducer';
import {
  QuizResultsActions,
  FETCH_QUIZ_RESULTS_REQUEST,
  FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
  FETCH_QUIZ_RESULTS_SUCCESS,
  FETCH_QUIZ_RESULTS_FAILURE,
  UPDATE_QUIZ_RESULTS_REQUEST,
  TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY
} from './quizResults.actions';
import { QuizAnswers, FurnitureReason, BudgetTier, DeliveryAreaChoice } from '../../../../../quiz/store/quiz.types';

describe('Quiz Results - Reducer', () => {
  const quizAnswers: QuizAnswers = {
    deliveryArea: DeliveryAreaChoice.SF,
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

  const error: APIError = {
    error: 'Bad bad',
    message: 'this is a very bad error',
    status: 400
  };

  const uuid = '70b13689-049a-43f7-aea1-6ec45501f2b6';

  let state: QuizResultsState;

  beforeEach(() => (state = { ...initialState }));

  it('should handle fetch quiz results request action', () => {
    const action: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_REQUEST,
      payload: { quizAnswers }
    };

    const quizResultsState = quizResultsReducer(state, action);
    expect(quizResultsState.isFetching).toEqual(true);
    expect(quizResultsState.error).toEqual(null);
  });

  it('should handle fetch quiz results by uuid request action', () => {
    const action: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_BY_UUID_REQUEST,
      payload: { uuid }
    };

    const quizResultsState = quizResultsReducer(state, action);
    expect(quizResultsState.isFetching).toEqual(true);
    expect(quizResultsState.error).toEqual(null);
  });

  it('should handle fetch quiz results success action', () => {
    const action: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_SUCCESS,
      payload: { quizPkgs }
    };

    const quizResultsState = quizResultsReducer(state, action);
    expect(quizResultsState.isFetching).toEqual(false);
    expect(quizResultsState.error).toEqual(null);
    expect(quizResultsState.data).toEqual(quizPkgs);
  });

  it('should handle fetch quiz results failure action', () => {
    const action: QuizResultsActions = {
      type: FETCH_QUIZ_RESULTS_FAILURE,
      payload: { error }
    };

    const quizResultsState = quizResultsReducer(state, action);
    expect(quizResultsState.isFetching).toEqual(false);
    expect(quizResultsState.error).toEqual(error);
  });

  it('should handle update quiz results request action', () => {
    const action: QuizResultsActions = {
      type: UPDATE_QUIZ_RESULTS_REQUEST,
      payload: { uuid, quizPackages }
    };

    const quizResultsState = quizResultsReducer(state, action);
    expect(quizResultsState.isFetching).toEqual(false);
    expect(quizResultsState.error).toEqual(null);
    expect(quizResultsState.data!.diningRoom).toEqual(quizPackages.items.diningRoom);
  });

  it('should handle toggle edit quiz results overlay action', () => {
    const action: QuizResultsActions = {
      type: TOGGLE_EDIT_QUIZ_RESULTS_OVERLAY,
      payload: { roomId: QuizRoom.DiningRoom }
    };

    const quizResultsState = quizResultsReducer(state, action);
    expect(quizResultsState.isFetching).toEqual(false);
    expect(quizResultsState.error).toEqual(null);
    expect(quizResultsState.activeQuizRoom).toEqual(QuizRoom.DiningRoom);
  });
});
