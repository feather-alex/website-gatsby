import { ObjEntity } from "../../../../../../types/ReduxState";
import { PkgItem } from "../../../../../../types/Package";

export interface QuizPkgs {
  email?: string;
  name?: string;
  uuid?: string;
  diningRoom: PkgItem[][];
  livingRoom: PkgItem[][];
  homeOffice: PkgItem[][];
  bedroom1: PkgItem[][];
  bedroom2: PkgItem[][];
  bedroom3: PkgItem[][];
}

export interface StyleQuizResult {
  email?: string;
  name?: string;
  items: {
    diningRoom?: PkgItem[][];
    livingRoom?: PkgItem[][];
    homeOffice?: PkgItem[][];
    bedroom1?: PkgItem[][];
    bedroom2?: PkgItem[][];
    bedroom3?: PkgItem[][];
  };
}

export enum QuizRoom {
  DiningRoom = "diningRoom",
  LivingRoom = "livingRoom",
  HomeOffice = "homeOffice",
  Bedroom1 = "bedroom1",
  Bedroom2 = "bedroom2",
  Bedroom3 = "bedroom3",
}

export interface QuizResultsState extends ObjEntity<QuizPkgs | null> {
  activeQuizRoom: QuizRoom | null;
}
