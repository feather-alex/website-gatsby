import QuizOptionCardRadio from "./QuizOptionCardRadio";
import Budget1Icon from "../../../assets/icons/quiz/icon_budget_1.svg";
import Budget2Icon from "../../../assets/icons/quiz/icon_budget_2.svg";
import Budget3Icon from "../../../assets/icons/quiz/icon_budget_3.svg";
import React from "react";
import Header3 from "../../../ui/headers/Header3";
import { BudgetTier, QuizStepChoices } from "../store/quiz.types";

export interface Props {
  budget: string | null;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const BudgetStep = (props: Props) => {
  const options = [
    {
      image: <Budget1Icon />,
      choice: BudgetTier.Tier1,
    },
    {
      image: <Budget2Icon />,
      choice: BudgetTier.Tier2,
    },
    {
      image: <Budget3Icon />,
      choice: BudgetTier.Tier3,
    },
  ];

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>What's your furniture budget?</Header3>
      </div>

      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            key={index}
            step="budget"
            image={opt.image}
            choice={opt.choice}
            checked={props.budget === opt.choice}
            handleNextStep={() => props.handleNextStep(opt.choice)}
            className="no-subtext"
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetStep;
