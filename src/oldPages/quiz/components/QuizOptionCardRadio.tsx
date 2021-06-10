/** @jsx jsx */

import { css, jsx } from '@emotion/core';

export interface Props {
  step: string;
  text?: string;
  choice: string;
  className: string;
  subtext?: string;
  checked: boolean;
  image: Element | JSX.Element | string;
  handleNextStep: () => void;
}

const QuizOptionCard = (props: Props) => {
  const { text, step, image, choice, subtext, checked, className } = props;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`quiz-option-card radio-card ${checked ? ` checked ` : ``}` + className}
      onClick={props.handleNextStep}
    >
      <input type="radio" id={choice} name={step} value={choice} checked={checked} />
      <label data-cy="quiz-radio-card" className="clickable content" htmlFor={choice}>
        <div
          className="image"
          css={css`
            height: ${text ? '80%' : '100%'};
          `}
        >
          <div className="icon">{image}</div>
        </div>
        {text && (
          <div className="text">
            <div className="main">{text}</div>
            <div className="subtext">{subtext}</div>
          </div>
        )}
      </label>
    </div>
  );
};

export default QuizOptionCard;
