/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import RoundCheckbox from "./RoundCheckbox";

export interface Props {
  text: string;
  choice: string;
  className: string;
  subtext?: string;
  checked: boolean;
  image: JSX.Element;
  handleSelect: () => void;
}

const QuizOptionCardCheckbox = (props: Props) => {
  const { text, image, choice, checked, subtext, className } = props;

  return (
    <div
      className={`quiz-option-card ${className} ${checked ? ` checked` : ``}`}
    >
      <div
        data-cy="quiz-card"
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        className={checked ? "clickable content checked" : " clickable content"}
        onClick={props.handleSelect}
      >
        <RoundCheckbox choice={choice} checked={checked} />

        <div
          className="image"
          css={css`
            height: ${text ? "80%" : "100%"};
          `}
        >
          <div className="icon">{image}</div>
        </div>

        <div className="text">
          <div className="main">{text}</div>
          <div className="subtext">{subtext}</div>
        </div>
      </div>
    </div>
  );
};

export default QuizOptionCardCheckbox;
