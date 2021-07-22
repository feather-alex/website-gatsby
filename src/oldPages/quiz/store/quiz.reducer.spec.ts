import quizReducer, { initialState } from "./quiz.reducer";
import {
  Quiz,
  Direction,
  Steps,
  BudgetTier,
  FurnitureReason,
  DeliveryAreaChoice,
  DiningRoomChairsChoice,
  LivingRoomFunctionChoice,
  LivingRoomSizeChoice,
  HomeOfficeChoice,
  BedSizeChoice,
  WhatRoomsChoice,
} from "./quiz.types";
import * as fixtures from "./quiz.fixtures";
import {
  quizStepBack,
  QuizActions,
  resetQuiz,
  submitQuiz,
  quizOpened,
  quizStepCompleted,
} from "./quiz.actions";
import { FETCH_QUIZ_RESULTS_SUCCESS } from "../../detailsPage/components/packages/quizResults/store/quizResults.actions";
import { QuizPkgs } from "../../detailsPage/components/packages/quizResults/store/quizResults.types";

describe("Quiz Reducer", () => {
  let state: Quiz;

  beforeEach(() => (state = { ...initialState }));

  it("should handle action: QUIZ_STEP_BACK when the current step is NOT the number of bedrooms", () => {
    state = {
      ...state,
      currentStepIndex: 3,
    };
    const action = quizStepBack();

    const reduced = quizReducer(state, action);
    expect(reduced.direction).toEqual(Direction.Backward);
    expect(reduced.currentStepIndex).toEqual(2);
    expect(reduced.currentBedroomIndex).toEqual(0);
  });

  it("should handle action: QUIZ_STEP_BACK when the current step is the number of bedrooms", () => {
    state = {
      ...state,
      currentStepIndex: 3,
      numberOfBedrooms: 1,
      steps: [
        Steps.SelectLocation,
        Steps.Why,
        Steps.WhatRooms,
        Steps.NumberOfBedrooms,
      ],
    };

    const action = quizStepBack();

    const reduced = quizReducer(state, action);
    expect(reduced.direction).toEqual(Direction.Backward);
    expect(reduced.currentStepIndex).toEqual(2);
    expect(reduced.currentBedroomIndex).toEqual(0);
  });

  it("should handle action: FETCH_QUIZ_RESULTS_SUCCESS", () => {
    const quizPkgs = {
      email: "test@test.com",
      name: "tester",
      uuid: "a-unique-value",
    } as QuizPkgs;
    const action: QuizActions = {
      type: FETCH_QUIZ_RESULTS_SUCCESS,
      payload: { quizPkgs },
    };

    const reduced = quizReducer(state, action);

    expect(reduced.name).toEqual(quizPkgs.name);
    expect(reduced.email).toEqual(quizPkgs.email);
    expect(reduced.uuid).toEqual(quizPkgs.uuid);
  });

  it("should handle action: RESET_QUIZ", () => {
    state = {
      ...state,
      isSubmitted: true,
      uuid: "a-unique-value",
      currentStepIndex: 8,
      currentBedroomIndex: 1,
      numberOfBedrooms: 2,
      selectedRooms: [WhatRoomsChoice.Office, WhatRoomsChoice.Bedroom],
      selectedImages: ["one", "two", "three"],
      styles: ["mid-century", "contemporary"],
      steps: [
        Steps.SelectLocation,
        Steps.Why,
        Steps.WhatRooms,
        Steps.NumberOfBedrooms,
        Steps.LivingRoomSize,
        Steps.BedSize,
        Steps.Budget,
        Steps.Style,
        Steps.Final,
      ],
      deliveryArea: DeliveryAreaChoice.NYC,
      name: "test",
      email: "test@test.com",
      reason: FurnitureReason.MovingSameCity,
      budget: BudgetTier.Tier3,
      rooms: {
        diningRoom: { chairs: DiningRoomChairsChoice.Four },
        livingRoom: {
          function: LivingRoomFunctionChoice.Hosting,
          roomSize: LivingRoomSizeChoice.Medium,
        },
        homeOffice: {
          workFrequency: HomeOfficeChoice.Sometimes,
        },
        bedrooms: [
          {
            bedSize: BedSizeChoice.Queen,
          },
        ],
      },
    };

    const action = resetQuiz();
    const reduced = quizReducer(state, action);

    expect(reduced.isSubmitted).toEqual(initialState.isSubmitted);
    expect(reduced.uuid).toEqual(initialState.uuid);
    expect(reduced.currentStepIndex).toEqual(initialState.currentStepIndex);
    expect(reduced.currentBedroomIndex).toEqual(
      initialState.currentBedroomIndex
    );
    expect(reduced.numberOfBedrooms).toEqual(initialState.numberOfBedrooms);
    expect(reduced.selectedRooms).toEqual(initialState.selectedRooms);
    expect(reduced.selectedImages).toEqual(initialState.selectedImages);
    expect(reduced.styles).toEqual(initialState.styles);
    expect(reduced.steps).toEqual(initialState.steps);
    expect(reduced.deliveryArea).toEqual(initialState.deliveryArea);
    expect(reduced.name).toEqual(initialState.name);
    expect(reduced.email).toEqual(initialState.email);
    expect(reduced.reason).toEqual(initialState.reason);
    expect(reduced.budget).toEqual(initialState.budget);
    expect(reduced.rooms).toEqual(initialState.rooms);
  });

  it("should handle action: SUBMIT_QUIZ", () => {
    const name = "test";
    const email = "test@tester.com";

    const action = submitQuiz({ name, email });
    const reduced = quizReducer(state, action);

    expect(reduced.name).toEqual(name);
    expect(reduced.email).toEqual(email);
    expect(reduced.isSubmitted).toEqual(true);
  });

  it("should handle action: QUIZ_OPENED", () => {
    const pathname = "/how-it-works";
    const action = quizOpened(pathname);
    const reduced = quizReducer(state, action);

    expect(reduced.locationPathBeforeQuizOpened).toEqual(pathname);
  });

  it.each`
    step                        | startState                              | payload                                   | expected
    ${Steps.SelectLocation}     | ${fixtures.selectLocationState}         | ${fixtures.selectLocationPayload}         | ${fixtures.whyStepState}
    ${Steps.Why}                | ${fixtures.whyStepState}                | ${fixtures.whyStepPayload}                | ${fixtures.whatRoomsStepState}
    ${Steps.WhatRooms}          | ${fixtures.whatRoomsStepState}          | ${fixtures.whatRoomsStepPayload}          | ${fixtures.numberOfBedroomsStepState}
    ${Steps.NumberOfBedrooms}   | ${fixtures.numberOfBedroomsStepState}   | ${fixtures.numberOfBedroomsStepPayload}   | ${fixtures.bedSizeOneStepState}
    ${Steps.BedSize}            | ${fixtures.bedSizeOneStepState}         | ${fixtures.bedSizeOneStepPayload}         | ${fixtures.bedSizeTwoStepState}
    ${Steps.BedSize}            | ${fixtures.bedSizeTwoStepState}         | ${fixtures.bedSizeTwoStepPayload}         | ${fixtures.livingRoomSizeStepState}
    ${Steps.LivingRoomSize}     | ${fixtures.livingRoomSizeStepState}     | ${fixtures.livingRoomSizeStepPayload}     | ${fixtures.livingRoomFunctionStepState}
    ${Steps.LivingRoomFunction} | ${fixtures.livingRoomFunctionStepState} | ${fixtures.livingRoomFunctionStepPayload} | ${fixtures.DiningRoomChairsStepState}
    ${Steps.DiningRoomChairs}   | ${fixtures.DiningRoomChairsStepState}   | ${fixtures.DiningRoomChairsStepPayload}   | ${fixtures.HomeOfficeStepState}
    ${Steps.HomeOffice}         | ${fixtures.HomeOfficeStepState}         | ${fixtures.HomeOfficeStepPayload}         | ${fixtures.BudgetStepState}
    ${Steps.Budget}             | ${fixtures.BudgetStepState}             | ${fixtures.BudgetStepPayload}             | ${fixtures.StylesStepState}
    ${Steps.Style}              | ${fixtures.StylesStepState}             | ${fixtures.StylesStepPayload}             | ${fixtures.FinalStepState}
  `(
    "should handle action: QUIZ_STEP_COMPLETED when the step is $step",
    ({ startState, payload, expected }) => {
      const action = quizStepCompleted(payload.step, payload.choice);
      const reduced = quizReducer(startState, action);

      expect(reduced).toEqual(expected);
    }
  );
});
