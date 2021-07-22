import React from "react";
import QuizOptionCardRadio from "./QuizOptionCardRadio";
import TVRemoteIcon from "../../../assets/icons/quiz/icon_tv_remote.svg";
import PillowsIcon from "../../../assets/icons/quiz/icon_pillows.svg";
import CardsIcon from "../../../assets/icons/quiz/icon_playing_cards.svg";
import Header3 from "../../../ui/headers/Header3";
import { LivingRoomFunctionChoice, QuizStepChoices } from "../store/quiz.types";

export interface Props {
  livingRoomFunction: string;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const LivingRoomFunctionStep = (props: Props) => {
  const options = [
    {
      image: <TVRemoteIcon />,
      text: "Relaxing & hanging out",
      choice: LivingRoomFunctionChoice.Relaxing,
    },
    {
      image: <CardsIcon />,
      text: "Getting together with friends",
      choice: LivingRoomFunctionChoice.Hosting,
    },
    {
      image: <PillowsIcon />,
      text: "Hosting overnight guests",
      choice: LivingRoomFunctionChoice.Overnight,
    },
  ];

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>Which do you use your living room for?</Header3>
      </div>

      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            step="living-room-function"
            key={index}
            choice={opt.choice}
            text={opt.text}
            image={opt.image}
            checked={props.livingRoomFunction === opt.choice}
            handleNextStep={() => props.handleNextStep(opt.choice)}
            className="no-subtext"
          />
        ))}
      </div>
    </div>
  );
};

export default LivingRoomFunctionStep;
