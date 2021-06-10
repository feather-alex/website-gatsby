import React from "react";
import { Provider } from "react-redux";

import stateStore from "./src/store";

export default ({ element }) => (
  <Provider store={stateStore}>{element}</Provider>
);
