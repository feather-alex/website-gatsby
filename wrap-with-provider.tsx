import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import createStore from "./src/store";
import Loading from "./src/components/Loading";

export default ({ element }) => {
  const { store, persistor } = createStore();
  console.log("store: ", store);
  console.log("persistor: ", persistor);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  );
};
