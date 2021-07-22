import React from "react";
import QuizOptionCardCheckbox from "./QuizOptionCardCheckbox";
import QuizActions from "./QuizActions";
import DinnerwareIcon from "../../../assets/icons/quiz/icon_dinnerware.svg";
// import PaperPenIcon from '../../../assets/icons/quiz/icon_paper_and_pen.svg';
import PillowsIcon from "../../../assets/icons/quiz/icon_pillows.svg";
import TvIcon from "../../../assets/icons/quiz/icon_flatscreen_tv.svg";
import Header3 from "../../../ui/headers/Header3";
import { WhatRoomsChoice, QuizStepChoices } from "../store/quiz.types";

export interface Props {
  selectedRooms: WhatRoomsChoice[];
  handleNextStep: (choice: QuizStepChoices) => void;
}

interface State {
  selections: WhatRoomsChoice[];
}

class WhatRoomsStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selections: props.selectedRooms,
    };
  }

  handleSelectRooms = (currentSelection: WhatRoomsChoice) => {
    const { selections } = this.state;

    if (currentSelection) {
      if (selections.indexOf(currentSelection) !== -1) {
        const newSelections = selections.filter((item: string) => {
          return item !== currentSelection;
        });
        this.setState({ selections: newSelections });
      } else {
        this.setState((prevState) => ({
          selections: [...prevState.selections, currentSelection],
        }));
      }
    }
  };

  handleNextStep = () => {
    this.props.handleNextStep(this.state.selections);
  };

  render() {
    const { selections } = this.state;

    const buttonDisabled = selections.length === 0;

    const options = [
      {
        image: <PillowsIcon />,
        text: "Bedroom",
        choice: WhatRoomsChoice.Bedroom,
      },
      {
        image: <TvIcon />,
        text: "Living Room",
        choice: WhatRoomsChoice.Living,
      },
      {
        image: <DinnerwareIcon />,
        text: "Dining Room",
        choice: WhatRoomsChoice.Dining,
      },
      // {
      //   image: <PaperPenIcon />,
      //   text: 'Home Office',
      //   choice: WhatRoomsChoice.Office
      // }
    ];

    return (
      <div className="quiz-step">
        <div className="quiz-step__question">
          <Header3>Which room(s) do you need furnished?</Header3>
        </div>

        <div className="quiz-step__options">
          {options.map((opt, index) => (
            <QuizOptionCardCheckbox
              key={index}
              text={opt.text}
              image={opt.image}
              choice={opt.choice}
              className="no-subtext with-checkbox"
              handleSelect={() => this.handleSelectRooms(opt.choice)}
              checked={selections.includes(opt.choice)}
            />
          ))}
        </div>

        <QuizActions
          buttonDisabled={buttonDisabled}
          handleNextStep={this.handleNextStep}
        />
      </div>
    );
  }
}

export default WhatRoomsStep;
