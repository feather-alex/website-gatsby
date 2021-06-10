import React from 'react';
import QuizOptionCardRadio from './QuizOptionCardRadio';
import ChampagneIcon from '../../../assets/icons/quiz/icon_champagne_toast.svg';
import ConfettiIcon from '../../../assets/icons/quiz/icon_confetti.svg';
import DinnerIcon from '../../../assets/icons/quiz/icon_romantic_dinner.svg';
import Header3 from '../../../ui/headers/Header3';
import { DiningRoomChairsChoice, QuizStepChoices } from '../store/quiz.types';

export interface Props {
  diningRoomChairs: string;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const DiningRoomChairsStep = (props: Props) => {
  const options = [
    {
      image: <ChampagneIcon />,
      text: '2 chairs',
      choice: DiningRoomChairsChoice.Two
    },
    {
      image: <DinnerIcon />,
      text: '4 chairs',
      choice: DiningRoomChairsChoice.Four
    },
    {
      image: <ConfettiIcon />,
      text: '6 chairs',
      choice: DiningRoomChairsChoice.Six
    }
  ];

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>How many chairs do you need?</Header3>
      </div>
      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            key={index}
            step="dining-room-chairs"
            text={opt.text}
            image={opt.image}
            choice={opt.choice}
            checked={props.diningRoomChairs === opt.choice}
            handleNextStep={() => props.handleNextStep(opt.choice)}
            className="no-subtext"
          />
        ))}
      </div>
    </div>
  );
};

export default DiningRoomChairsStep;
