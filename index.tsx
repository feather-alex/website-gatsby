import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";

import "intersection-observer";
// Important! - any side-effect imports must also be listed
// in the sideEffects array located in package.json
import "./assets/styles/style.scss";
import "./errorReporter";

import createStore from "./src/store";
import Loading from "./src/components/Loading";
import App from "./src/App";

import Session from "./src/utils/session";

loadStripe.setLoadParameters({ advancedFraudSignals: false });
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

Session.init();

export default ({ element }) => {
  const { store, persistor } = createStore();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Elements
          stripe={stripePromise}
          options={{
            fonts: [
              {
                src: "https://www.livefeather.com/src/assets/fonts/CentraNo2-Book.woff2",
                family: "Centra No2",
                style: "normal",
              },
            ],
          }}
        >
          <App>{element}</App>
        </Elements>
      </PersistGate>
    </Provider>
  );
};
