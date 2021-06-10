/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Button from '../../../ui/buttons/Button';

export interface Props {
  buttonDisabled: boolean;
  handleNextStep: () => void;
}

const QuizActions = (props: Props) => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
      className="quiz-actions"
    >
      <Button dataCy="quiz-next-button" onClick={props.handleNextStep} isDisabled={props.buttonDisabled}>
        Next
      </Button>
    </div>
  );
};

export default QuizActions;
