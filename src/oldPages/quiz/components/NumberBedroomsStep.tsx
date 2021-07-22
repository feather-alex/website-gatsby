import React from "react";
import Header3 from "../../../ui/headers/Header3";
import { NumberOfBedroomsChoice, QuizStepChoices } from "../store/quiz.types";

export interface Props {
  numberBedrooms: number;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const NumberBedroomsStep = (props: Props) => {
  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>How many bedrooms do you want designed?</Header3>
      </div>

      <div className="quiz-step__options">
        <div className="list">
          <div
            className={`input-container ${
              props.numberBedrooms === 1 ? ` checked` : ``
            }`}
          >
            <input
              className="radio-input"
              type="radio"
              id="1"
              name="nb-rooms"
              value={NumberOfBedroomsChoice.One}
              checked={props.numberBedrooms === 1}
              onClick={() => props.handleNextStep(NumberOfBedroomsChoice.One)}
            />
            <label
              data-cy="bedroom-choice"
              className="radio-label"
              htmlFor="1"
              data-choice={1}
            >
              1 Bedroom
            </label>
          </div>

          <div
            className={`input-container ${
              props.numberBedrooms === 2 ? ` checked` : ``
            }`}
          >
            <input
              className="radio-input"
              type="radio"
              id="2"
              name="nb-rooms"
              value={NumberOfBedroomsChoice.Two}
              checked={props.numberBedrooms === 2}
              onClick={() => props.handleNextStep(NumberOfBedroomsChoice.Two)}
            />
            <label
              data-cy="bedroom-choice"
              className="radio-label"
              htmlFor="2"
              data-choice={2}
            >
              2 Bedrooms
            </label>
          </div>

          <div
            className={`input-container ${
              props.numberBedrooms === 3 ? ` checked` : ``
            }`}
          >
            <input
              className="radio-input"
              type="radio"
              id="3"
              name="nb-rooms"
              value={NumberOfBedroomsChoice.Three}
              checked={props.numberBedrooms === 3}
              onClick={() => props.handleNextStep(NumberOfBedroomsChoice.Three)}
            />
            <label
              data-cy="bedroom-choice"
              className="radio-label"
              htmlFor="3"
              data-choice={3}
            >
              3 Bedrooms
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberBedroomsStep;
