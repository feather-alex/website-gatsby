import {
  resetQuiz,
  RESET_QUIZ,
  submitQuiz,
  SUBMIT_QUIZ,
  quizStepBack,
  QUIZ_STEP_BACK,
  QUIZ_OPENED,
  quizOpened,
  QUIZ_STEP_COMPLETED,
  quizStepCompleted,
} from "./quiz.actions";
import { BudgetTier, Steps } from "./quiz.types";

describe("Quiz Actions", () => {
  it("should create an action to reset the quiz", () => {
    const expectedAction = {
      type: RESET_QUIZ,
    };

    expect(resetQuiz()).toEqual(expectedAction);
  });

  it("should create an action to submit the quiz", () => {
    const name = "tester";
    const email = "test@tester.com";

    const expectedAction = {
      type: SUBMIT_QUIZ,
      payload: { name, email },
    };

    expect(submitQuiz({ name, email })).toEqual(expectedAction);
  });

  it("should create an action for when a quiz step is completed", () => {
    const step = Steps.Budget;
    const choice = BudgetTier.Tier2;

    const expectedAction = {
      type: QUIZ_STEP_COMPLETED,
      payload: { step, choice },
    };

    expect(quizStepCompleted(step, choice)).toEqual(expectedAction);
  });

  it("should create an action for going back a step in the quiz", () => {
    const expectedAction = {
      type: QUIZ_STEP_BACK,
    };

    expect(quizStepBack()).toEqual(expectedAction);
  });

  it("should create an action to open the quiz", () => {
    const pathname = "/how-it-works";
    const expectedAction = {
      type: QUIZ_OPENED,
      payload: { pathname },
    };

    expect(quizOpened(pathname)).toEqual(expectedAction);
  });
});
