export interface Quiz {
  isSubmitted: boolean;
  isChanged: boolean;
  deliveryArea: DeliveryAreaChoice;
  name: string;
  email: string;
  reason: FurnitureReason;
  budget: BudgetTier;
  rooms: Rooms;
  styles: string[];
  selectedRooms: WhatRoomsChoice[];
  selectedImages: string[];
  numberOfBedrooms: number;
  currentBedroomIndex: number;
  currentStepIndex: number;
  steps: Steps[];
  dateChanged: Date | null;
  locationPathBeforeQuizOpened: string;
  direction: Direction;
  uuid: string;
}

export interface QuizAnswers {
  name: string;
  email: string;
  deliveryArea: DeliveryAreaChoice;
  planMonths: number;
  reason: FurnitureReason;
  budget: BudgetTier;
  styles: string[];
  rooms: Rooms;
  isChanged?: boolean;
}

export interface Rooms {
  diningRoom: { chairs: string };
  livingRoom: {
    function: string;
    roomSize: string;
  };
  homeOffice: {
    workFrequency: string;
  };
  bedrooms: {
    bedSize: string;
  }[];
}

// These steps are in order of the quiz flow.
export enum Steps {
  SelectLocation = 'select-location',
  Why = 'why',
  WhatRooms = 'what-rooms',
  NumberOfBedrooms = 'number-bedrooms',
  BedSize = 'bed-size',
  LivingRoomSize = 'living-room-size',
  LivingRoomFunction = 'living-room-function',
  DiningRoomChairs = 'dining-room-chairs',
  HomeOffice = 'home-office',
  Budget = 'budget',
  Style = 'style',
  Final = 'final'
}

export enum BudgetTier {
  Tier1 = 'tier-1',
  Tier2 = 'tier-2',
  Tier3 = 'tier-3',
  None = 'none'
}

export enum FurnitureReason {
  MovingNewCity = 'moving-new-city',
  MovingSameCity = 'moving-same-city',
  UpdatingSpace = 'updating-space',
  RentingSpace = 'renting-space',
  None = 'none'
}

export enum DeliveryAreaChoice {
  NYC = 'new-york',
  SF = 'san-francisco',
  LA = 'los-angeles',
  All = 'all'
}

export enum BedSizeChoice {
  Twin = 'twin',
  Full = 'full',
  Queen = 'queen',
  King = 'king'
}

export enum DiningRoomChairsChoice {
  Two = 'two',
  Four = 'four',
  Six = 'six'
}

export enum HomeOfficeChoice {
  Rarely = 'rarely',
  Sometimes = 'sometimes',
  Frequent = 'frequent'
}

export enum LivingRoomFunctionChoice {
  Relaxing = 'relaxing',
  Hosting = 'hosting-friends',
  Overnight = 'overnight-guests'
}

export enum LivingRoomSizeChoice {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum NumberOfBedroomsChoice {
  One = '1',
  Two = '2',
  Three = '3'
}

export enum WhatRoomsChoice {
  Bedroom = 'bedroom',
  Living = 'living-room',
  Dining = 'dining-room',
  Office = 'home-office'
}

export enum StyleTagChoice {
  Scandinavian = 'scandinavian',
  MidCentury = 'mid-century',
  Feminine = 'feminine',
  Masculine = 'masculine',
  Minimalist = 'minimalist',
  WarmNatural = 'warm-natural',
  Statement = 'statement'
}

export enum Direction {
  Forward = 'forward',
  Backward = 'backward'
}

export type QuizStepChoices =
  | DeliveryAreaChoice
  | BudgetTier
  | FurnitureReason
  | NumberOfBedroomsChoice
  | LivingRoomSizeChoice
  | LivingRoomFunctionChoice
  | HomeOfficeChoice
  | DiningRoomChairsChoice
  | BedSizeChoice
  | WhatRoomsChoice[]
  | string[];

export type QuizStepAction<T = Steps, C = QuizStepChoices> = {
  step: T;
  choice: C;
};

export type QuizStepChoicesAndSelections =
  | QuizStepAction<Steps.SelectLocation, DeliveryAreaChoice>
  | QuizStepAction<Steps.Why, FurnitureReason>
  | QuizStepAction<Steps.WhatRooms, WhatRoomsChoice[]>
  | QuizStepAction<Steps.NumberOfBedrooms, NumberOfBedroomsChoice>
  | QuizStepAction<Steps.BedSize, BedSizeChoice>
  | QuizStepAction<Steps.LivingRoomSize, LivingRoomSizeChoice>
  | QuizStepAction<Steps.LivingRoomFunction, LivingRoomFunctionChoice>
  | QuizStepAction<Steps.DiningRoomChairs, DiningRoomChairsChoice>
  | QuizStepAction<Steps.HomeOffice, HomeOfficeChoice>
  | QuizStepAction<Steps.Budget, BudgetTier>
  | QuizStepAction<Steps.Style, string[]>;
