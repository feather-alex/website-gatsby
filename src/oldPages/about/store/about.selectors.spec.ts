import { State as GlobalState } from "../../../types/ReduxState";
import * as selectors from "./about.selectors";
import { About } from "./about.types";
import { initialState } from "./about.reducer";

describe("About Selectors", () => {
  let state: About;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe("getDepartments", () => {
    it("should return an array of all the departments at Feather", () => {
      const depts = [
        {
          child_ids: [],
          id: 4021344002,
          jobs: [],
          name: "Account Management",
          parent_id: null,
        },
        {
          child_ids: [],
          id: 4024777002,
          jobs: [
            {
              id: 4438706002,
              title: "Senior Data Scientist",
              location: { name: "NYC Office" },
              updated_at: "2019-12-10T10:19:42-05:00",
              absolute_url:
                "https://boards.greenhouse.io/feather/jobs/4438706002",
              internal_job_id: 4360427002,
              metadata: null,
            },
          ],
          name: "Data",
          parent_id: null,
        },
      ];

      state = {
        ...state,
        allDepartments: depts,
      };

      const departments = selectors.getDepartments({
        about: state,
      } as GlobalState);
      expect(departments).toEqual(depts);
    });

    it("should return null if there are no departments defined", () => {
      state = {
        ...state,
        allDepartments: null,
      };

      const departments = selectors.getDepartments({
        about: state,
      } as GlobalState);
      expect(departments).toBeNull();
    });
  });

  describe("getOpenPositions", () => {
    it("should return an array with only departments that have open positions", () => {
      const dataDept = {
        child_ids: [],
        id: 4024777002,
        jobs: [
          {
            id: 4438706002,
            title: "Senior Data Scientist",
            location: { name: "NYC Office" },
            updated_at: "2019-12-10T10:19:42-05:00",
            absolute_url:
              "https://boards.greenhouse.io/feather/jobs/4438706002",
            internal_job_id: 4360427002,
            metadata: null,
          },
        ],
        name: "Data",
        parent_id: null,
      };

      state = {
        ...state,
        allDepartments: [
          {
            child_ids: [],
            id: 4021344002,
            jobs: [],
            name: "Account Management",
            parent_id: null,
          },
          dataDept,
        ],
      };

      const departmentsWithOpenPositions = selectors.getOpenPositions({
        about: state,
      } as GlobalState);
      expect(departmentsWithOpenPositions).toEqual([dataDept]);
    });

    it("should return an empty array if there are no open positions at the time", () => {
      state = {
        ...state,
        allDepartments: [
          {
            child_ids: [],
            id: 4021344002,
            jobs: [],
            name: "Account Management",
            parent_id: null,
          },
          {
            child_ids: [],
            id: 4024777002,
            jobs: [],
            name: "Data",
            parent_id: null,
          },
        ],
      };

      const departmentsWithOpenPositions = selectors.getOpenPositions({
        about: state,
      } as GlobalState);
      expect(departmentsWithOpenPositions).toEqual([]);
    });

    it("should return null if there are no departments", () => {
      state = {
        ...state,
        allDepartments: null,
      };

      const departmentsWithOpenPositions = selectors.getOpenPositions({
        about: state,
      } as GlobalState);
      expect(departmentsWithOpenPositions).toBeNull();
    });
  });
});
