import { State as GlobalState } from "../../../types/ReduxState";
import { createSelector } from "reselect";
import { Department } from "./about.types";

export const getDepartments = ({ about }: GlobalState) => about.allDepartments;

export const getOpenPositions = createSelector(
  getDepartments,
  (departments: Department[]) =>
    departments && departments.length
      ? departments.filter(
          (department) => department.jobs && department.jobs.length
        )
      : null
);
