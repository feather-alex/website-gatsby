import { initialState, initialRoomState } from './quiz.reducer';
import {
  Quiz,
  FurnitureReason,
  DeliveryAreaChoice,
  WhatRoomsChoice,
  Steps,
  NumberOfBedroomsChoice,
  BedSizeChoice,
  LivingRoomSizeChoice,
  LivingRoomFunctionChoice,
  DiningRoomChairsChoice,
  HomeOfficeChoice,
  BudgetTier,
  QuizStepAction
} from './quiz.types';

// Select Location
export const selectLocationState: Quiz = {
  ...initialState
};

export const selectLocationPayload: QuizStepAction = {
  step: Steps.SelectLocation,
  choice: DeliveryAreaChoice.LA
};

// Why
export const whyStepState: Quiz = {
  ...initialState,
  currentStepIndex: 1,
  deliveryArea: DeliveryAreaChoice.LA
};

export const whyStepPayload: QuizStepAction = {
  step: Steps.Why,
  choice: FurnitureReason.MovingSameCity
};

// What Rooms
export const whatRoomsStepState: Quiz = {
  ...whyStepState,
  reason: FurnitureReason.MovingSameCity,
  currentStepIndex: 2
};

export const whatRoomsStepPayload: QuizStepAction = {
  step: Steps.WhatRooms,
  choice: [WhatRoomsChoice.Bedroom, WhatRoomsChoice.Living, WhatRoomsChoice.Dining, WhatRoomsChoice.Office]
};

// Number of Bedrooms
export const numberOfBedroomsStepState: Quiz = {
  ...whatRoomsStepState,
  rooms: { ...initialRoomState },
  currentStepIndex: 3,
  selectedRooms: [WhatRoomsChoice.Bedroom, WhatRoomsChoice.Living, WhatRoomsChoice.Dining, WhatRoomsChoice.Office],
  steps: [
    Steps.SelectLocation,
    Steps.Why,
    Steps.WhatRooms,
    Steps.NumberOfBedrooms,
    Steps.LivingRoomSize,
    Steps.LivingRoomFunction,
    Steps.DiningRoomChairs,
    Steps.HomeOffice,
    Steps.Budget,
    Steps.Style,
    Steps.Final
  ]
};

export const numberOfBedroomsStepPayload: QuizStepAction = {
  step: Steps.NumberOfBedrooms,
  choice: NumberOfBedroomsChoice.Two
};

// Bed Size (1st)
export const bedSizeOneStepState: Quiz = {
  ...numberOfBedroomsStepState,
  currentStepIndex: 4,
  numberOfBedrooms: 2,
  steps: [
    Steps.SelectLocation,
    Steps.Why,
    Steps.WhatRooms,
    Steps.NumberOfBedrooms,
    Steps.BedSize,
    Steps.BedSize,
    Steps.LivingRoomSize,
    Steps.LivingRoomFunction,
    Steps.DiningRoomChairs,
    Steps.HomeOffice,
    Steps.Budget,
    Steps.Style,
    Steps.Final
  ]
};

export const bedSizeOneStepPayload: QuizStepAction = {
  step: Steps.BedSize,
  choice: BedSizeChoice.Full
};

// Bed Size (2nd)
export const bedSizeTwoStepState: Quiz = {
  ...bedSizeOneStepState,
  currentStepIndex: 5,
  currentBedroomIndex: 1,
  rooms: {
    ...bedSizeOneStepState.rooms,
    bedrooms: [{ bedSize: BedSizeChoice.Full }]
  }
};

export const bedSizeTwoStepPayload: QuizStepAction = {
  step: Steps.BedSize,
  choice: BedSizeChoice.Queen
};

// Living Room Size
export const livingRoomSizeStepState: Quiz = {
  ...bedSizeTwoStepState,
  currentStepIndex: 6,
  currentBedroomIndex: 1,
  rooms: {
    ...bedSizeTwoStepState.rooms,
    bedrooms: [...bedSizeTwoStepState.rooms.bedrooms, { bedSize: BedSizeChoice.Queen }]
  }
};

export const livingRoomSizeStepPayload: QuizStepAction = {
  step: Steps.LivingRoomSize,
  choice: LivingRoomSizeChoice.Large
};

// Living Room Function
export const livingRoomFunctionStepState: Quiz = {
  ...livingRoomSizeStepState,
  currentStepIndex: 7,
  rooms: {
    ...livingRoomSizeStepState.rooms,
    livingRoom: {
      ...livingRoomSizeStepState.rooms.livingRoom,
      roomSize: LivingRoomSizeChoice.Large
    }
  }
};

export const livingRoomFunctionStepPayload: QuizStepAction = {
  step: Steps.LivingRoomFunction,
  choice: LivingRoomFunctionChoice.Hosting
};

// Dining Room Chairs
export const DiningRoomChairsStepState: Quiz = {
  ...livingRoomFunctionStepState,
  currentStepIndex: 8,
  rooms: {
    ...livingRoomFunctionStepState.rooms,
    livingRoom: {
      ...livingRoomFunctionStepState.rooms.livingRoom,
      function: LivingRoomFunctionChoice.Hosting
    }
  }
};

export const DiningRoomChairsStepPayload: QuizStepAction = {
  step: Steps.DiningRoomChairs,
  choice: DiningRoomChairsChoice.Four
};

// Home Office
export const HomeOfficeStepState: Quiz = {
  ...DiningRoomChairsStepState,
  currentStepIndex: 9,
  rooms: {
    ...DiningRoomChairsStepState.rooms,
    diningRoom: {
      chairs: DiningRoomChairsChoice.Four
    }
  }
};

export const HomeOfficeStepPayload: QuizStepAction = {
  step: Steps.HomeOffice,
  choice: HomeOfficeChoice.Sometimes
};

// Budget
export const BudgetStepState: Quiz = {
  ...HomeOfficeStepState,
  currentStepIndex: 10,
  rooms: {
    ...HomeOfficeStepState.rooms,
    homeOffice: {
      workFrequency: HomeOfficeChoice.Sometimes
    }
  }
};

export const BudgetStepPayload: QuizStepAction = {
  step: Steps.Budget,
  choice: BudgetTier.Tier2
};

// Styles
export const StylesStepState: Quiz = {
  ...BudgetStepState,
  currentStepIndex: 11,
  budget: BudgetTier.Tier2
};

export const StylesStepPayload: QuizStepAction = {
  step: Steps.Style,
  choice: ['11_scandinavian', '14_scandinavian', '19_scandinavian', '24_scandinavian', '27_mid-century']
};

// Final
export const FinalStepState: Quiz = {
  ...StylesStepState,
  currentStepIndex: 12,
  selectedImages: ['11_scandinavian', '14_scandinavian', '19_scandinavian', '24_scandinavian', '27_mid-century'],
  styles: ['scandinavian', 'scandinavian', 'scandinavian', 'scandinavian', 'mid-century']
};
