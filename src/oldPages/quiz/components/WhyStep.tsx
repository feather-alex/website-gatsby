import QuizOptionCardRadio from './QuizOptionCardRadio';
import MovingVanIcon from '../../../assets/icons/quiz/icon_moving_van.svg';
import HandShakeIcon from '../../../assets/icons/quiz/icon_handshake.svg';
import AirplaneIcon from '../../../assets/icons/quiz/icon_airplane.svg';
import NewHomeIcon from '../../../assets/icons/quiz/icon_new_home.svg';
import React from 'react';
import Header3 from '../../../ui/headers/Header3';
import { FurnitureReason } from '../store/quiz.types';

export interface Props {
  reason: string | null;
  handleNextStep: (choice: FurnitureReason) => void;
}

const WhyStep = (props: Props) => {
  const options = [
    {
      image: <AirplaneIcon />,
      text: 'Moving to a new city',
      choice: FurnitureReason.MovingNewCity
    },
    {
      image: <MovingVanIcon />,
      text: 'Moving within my city',
      choice: FurnitureReason.MovingSameCity
    },
    {
      image: <NewHomeIcon />,
      text: 'Updating my space',
      choice: FurnitureReason.UpdatingSpace
    },
    {
      image: <HandShakeIcon />,
      text: 'Renting out my space',
      choice: FurnitureReason.RentingSpace
    }
  ];

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>{"What's your current situation?"}</Header3>
      </div>
      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            step="why"
            key={index}
            text={opt.text}
            image={opt.image}
            choice={opt.choice}
            className="no-subtext"
            checked={props.reason === opt.choice}
            handleNextStep={() => props.handleNextStep(opt.choice)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyStep;
