import QuizOptionCardRadio from './QuizOptionCardRadio';
import BedQueenIcon from '../../../assets/icons/quiz/icon_bed_queen.svg';
// import BedTwinIcon from '../../../assets/icons/quiz/icon_bed_twin.svg';
import BedFullIcon from '../../../assets/icons/quiz/icon_bed_full.svg';
import BedKingIcon from '../../../assets/icons/quiz/icon_bed_king.svg';
import React from 'react';
import Header3 from '../../../ui/headers/Header3';
import { BedSizeChoice, QuizStepChoices } from '../store/quiz.types';

export interface Props {
  current: number;
  numberBedrooms: number;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bedrooms: Array<any>;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const BedSizeStep = (props: Props) => {
  const options = [
    // To return when stock is back
    // {
    //   image: <BedTwinIcon />,
    //   text: 'Twin',
    //   choice: BedSizeChoice.Twin
    // },
    {
      image: <BedFullIcon />,
      text: 'Full',
      choice: BedSizeChoice.Full
    },
    {
      image: <BedQueenIcon />,
      text: 'Queen',
      choice: BedSizeChoice.Queen
    },
    {
      image: <BedKingIcon />,
      text: 'King',
      choice: BedSizeChoice.King
    }
  ];

  const { current, bedrooms, numberBedrooms, handleNextStep } = props;

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>
          {numberBedrooms > 1 ? `Bedroom ${current + 1}: ` : null}
          What size bed do you need?
        </Header3>
      </div>

      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            key={index}
            step={`bed-size-${current}`}
            text={opt.text}
            image={opt.image}
            choice={opt.choice}
            checked={bedrooms[current] ? bedrooms[current].bedSize === opt.choice : false}
            handleNextStep={() => handleNextStep(opt.choice)}
            className="no-subtext"
          />
        ))}
      </div>
    </div>
  );
};

export default BedSizeStep;
