import { initialRoomState } from './quiz.reducer';
import { Steps, Quiz, QuizStepChoicesAndSelections, WhatRoomsChoice } from './quiz.types';

export const handleQuizStepCompleted = (state: Quiz, quizStepAction: QuizStepChoicesAndSelections): Partial<Quiz> => {
  switch (quizStepAction.step) {
    case Steps.SelectLocation:
      return {
        deliveryArea: quizStepAction.choice
      };

    case Steps.Why:
      return {
        reason: quizStepAction.choice
      };

    case Steps.WhatRooms: {
      const newSteps: Steps[] = state.steps.slice(0, 3);

      if (quizStepAction.choice.includes(WhatRoomsChoice.Bedroom)) {
        newSteps.push(Steps.NumberOfBedrooms);
      }
      if (quizStepAction.choice.includes(WhatRoomsChoice.Living)) {
        newSteps.push(Steps.LivingRoomSize, Steps.LivingRoomFunction);
      }
      if (quizStepAction.choice.includes(WhatRoomsChoice.Dining)) {
        newSteps.push(Steps.DiningRoomChairs);
      }
      if (quizStepAction.choice.includes(WhatRoomsChoice.Office)) {
        newSteps.push(Steps.HomeOffice);
      }

      // setting rooms to initialState here ensures that we reset rooms in the
      // event the user goes backwards to this step after making room selections
      return {
        rooms: { ...initialRoomState },
        selectedRooms: quizStepAction.choice,
        steps: newSteps.concat(Steps.Budget, Steps.Style, Steps.Final)
      };
    }

    case Steps.NumberOfBedrooms: {
      const numberOfBedroomsSelected = parseInt(quizStepAction.choice, 10);
      let newSteps = [...state.steps];
      let newBedrooms = [...state.rooms.bedrooms];
      // if user goes back to number of bedrooms:
      if (newSteps.includes(Steps.BedSize)) {
        // if user selects less bedrooms than initial choice:
        if (numberOfBedroomsSelected < state.rooms.bedrooms.length) {
          newBedrooms = [];
        }

        newSteps = newSteps.filter((step: string) => step !== Steps.BedSize);
      }

      for (let i = 0; i < numberOfBedroomsSelected; i++) {
        newSteps.splice(state.currentStepIndex + 1, 0, Steps.BedSize);
      }

      return {
        numberOfBedrooms: numberOfBedroomsSelected,
        rooms: {
          ...state.rooms,
          bedrooms: newBedrooms
        },
        steps: newSteps
      };
    }

    case Steps.BedSize: {
      const newBedrooms = [...state.rooms.bedrooms];
      newBedrooms[state.currentBedroomIndex] = { bedSize: quizStepAction.choice };

      return {
        rooms: {
          ...state.rooms,
          bedrooms: newBedrooms
        },
        currentBedroomIndex:
          state.currentBedroomIndex + 1 < state.numberOfBedrooms
            ? state.currentBedroomIndex + 1
            : state.currentBedroomIndex
      };
    }

    case Steps.LivingRoomSize:
      return {
        rooms: {
          ...state.rooms,
          livingRoom: {
            ...state.rooms.livingRoom,
            roomSize: quizStepAction.choice
          }
        }
      };

    case Steps.LivingRoomFunction:
      return {
        rooms: {
          ...state.rooms,
          livingRoom: {
            ...state.rooms.livingRoom,
            function: quizStepAction.choice
          }
        }
      };

    case Steps.DiningRoomChairs:
      return {
        rooms: {
          ...state.rooms,
          diningRoom: {
            ...state.rooms.diningRoom,
            chairs: quizStepAction.choice
          }
        }
      };

    case Steps.HomeOffice:
      return {
        rooms: {
          ...state.rooms,
          homeOffice: {
            ...state.rooms.homeOffice,
            workFrequency: quizStepAction.choice
          }
        }
      };

    case Steps.Budget:
      return {
        budget: quizStepAction.choice
      };

    case Steps.Style:
      return {
        selectedImages: quizStepAction.choice,
        styles: quizStepAction.choice
          .map((i: string) => i.split('_')[1])
          .join()
          .split(',')
      };

    default:
      return {};
  }
};
