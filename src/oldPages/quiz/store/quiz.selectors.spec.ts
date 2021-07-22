import { State as GlobalState } from "../../../types/ReduxState";
import * as selectors from "./quiz.selectors";
import { initialState } from "./quiz.reducer";
import {
  Quiz,
  DiningRoomChairsChoice,
  HomeOfficeChoice,
  LivingRoomSizeChoice,
  LivingRoomFunctionChoice,
  DeliveryAreaChoice,
  FurnitureReason,
  BudgetTier,
} from "./quiz.types";

describe("Quiz Selectors", () => {
  let state: Quiz;
  beforeEach(() => (state = { ...initialState }));

  it("should get the entire quiz state", () => {
    expect(selectors.getQuizState({ quiz: state } as GlobalState)).toEqual(
      initialState
    );
  });

  it("should get the location path before the quiz was opened", () => {
    expect(
      selectors.getLocationPathBeforeQuizOpened({ quiz: state } as GlobalState)
    ).toEqual(initialState.locationPathBeforeQuizOpened);
  });

  it("should get the quiz delivery area", () => {
    expect(
      selectors.getQuizDeliveryArea({ quiz: state } as GlobalState)
    ).toEqual(initialState.deliveryArea);
  });

  it("should get if the quiz has been submitted", () => {
    expect(selectors.getIsSubmitted({ quiz: state } as GlobalState)).toEqual(
      initialState.isSubmitted
    );
  });

  it("should get the current UUID associated with the quiz", () => {
    expect(
      selectors.getSubmittedQuizUuid({ quiz: state } as GlobalState)
    ).toEqual(initialState.uuid);
  });

  it("should get the name", () => {
    expect(selectors.getName({ quiz: state } as GlobalState)).toEqual(
      initialState.name
    );
  });

  it("should get the email", () => {
    expect(selectors.getEmail({ quiz: state } as GlobalState)).toEqual(
      initialState.email
    );
  });

  it("should get the quiz steps", () => {
    expect(selectors.getQuizSteps({ quiz: state } as GlobalState)).toEqual(
      initialState.steps
    );
  });

  it("should get the current step", () => {
    expect(
      selectors.getCurrentStepIndex({ quiz: state } as GlobalState)
    ).toEqual(initialState.currentStepIndex);
  });

  it("should get the selected images", () => {
    expect(selectors.getSelectedImages({ quiz: state } as GlobalState)).toEqual(
      initialState.selectedImages
    );
  });

  it("should get the selected rooms", () => {
    expect(selectors.getSelectedRooms({ quiz: state } as GlobalState)).toEqual(
      initialState.selectedRooms
    );
  });

  it("should get the reason the user took the quiz", () => {
    expect(selectors.getReason({ quiz: state } as GlobalState)).toEqual(
      initialState.reason
    );
  });

  it("should get the budget the user has that took the quiz", () => {
    expect(selectors.getBudget({ quiz: state } as GlobalState)).toEqual(
      initialState.budget
    );
  });

  it("should get the styles the user has selected", () => {
    expect(selectors.getStyles({ quiz: state } as GlobalState)).toEqual(
      initialState.styles
    );
  });

  it("should get the number of bedrooms", () => {
    expect(
      selectors.getNumberOfBedrooms({ quiz: state } as GlobalState)
    ).toEqual(initialState.numberOfBedrooms);
  });

  it("should get the current bedroom index", () => {
    expect(
      selectors.getCurrentBedroomIndex({ quiz: state } as GlobalState)
    ).toEqual(initialState.currentBedroomIndex);
  });

  it("should get the rooms that were selected", () => {
    expect(selectors.getRooms({ quiz: state } as GlobalState)).toEqual(
      initialState.rooms
    );
  });

  it("should get the direction that the quiz is currently moving in", () => {
    expect(selectors.getDirection({ quiz: state } as GlobalState)).toEqual(
      initialState.direction
    );
  });

  it("should get the room sanitized for the API call", () => {
    state = {
      ...state,
      rooms: {
        ...state.rooms,
        diningRoom: {
          chairs: DiningRoomChairsChoice.Two,
        },
        homeOffice: {
          workFrequency: HomeOfficeChoice.Sometimes,
        },
      },
    };
    const sanitizedRooms = {
      diningRoom: {
        chairs: DiningRoomChairsChoice.Two,
      },
      homeOffice: {
        workFrequency: HomeOfficeChoice.Sometimes,
      },
    };

    expect(selectors.getSanitizedRooms({ quiz: state } as GlobalState)).toEqual(
      sanitizedRooms
    );
  });

  it("should get the quiz answers for the API call, including rooms being sanitized", () => {
    state = {
      ...state,
      name: "test",
      email: "test@tester.com",
      rooms: {
        ...state.rooms,
        homeOffice: {
          workFrequency: HomeOfficeChoice.Sometimes,
        },
        livingRoom: {
          roomSize: LivingRoomSizeChoice.Medium,
          function: LivingRoomFunctionChoice.Relaxing,
        },
      },
      deliveryArea: DeliveryAreaChoice.NYC,
      styles: ["scandivavian", "contemporary"],
      reason: FurnitureReason.MovingSameCity,
      budget: BudgetTier.Tier3,
    };

    const quizAnswers = {
      name: "test",
      email: "test@tester.com",
      rooms: {
        homeOffice: {
          workFrequency: HomeOfficeChoice.Sometimes,
        },
        livingRoom: {
          roomSize: LivingRoomSizeChoice.Medium,
          function: LivingRoomFunctionChoice.Relaxing,
        },
      },
      deliveryArea: DeliveryAreaChoice.NYC,
      styles: ["scandivavian", "contemporary"],
      reason: FurnitureReason.MovingSameCity,
      budget: BudgetTier.Tier3,
      planMonths: 12,
    };

    expect(selectors.getQuizAnswers({ quiz: state } as GlobalState)).toEqual(
      quizAnswers
    );
  });
});
