import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { handleQuizSubmission, handleLocationChange } from "./quiz.sagas";
import { submitQuiz, quizOpened } from "./quiz.actions";
import {
  getQuizAnswers,
  getLocationPathBeforeQuizOpened,
} from "./quiz.selectors";
import Analytics from "../../../analytics/analytics";
import { QUIZ } from "../../../analytics/quiz/events";
import { quizFinalStepPayloadMapping } from "../../../analytics/quiz/payload-mappings";
import { noop } from "@babel/types";
import {
  QuizAnswers,
  FurnitureReason,
  BudgetTier,
  DeliveryAreaChoice,
} from "./quiz.types";
import { initialRoomState } from "./quiz.reducer";
import { fetchQuizResults } from "../../detailsPage/components/packages/quizResults/store/quizResults.actions";
import { history } from "../../../store/history";

describe("Quiz Sagas", () => {
  const mockQuizAnswers: QuizAnswers = {
    name: "test",
    email: "test@tester.com",
    deliveryArea: DeliveryAreaChoice.NYC,
    reason: FurnitureReason.MovingSameCity,
    budget: BudgetTier.Tier2,
    rooms: {
      ...initialRoomState,
    },
    styles: [],
    planMonths: 12,
  };

  it("should handle quiz submission", () => {
    const name = "test";
    const email = "test@tester.com";
    const action = submitQuiz({ name, email });

    return expectSaga(handleQuizSubmission, action)
      .provide([
        [
          matchers.call(Analytics.trackUser, { properties: { name, email } }),
          noop,
        ],
        [
          matchers.call(
            Analytics.trackEvent,
            QUIZ.SUBMITTED,
            quizFinalStepPayloadMapping(action.payload)
          ),
          noop,
        ],
        [matchers.select(getQuizAnswers), mockQuizAnswers],
      ])
      .call(Analytics.trackUser, { properties: { name, email } })
      .call(
        Analytics.trackEvent,
        QUIZ.SUBMITTED,
        quizFinalStepPayloadMapping(action.payload)
      )
      .put(fetchQuizResults(mockQuizAnswers))
      .call(history.push, "/make-your-own-package")
      .run();
  });

  it("should handle location change to capture the URL before the quiz was opened", () => {
    const defaultPath = "";
    const action = {
      type: "LOCATION_CHANGE",
      payload: {
        location: {
          pathname: "/style-quiz",
        },
      },
    };

    return expectSaga(handleLocationChange, action)
      .provide([
        [matchers.select(getLocationPathBeforeQuizOpened), "/how-it-works"],
      ])
      .put(quizOpened(defaultPath))
      .run();
  });
});
