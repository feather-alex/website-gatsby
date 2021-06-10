import {
  FluxStandardAction,
  ActionCreator,
} from "../../../types/FluxStandardActions";
import { ProductEntities } from "./entities.types";
import { APIError } from "../../../types/ReduxState";

export const GET_ENTITIES_REQUEST = "GET_ENTITIES_REQUEST";
export const GET_ENTITIES_SUCCESS = "GET_ENTITIES_SUCCESS";
export const GET_ENTITIES_FAILURE = "GET_ENTITIES_FAILURE";

export type EntityActions =
  | FluxStandardAction<typeof GET_ENTITIES_REQUEST, undefined>
  | FluxStandardAction<typeof GET_ENTITIES_SUCCESS, ProductEntities>
  | FluxStandardAction<typeof GET_ENTITIES_FAILURE, { error: APIError }>;

export const getEntitiesRequest: ActionCreator<EntityActions> = () => ({
  type: GET_ENTITIES_REQUEST,
});

export type GetEntitiesSuccess = (payload: ProductEntities) => EntityActions;
export const getEntitiesSuccess: GetEntitiesSuccess = (
  payload: ProductEntities
) => ({
  type: GET_ENTITIES_SUCCESS,
  payload,
});

export type GetEntitiesFailure = (error: APIError) => EntityActions;
export const getEntitiesFailure: GetEntitiesFailure = (error: APIError) => ({
  type: GET_ENTITIES_FAILURE,
  payload: { error },
  error: true,
});
