/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Switch, Route } from 'react-router-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { State as GlobalState } from '../../types/ReduxState';
import { getIsQuizOverlayOpen } from '../../app/store/overlay/overlay.selectors';
import { getWindowHeight, getWindowWidth } from '../../app/store/dimensions/dimensions.selectors';
import { getProductEntities } from '../../app/store/entities/entities.selectors';
import { ProductEntities } from '../../app/store/entities/entities.types';
import LivingRoomFunctionStep from './components/LivingRoomFunctionStep';
import DiningRoomChairsStep from './components/DiningRoomChairsStep';
import LivingRoomSizeStep from './components/LivingRoomSizeStep';
import NumberBedroomsStep from './components/NumberBedroomsStep';
import SelectLocationStep from './components/SelectLocationStep';
import HomeOfficeStep from './components/HomeOfficeStep';
import WhatRoomsStep from './components/WhatRoomsStep';
import BedSizeStep from './components/BedSizeStep';
import BudgetStep from './components/BudgetStep';
import StyleStep from './components/StyleStep';
import FinalStep from './components/FinalStep';
import WhyStep from './components/WhyStep';
import {
  submitQuiz as submitQuizAction,
  SubmitQuiz,
  quizStepCompleted as quizStepCompletedAction,
  QuizStepCompleted,
  quizStepBack,
  QuizStepBack,
  resetQuiz as resetQuizAction,
  ResetQuiz
} from './store/quiz.actions';
import {
  getLocationPathBeforeQuizOpened,
  getQuizSteps,
  getCurrentStepIndex,
  getQuizDeliveryArea,
  getReason,
  getBudget,
  getSelectedImages,
  getSelectedRooms,
  getNumberOfBedrooms,
  getCurrentBedroomIndex,
  getRooms,
  getDirection,
  getStyles,
  getIsSubmitted
} from './store/quiz.selectors';
import { Rooms, Steps, Direction, QuizStepChoices, DeliveryAreaChoice, WhatRoomsChoice } from './store/quiz.types';
import Analytics from '../../analytics/analytics';
import { QUIZ } from '../../analytics/quiz/events';
import { quizStepPayloadMapping } from '../../analytics/quiz/payload-mappings';
import CloseSignIcon from '../../ui/icons/CloseSignIcon';
import ArrowIcon, { Direction as ArrowDirection } from '../../ui/icons/ArrowIcon';
import { css, jsx } from '@emotion/core';

interface StateProps {
  routeToGoToOnClose: string;
  isQuizOverlayOpen: boolean;
  windowHeight: number;
  windowWidth: number;
  productEntities: ProductEntities | null;
  reason: string | null;
  budget: string | null;
  selectedImages: string[];
  styles: string[];
  selectedRooms: WhatRoomsChoice[];
  numberOfBedrooms: number;
  currentBedroomIndex: number;
  rooms: Rooms;
  currentStepIndex: number;
  steps: Steps[];
  deliveryArea: DeliveryAreaChoice;
  direction: Direction;
  isSubmitted: boolean;
}

interface DispatchProps {
  submitQuiz: SubmitQuiz;
  quizStepCompleted: QuizStepCompleted;
  quizStepBack: QuizStepBack;
  resetQuiz: ResetQuiz;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

class QuizOverlay extends React.Component<Props> {
  private quizOverlayRef = React.createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: Props) {
    const { history, isQuizOverlayOpen, location, currentStepIndex, steps, isSubmitted, resetQuiz } = this.props;
    // on step change, scroll to top, track in analytics, and route to corresponding path
    if (currentStepIndex !== prevProps.currentStepIndex) {
      if (this.quizOverlayRef.current) {
        this.quizOverlayRef.current.scrollTop = 0;
      }
      Analytics.trackEvent(QUIZ.STEP, quizStepPayloadMapping({ currentStep: steps[currentStepIndex] }));
      history.replace(`/style-quiz/${steps[currentStepIndex]}`);
    }

    // handle when quiz is opening
    if (!prevProps.isQuizOverlayOpen && isQuizOverlayOpen) {
      // if the quiz was submitted, or if the current step is out of
      // bounds of the array reset the quiz to initial state
      if (isSubmitted || steps[currentStepIndex] === undefined) {
        resetQuiz();
      } else if (location.pathname !== `/style-quiz/${steps[currentStepIndex]}`) {
        // if the pathname is not in sync with the current quiz step, replace with the correct route path
        Analytics.trackEvent(QUIZ.STEP, quizStepPayloadMapping({ currentStep: steps[currentStepIndex] }));
        history.replace(`/style-quiz/${steps[currentStepIndex]}`);
      }
    }
  }

  handleQuizClose = () => {
    const { routeToGoToOnClose, history } = this.props;
    history.replace(routeToGoToOnClose);
  };

  handleBack = () => {
    this.props.quizStepBack();
  };

  handleNextStep = (step: Steps) => (choice: QuizStepChoices) => {
    this.props.quizStepCompleted(step, choice);
  };

  handleFinalStep = (name: string, email: string) => {
    this.props.submitQuiz({ name, email });
  };

