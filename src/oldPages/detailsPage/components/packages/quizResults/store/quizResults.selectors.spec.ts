import { APIError, State as GlobalState } from '../../../../../../types/ReduxState';
import {
  getQuizResults,
  getActiveQuizRoom,
  getActiveRoomItems,
  getIsFetchingQuizResults,
  getQuizResultsError
} from './quizResults.selectors';
import { initialState } from './quizResults.reducer';
import { QuizResultsState, QuizPkgs, QuizRoom } from './quizResults.types';
import { PkgItem } from '../../../../../../types/Package';

describe('Quiz Results - Selectors', () => {
  const diningRoomItems: PkgItem[][] = [
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
  ];

  const quizPkgs: QuizPkgs = {
    email: 'bob@mail.com',
    name: 'bob',
    uuid: '70b13689-049a-43f7-aea1-6ec45501f2b6',
    diningRoom: diningRoomItems,
    livingRoom: [],
    bedroom1: [],
    bedroom2: [],
    bedroom3: [],
    homeOffice: []
  };

  let state: QuizResultsState = {
    ...initialState,
    data: quizPkgs,
    activeQuizRoom: QuizRoom.DiningRoom
  };

  it('should get the quiz results data', () => {
    const quizResults = getQuizResults({ quizPackages: state } as GlobalState);
    expect(quizResults).toEqual(quizPkgs);
  });

  it('should get the active quiz room', () => {
    const activeQuizRoom = getActiveQuizRoom({ quizPackages: state } as GlobalState);
    expect(activeQuizRoom).toEqual(QuizRoom.DiningRoom);
  });

  it('should get the active quiz room items', () => {
    const activeQuizRoomItems = getActiveRoomItems({ quizPackages: state } as GlobalState);
    expect(activeQuizRoomItems).toEqual(diningRoomItems);
  });

  it('should get the quiz results loading state', () => {
    state = {
      ...initialState,
      isFetching: true
    };

    const isFetchingQuizResults = getIsFetchingQuizResults({ quizPackages: state } as GlobalState);
    expect(isFetchingQuizResults).toEqual(true);
  });

  it('should get an error from a failed quiz results request', () => {
    const mockError: APIError = {
      error: 'fail boi',
      status: 404,
      message: "sola's lil easter egg"
    };

    state = {
      ...initialState,
      error: mockError
    };

    const quizResultsError = getQuizResultsError({ quizPackages: state } as GlobalState);
    expect(quizResultsError).toEqual(mockError);
  });
});
