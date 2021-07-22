import { FluxStandardAction } from "../../../types/FluxStandardActions";
import * as actions from "./dimensions.actions";
import { expectSaga } from "redux-saga-test-plan";
import * as sagas from "./dimensions.sagas";

describe("Window Dimensions - Sagas", () => {
  describe("handleWindowResize", () => {
    it("Should dispatch the windowResize action creator", () => {
      const height = 10;
      const width = 20;

      const action: FluxStandardAction = {
        type: actions.HANDLE_WINDOW_RESIZE,
        payload: { height, width },
      };

      return expectSaga(sagas.handleWindowResize, action)
        .put(actions.handleWindowResize(height, width))
        .run();
    });
  });
});