  render() {
    const {
      productEntities,
      location,
      isQuizOverlayOpen,
      windowHeight,
      windowWidth,
      steps,
      direction,
      currentStepIndex,
      deliveryArea,
      reason,
      selectedRooms,
      currentBedroomIndex,
      rooms,
      numberOfBedrooms,
      budget,
      selectedImages
    } = this.props;

    const numberSteps = steps.length < 7 ? 7 : steps.length;

    const chooseDesigns = steps[currentStepIndex] === Steps.Style;

    return (
      <div
        className={`quiz-overlay-container ${isQuizOverlayOpen ? ` show-me` : ``} ${chooseDesigns ? ` overflow` : ``}`}
      >
        <div ref={this.quizOverlayRef} className="quiz-overlay">
          <div className="quiz-progress">
            <div
              data-cy="quiz-back"
              role="button"
              tabIndex={0}
              onClick={this.handleBack}
              css={css`
                cursor: pointer;
                padding: 10px;
                position: relative;
                top: -1px;
                visibility: ${currentStepIndex === 0 ? 'hidden' : 'visible'};
              `}
            >
              <ArrowIcon direction={ArrowDirection.Left} width={15} />
            </div>
            <span data-cy="current-quiz-step" className="step">
              Step {currentStepIndex + 1} of {numberSteps}
            </span>
            <div
              data-cy="quiz-close"
              onClick={this.handleQuizClose}
              role="button"
              tabIndex={0}
              css={css`
                cursor: pointer;
                padding: 10px;
                position: relative;
                top: 2px;
              `}
            >
              <CloseSignIcon />
            </div>
          </div>

          <div className={`quiz-` + (direction === Direction.Backward ? 'backward' : 'forward')}>
            <CSSTransitionGroup
              transitionEnter={true}
              transitionEnterTimeout={600}
              transitionLeave={true}
              transitionLeaveTimeout={600}
              transitionName={`quiz-step-transition`}
            >
              <Switch location={location}>
                <Route path={`/style-quiz/${Steps.SelectLocation}`}>
                  <SelectLocationStep
                    key="step-plan-details"
                    deliveryAreas={productEntities ? productEntities.deliveryAreas : null}
                    location={deliveryArea}
                    handleNextStep={this.handleNextStep(Steps.SelectLocation)}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.Why}`}>
                  <WhyStep key="step-why" reason={reason} handleNextStep={this.handleNextStep(Steps.Why)} />
                </Route>
                <Route path={`/style-quiz/${Steps.WhatRooms}`}>
                  <WhatRoomsStep
                    key="step-rooms"
                    handleNextStep={this.handleNextStep(Steps.WhatRooms)}
                    selectedRooms={selectedRooms}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.LivingRoomSize}`}>
                  <LivingRoomSizeStep
                    key="step-living-room-size"
                    handleNextStep={this.handleNextStep(Steps.LivingRoomSize)}
                    livingRoomSize={rooms.livingRoom.roomSize}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.LivingRoomFunction}`}>
                  <LivingRoomFunctionStep
                    key="step-living-room-function"
                    handleNextStep={this.handleNextStep(Steps.LivingRoomFunction)}
                    livingRoomFunction={rooms.livingRoom.function}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.DiningRoomChairs}`}>
                  <DiningRoomChairsStep
                    key="step-dining-chairs"
                    handleNextStep={this.handleNextStep(Steps.DiningRoomChairs)}
                    diningRoomChairs={rooms.diningRoom.chairs}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.HomeOffice}`}>
                  <HomeOfficeStep
                    key="step-work-frequency"
                    handleNextStep={this.handleNextStep(Steps.HomeOffice)}
                    homeOffice={rooms.homeOffice.workFrequency}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.NumberOfBedrooms}`}>
                  <NumberBedroomsStep
                    key="step-total-bedrooms"
                    handleNextStep={this.handleNextStep(Steps.NumberOfBedrooms)}
                    numberBedrooms={numberOfBedrooms}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.BedSize}`}>
                  <BedSizeStep
                    current={currentBedroomIndex}
                    handleNextStep={this.handleNextStep(Steps.BedSize)}
                    bedrooms={rooms.bedrooms}
                    numberBedrooms={numberOfBedrooms}
                    key={`step-bed-size-${currentBedroomIndex}`}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.Budget}`}>
                  <BudgetStep key="step-budget" budget={budget} handleNextStep={this.handleNextStep(Steps.Budget)} />
                </Route>
                <Route path={`/style-quiz/${Steps.Style}`}>
                  <StyleStep
                    key="step-style"
                    handleNextStep={this.handleNextStep(Steps.Style)}
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                    selectedImages={selectedImages}
                    handleQuizClose={this.handleQuizClose}
                  />
                </Route>
                <Route path={`/style-quiz/${Steps.Final}`}>
                  <FinalStep
                    key="step-final"
                    handleFinalStep={this.handleFinalStep}
                    handleQuizClose={this.handleQuizClose}
                  />
                </Route>
              </Switch>
            </CSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  windowHeight: getWindowHeight(state),
  windowWidth: getWindowWidth(state),
  productEntities: getProductEntities(state),
  isQuizOverlayOpen: getIsQuizOverlayOpen(state),
  routeToGoToOnClose: getLocationPathBeforeQuizOpened(state),
  steps: getQuizSteps(state),
  currentStepIndex: getCurrentStepIndex(state),
  deliveryArea: getQuizDeliveryArea(state),
  reason: getReason(state),
  budget: getBudget(state),
  selectedImages: getSelectedImages(state),
  selectedRooms: getSelectedRooms(state),
  numberOfBedrooms: getNumberOfBedrooms(state),
  currentBedroomIndex: getCurrentBedroomIndex(state),
  rooms: getRooms(state),
  direction: getDirection(state),
  styles: getStyles(state),
  isSubmitted: getIsSubmitted(state)
});

const mapDispatchToProps: DispatchProps = {
  submitQuiz: submitQuizAction,
  quizStepCompleted: quizStepCompletedAction,
  resetQuiz: resetQuizAction,
  quizStepBack
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuizOverlay));
