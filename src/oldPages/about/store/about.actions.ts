import {
  ActionCreator,
  FluxStandardAction,
} from "../../../types/FluxStandardActions";
import { Department } from "./about.types";

export const FETCH_OPEN_POSITIONS_REQUEST = "FETCH_OPEN_POSITIONS_REQUEST";
export const FETCH_OPEN_POSITIONS_SUCCESS = "FETCH_OPEN_POSITIONS_SUCCESS";
export const FETCH_OPEN_POSITIONS_FAILURE = "FETCH_OPEN_POSITIONS_FAILURE";

export const fetchOpenPositionsRequest: ActionCreator = () => ({
  type: FETCH_OPEN_POSITIONS_REQUEST,
});

export type FetchOpenPositionsSuccess = (
  jobsByDepartments: Department[]
) => FluxStandardAction;
export const fetchOpenPositionsSuccess: FetchOpenPositionsSuccess = (
  jobsByDepartments: Department[]
) => ({
  type: FETCH_OPEN_POSITIONS_SUCCESS,
  payload: jobsByDepartments,
});

export const fetchOpenPositionsFailure: ActionCreator = () => ({
  type: FETCH_OPEN_POSITIONS_FAILURE,
});
