import Report from "../../../../../../errorReporter";
import { APIError } from "../../../../../../types/ReduxState";
import { QuizPkgs, StyleQuizResult } from "./quizResults.types";
import {
  Quiz,
  Direction,
  FurnitureReason,
  BudgetTier,
  DeliveryAreaChoice,
  QuizAnswers,
} from "../../../../../quiz/store/quiz.types";
import {
  QuizResultsActions,
  fetchQuizResultsSuccess,
  fetchQuizResultsFailure,
  fetchQuizResultsByUuid,
  updateQuizResultsRequest,
  updateQuizResultsSuccess,
  updateQuizResultsFailure,
} from "./quizResults.actions";
import {
  getQuizAnswers,
  getQuizState,
} from "../../../../../quiz/store/quiz.selectors";
import {
  handleQuizResultsRequest,
  handleQuizResultsRequestByUuid,
  handleUpdateQuizResults,
} from "./quizResults.sagas";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import Request, { RequestMethod } from "../../../../../../api/request";
import { history } from "../../../../../../store/history";
import { noop } from "../../../../../../utils/ui-helpers";

describe("Quiz Results - Sagas", () => {
  const quizState: Quiz = {
    uuid: "",
    isSubmitted: false,
    isChanged: false,
    deliveryArea: DeliveryAreaChoice.NYC,
    name: "Bob",
    email: "bob@mail.com",
    reason: FurnitureReason.MovingSameCity,
    budget: BudgetTier.Tier2,
    rooms: {
      diningRoom: { chairs: "four" },
      livingRoom: {
        function: "",
        roomSize: "",
      },
      homeOffice: {
        workFrequency: "",
      },
      bedrooms: [
        {
          bedSize: "",
        },
      ],
    },
    currentStepIndex: 0,
    steps: [],
    selectedImages: [],
    selectedRooms: [],
    numberOfBedrooms: 0,
    currentBedroomIndex: 0,
    styles: [
      "mid-century",
      "industrial",
      "contemporary",
      "mid-century",
      "scandinavian",
    ],
    dateChanged: new Date(),
    locationPathBeforeQuizOpened: "/",
    direction: Direction.Forward,
  };

  const quizAnswers: QuizAnswers = {
    deliveryArea: DeliveryAreaChoice.NYC,
    name: "Bob",
    email: "bob@mail.com",
    reason: FurnitureReason.MovingSameCity,
    budget: BudgetTier.Tier2,
    planMonths: 12,
    styles: [
      "mid-century",
      "industrial",
      "contemporary",
      "mid-century",
      "scandinavian",
    ],
    rooms: {
      diningRoom: { chairs: "four" },
      livingRoom: {
        function: "",
        roomSize: "",
      },
      homeOffice: {
        workFrequency: "",
      },
      bedrooms: [
        {
          bedSize: "",
        },
      ],
    },
  };

  const quizPkgs: QuizPkgs = {
    email: "bob@mail.com",
    name: "bob",
    uuid: "70b13689-049a-43f7-aea1-6ec45501f2b6",
    diningRoom: [
      [
        {
          identifier: "wren-dining-table",
          title: "Wren dining table",
          variantIdentifier: "default",
          brand: { identifier: "feather", name: "Feather" },
          retailPrice: 389,
          image: {
            mobile:
              "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
            desktop:
              "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
          },
          rentalPrices: { 3: 55, 12: 16 },
          options: [],
          selected: true,
          type: "package",
          description: "Bring a breath of fresh air into your dining space",
          dimensions: {
            width: '35.5"',
            height: '29.3"',
            length: '59"',
            weight: "",
            image: { mobile: null, desktop: null },
          },
          displayOrder: 0,
          availability: [],
        },
        {
          identifier: "wren-dining-table",
          title: "Wren dining table",
          variantIdentifier: "default",
          brand: { identifier: "feather", name: "Feather" },
          retailPrice: 389,
          image: {
            mobile:
              "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
            desktop:
              "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
          },
          rentalPrices: { 3: 55, 12: 16 },
          options: [],
          selected: true,
          type: "package",
          description: "Bring a breath of fresh air into your dining space",
          dimensions: {
            width: '35.5"',
            height: '29.3"',
            length: '59"',
            weight: "",
            image: { mobile: null, desktop: null },
          },
          displayOrder: 0,
          availability: [],
        },
      ],
    ],
    livingRoom: [],
    bedroom1: [],
    bedroom2: [],
    bedroom3: [],
    homeOffice: [],
  };

  const quizPackages: StyleQuizResult = {
    email: "bob@mail.com",
    name: "bob",
    items: {
      diningRoom: [
        [
          {
            identifier: "wren-dining-table",
            title: "Wren dining table",
            variantIdentifier: "default",
            brand: { identifier: "feather", name: "Feather" },
            retailPrice: 389,
            image: {
              mobile:
                "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
              desktop:
                "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
            },
            rentalPrices: { 3: 55, 12: 16 },
            options: [],
            selected: true,
            type: "package",
            description: "Bring a breath of fresh air into your dining space",
            dimensions: {
              width: '35.5"',
              height: '29.3"',
              length: '59"',
              weight: "",
              image: { mobile: null, desktop: null },
            },
            displayOrder: 0,
            availability: [],
          },
          {
            identifier: "wren-dining-table",
            title: "Wren dining table",
            variantIdentifier: "default",
            brand: { identifier: "feather", name: "Feather" },
            retailPrice: 389,
            image: {
              mobile:
                "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
              desktop:
                "https://img.livefeather.com/products/wren-dining-table/images/x4098-main-desktop.jpg",
            },
            rentalPrices: { 3: 55, 12: 16 },
            options: [],
            selected: true,
            type: "package",
            description: "Bring a breath of fresh air into your dining space",
            dimensions: {
              width: '35.5"',
              height: '29.3"',
              length: '59"',
              weight: "",
              image: { mobile: null, desktop: null },
            },
            displayOrder: 0,
            availability: [],
          },
        ],
      ],
    },
  };

  const error: APIError = {
    error: "Bad bad",
    message: "this is a very bad error",
    status: 400,
  };

  const uuid = "70b13689-049a-43f7-aea1-6ec45501f2b6";

  describe("Fetch quiz results", () => {
    it("should handle successfully fetching quiz results", () => {
      return expectSaga(handleQuizResultsRequest)
        .provide([
          [matchers.select(getQuizAnswers), quizAnswers],
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              "/quiz/results",
              undefined,
              quizAnswers
            ),
            quizPkgs,
          ],
        ])
        .call(history.replace, `/quiz-results/${quizPkgs.uuid}`)
        .put(fetchQuizResultsSuccess(quizPkgs))
        .run();
    });

    it("should handle unsuccessfully fetching quiz results", () => {
      return expectSaga(handleQuizResultsRequest)
        .provide([
          [matchers.select(getQuizAnswers), quizAnswers],
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.POST,
              "/quiz/results",
              undefined,
              quizAnswers
            ),
            Promise.reject(error),
          ],
          [matchers.select(getQuizState), quizState],
          [matchers.select(getQuizAnswers), quizAnswers],
          [matchers.call(Report.setContext, { quizState, quizAnswers }), noop],
          [matchers.call(Report.captureException, error), noop],
          [matchers.call(Report.resetContext), noop],
        ])
        .put(fetchQuizResultsFailure(error))
        .call(Report.setContext, { quizState, quizAnswers })
        .call(Report.captureException, error)
        .call(Report.resetContext)
        .run();
    });
  });

  describe("Fetch quiz results by uuid", () => {
    it("should handle successfully fetching quiz results", () => {
      const action: QuizResultsActions = fetchQuizResultsByUuid(uuid);

      return expectSaga(handleQuizResultsRequestByUuid, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              `/quiz/results/${uuid}`,
              undefined
            ),
            quizPackages,
          ],
        ])
        .put(
          fetchQuizResultsSuccess({
            ...quizPackages.items,
            name: quizPackages.name,
            email: quizPackages.email,
            uuid,
          } as QuizPkgs)
        )
        .run();
    });

    it("should handle unsuccessfully fetching quiz results", () => {
      const action: QuizResultsActions = fetchQuizResultsByUuid(uuid);

      return expectSaga(handleQuizResultsRequestByUuid, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.GET,
              `/quiz/results/${uuid}`,
              undefined
            ),
            Promise.reject(error),
          ],
        ])
        .put(fetchQuizResultsFailure(error))
        .run();
    });
  });

  describe("Update quiz results", () => {
    it("should handle successfully updating quiz results", () => {
      const action: QuizResultsActions = updateQuizResultsRequest(
        uuid,
        quizPackages
      );

      return expectSaga(handleUpdateQuizResults, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.PUT,
              `/quiz/results/${uuid}`,
              undefined,
              quizPackages
            ),
            quizPkgs,
          ],
        ])
        .put(updateQuizResultsSuccess(quizPkgs))
        .run();
    });

    it("should handle unsuccessfully updating quiz results", () => {
      const action: QuizResultsActions = updateQuizResultsRequest(
        uuid,
        quizPackages
      );

      return expectSaga(handleUpdateQuizResults, action)
        .provide([
          [
            matchers.call(
              [Request, "send"],
              RequestMethod.PUT,
              `/quiz/results/${uuid}`,
              undefined,
              quizPackages
            ),
            Promise.reject(error),
          ],
        ])
        .put(updateQuizResultsFailure(error))
        .run();
    });
  });
});
