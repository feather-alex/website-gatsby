import { FluxStandardAction } from '../../../types/FluxStandardActions';
import { FETCH_QUIZ_RESULTS_SUCCESS } from '../../detailsPage/components/packages/quizResults/store/quizResults.actions';
import { QuizPkgs } from '../../detailsPage/components/packages/quizResults/store/quizResults.types';
import { QuizStepChoices, Steps } from './quiz.types';

export const RESET_QUIZ = 'RESET_QUIZ';
export type ResetQuiz = () => QuizActions;

export const resetQuiz: ResetQuiz = () => ({
  type: RESET_QUIZ
});

export const SUBMIT_QUIZ = 'SUBMIT_QUIZ';
export type SubmitQuiz = ({ name, email }: { name: string; email: string }) => QuizActions;

export const submitQuiz: SubmitQuiz = ({ name, email }: { name: string; email: string }) => ({
  type: SUBMIT_QUIZ,
  payload: { name, email }
});

export const QUIZ_STEP_COMPLETED = 'QUIZ_STEP_COMPLETED';
export type QuizStepCompleted = (step: Steps, choice: QuizStepChoices) => QuizActions;

export const quizStepCompleted: QuizStepCompleted = (step: Steps, choice: QuizStepChoices) => ({
  type: QUIZ_STEP_COMPLETED,
  payload: { step, choice }
});

export const QUIZ_STEP_BACK = 'QUIZ_STEP_BACK';
export type QuizStepBack = () => QuizActions;

export const quizStepBack: QuizStepBack = () => ({
  type: QUIZ_STEP_BACK
});

export const QUIZ_OPENED = 'QUIZ_OPENED';
export type QuizOpened = (pathname: string) => QuizActions;

export const quizOpened: QuizOpened = (pathname: string) => ({
  type: QUIZ_OPENED,
  payload: { pathname }
});

export type QuizActions =
  | FluxStandardAction<typeof RESET_QUIZ>
  | FluxStandardAction<
      typeof SUBMIT_QUIZ,
      {
        name: string;
        email: string;
      }
    >
  | FluxStandardAction<
      typeof QUIZ_OPENED,
      {
        pathname: string;
      }
    >
  | FluxStandardAction<typeof QUIZ_STEP_COMPLETED, { step: Steps; choice: QuizStepChoices }>
  | FluxStandardAction<typeof QUIZ_STEP_BACK>
  | FluxStandardAction<
      typeof FETCH_QUIZ_RESULTS_SUCCESS,
      {
        quizPkgs: QuizPkgs;
      }
    >;
