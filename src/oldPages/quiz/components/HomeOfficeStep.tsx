import React from 'react';
import QuizOptionCardRadio from './QuizOptionCardRadio';
import HourglassIcon from '../../../assets/icons/quiz/icon_hourglass.svg';
import StopWatchIcon from '../../../assets/icons/quiz/icon_stopwatch.svg';
import ClockIcon from '../../../assets/icons/quiz/icon_clock.svg';
import Header3 from '../../../ui/headers/Header3';
import { HomeOfficeChoice, QuizStepChoices } from '../store/quiz.types';

export interface Props {
  homeOffice: string;
  handleNextStep: (choice: QuizStepChoices) => void;
}

const HomeOfficeStep = (props: Props) => {
  const options = [
    {
      image: <StopWatchIcon />,
      text: 'Just a bit',
      subtext: 'Less than 10 hours a week',
      choice: HomeOfficeChoice.Rarely
    },
    {
      image: <ClockIcon />,
      text: 'Fairly often',
      subtext: 'Less than 30 hours a week',
      choice: HomeOfficeChoice.Sometimes
    },
    {
      image: <HourglassIcon />,
      text: 'I never leave',
      subtext: 'More than 30 hours a week',
      choice: HomeOfficeChoice.Frequent
    }
  ];

  return (
    <div className="quiz-step">
      <div className="quiz-step__question">
        <Header3>How often do you work from home?</Header3>
      </div>

      <div className="quiz-step__options">
        {options.map((opt, index) => (
          <QuizOptionCardRadio
            key={index}
            step="home-office"
            text={opt.text}
            subtext={opt.subtext}
            image={opt.image}
            choice={opt.choice}
            checked={props.homeOffice === opt.choice}
            handleNextStep={() => props.handleNextStep(opt.choice)}
            className="with-subtext"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeOfficeStep;
