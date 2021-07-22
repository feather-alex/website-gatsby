import { FluxStandardAction } from "../../../types/FluxStandardActions";
import reducer, { initialState } from "./about.reducer";
import * as actions from "./about.actions";
import { About, Department } from "./about.types";

describe("About Reducer", () => {
  let state: About;

  beforeEach(() => (state = { ...initialState }));

  it("should handle fetch open positions request action", () => {
    const action: FluxStandardAction = {
      type: actions.FETCH_OPEN_POSITIONS_REQUEST,
    };

    const aboutState = reducer(state, action);
    expect(aboutState.isFetching).toEqual(true);
    expect(aboutState.error).toEqual(false);
  });

  it("should handle fetch open positions success action", () => {
    const departments: Department[] = [
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

    const action: FluxStandardAction = {
      type: actions.FETCH_OPEN_POSITIONS_SUCCESS,
      payload: departments,
    };

    const aboutState = reducer(state, action);
    expect(aboutState.isFetching).toEqual(false);
    expect(aboutState.allDepartments).toEqual(departments);
  });

  it("should handle fetch open positions failure action", () => {
    const action: FluxStandardAction = {
      type: actions.FETCH_OPEN_POSITIONS_FAILURE,
    };

    const aboutState = reducer(state, action);
    expect(aboutState.isFetching).toEqual(false);
    expect(aboutState.error).toEqual(true);
  });
});
