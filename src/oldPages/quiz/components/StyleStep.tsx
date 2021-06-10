/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import MasonryGrid from './MasonryGrid';
import MasonryTile from './MasonryTile';
import React from 'react';
import Header3 from '../../../ui/headers/Header3';
import Button from '../../../ui/buttons/Button';
import { QuizStepChoices } from '../store/quiz.types';
import { images } from './styleStepImages';

export interface Props {
  selectedImages: string[];
  handleNextStep: (choice: QuizStepChoices) => void;
  handleQuizClose: () => void;
  windowHeight: number;
  windowWidth: number;
}

interface State {
  selections: string[];
}

class WhyStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selections: props.selectedImages
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleNextStep = () => {
    this.props.handleNextStep(this.state.selections);
  };

  handleSelectStyles = (event: React.MouseEvent<HTMLDivElement>) => {
    const { selections } = this.state;
    const currentSelection = event.currentTarget.dataset.choice;

    if (currentSelection && selections.indexOf(currentSelection) !== -1) {
      const newSelections = selections.filter((item: string) => item !== currentSelection);
      this.setState({ selections: newSelections });
    } else if (currentSelection) {
      this.setState({
        selections: [...selections, currentSelection]
      });
    }
  };

  render() {
    const { selections } = this.state;
    const buttonDisabled = selections.length < 5;

    return (
      <div className="quiz-step style-step">
        <div className="quiz-step__question">
          <Header3>Choose designs that fit your style</Header3>
          <p className="info">*Choose a minimum of five styles</p>
        </div>

        <div className="quiz-step__options">
          <div className="masonry-container">
            <MasonryGrid windowWidth={this.props.windowWidth} windowHeight={this.props.windowHeight}>
              {images.map((image, id) => {
                return (
                  <MasonryTile
                    key={id}
                    src={image.src}
                    id={id}
                    choice={image.choice}
                    handleSelect={this.handleSelectStyles}
                    checked={selections.indexOf(image.choice) !== -1}
                  />
                );
              })}
            </MasonryGrid>
          </div>
        </div>

        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          `}
          className="quiz-actions-masonry"
        >
          <Button dataCy="quiz-next-button" isDisabled={buttonDisabled} onClick={this.handleNextStep}>
            Next
          </Button>
          <div role="button" tabIndex={0} className="clickable" onClick={this.props.handleQuizClose}>
            Close
          </div>
        </div>
      </div>
    );
  }
}

export default WhyStep;
