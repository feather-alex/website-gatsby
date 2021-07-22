import React from "react";
import QuizOptionCardRadio from "./QuizOptionCardRadio";
import FishBowelIcon from "../../../assets/icons/quiz/icon_fishbowel.svg";
import AquariumIcon from "../../../assets/icons/quiz/icon_aquarium.svg";
import OceanIcon from "../../../assets/icons/quiz/icon_ocean.svg";
import Header3 from "../../../ui/headers/Header3";
import { LivingRoomSizeChoice, QuizStepChoices } from "../store/quiz.types";

export interface Props {
  livingRoomSize: string;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const LivingRoomSizeStep = (props: Props) => {
  const options = [
    {
      image: <FishBowelIcon />,
      text: "Small",
      subtext: "Could barely fit a loveseat",
      choice: LivingRoomSizeChoice.Small,
    },
    {
      image: <AquariumIcon />,
      text: "Medium",
      subtext: "Could fit a 3-seater sofa",
      choice: LivingRoomSizeChoice.Medium,
    },
    {
      image: <OceanIcon />,
      text: "Large",
      subtext: "Could host a small yoga class",
      choice: LivingRoomSizeChoice.Large,
    },
  ];

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>{"What's the size of your living room?"}</Header3>
      </div>

      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            key={index}
            text={opt.text}
            image={opt.image}
            choice={opt.choice}
            subtext={opt.subtext}
            step="living-room-size"
            className="with-subtext"
            handleNextStep={() => props.handleNextStep(opt.choice)}
            checked={props.livingRoomSize === opt.choice}
          />
        ))}
      </div>
    </div>
  );
};

export default LivingRoomSizeStep;
