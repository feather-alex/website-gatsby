import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, Store, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  persistReducer,
  createMigrate,
  MigrationManifest,
  // PersistedState,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import thunk from "redux-thunk";
// import { v1 } from "uuid";

import { history } from "./history";
import callAPI from "./middleware/callAPI";
import createRootReducer from "./reducer";
import sagas from "./sagas";
// import { MembershipState } from "../app/store/plan/plan.types";
// import { initialState as initialQuizState } from "../oldPages/quiz/store/quiz.reducer";
// import {
//   State as GlobalState,
//   V3State,
//   PreviousQuizState,
// } from "../types/ReduxState";
import { FluxStandardAction } from "../types/FluxStandardActions";
// import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, RESET_CART } from '../oldPages/cart/store/cart.actions';
// import { LOGIN_SUCCESS, LOGOUT_REQUEST } from '../oldPages/auth/login/store/login.actions';
import {
  CHANGE_MEMBERSHIP_SELECTION,
  ZIPCODE_SUBMIT_REQUEST,
  ZIPCODE_SUBMIT_SUCCESS,
} from "../app/store/plan/plan.actions";
// import Report from '../errorReporter';

// reset state migration list as this won't be needed after transition to gatsby
const migrations: MigrationManifest = {};

const syncedActions = [
  // ADD_ITEM_TO_CART,
  // REMOVE_ITEM_FROM_CART,
  // RESET_CART,
  // LOGIN_SUCCESS,
  // LOGOUT_REQUEST,
  CHANGE_MEMBERSHIP_SELECTION,
  ZIPCODE_SUBMIT_REQUEST, // zipcode is set in store when the request fires
  ZIPCODE_SUBMIT_SUCCESS,
];

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const configureStore = (): Store<any> => {
  const persistConfig = {
    key: "_root",
    version: 4,
    storage,
    whitelist: [
      "plan",
      "cart",
      "quiz",
      "navigation",
      "quizPackages",
      "globalAesthetics",
      "trackingParameters",
      "auth",
    ],
    stateReconciler: autoMergeLevel2,
    migrate: createMigrate(migrations),
  };
  const stateSyncConfig = {
    // only trigger sync in all tabs for selected syncedActions:
    predicate: (action: FluxStandardAction) =>
      syncedActions.includes(action.type),
    channel: "redux-state-sync",
  };

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history)
  );

  const sagaMiddleware = createSagaMiddleware({
    onError(error, { sagaStack }) {
      console.error(error);

      // Report.captureException(error, {
      //   context: {
      //     sagaStack
      //   }
      // });
    },
  });
  const routerMiddleware = createRouterMiddleware(history);
  const stateSyncMiddleware = createStateSyncMiddleware(stateSyncConfig);

  const middleware: Middleware[] = [
    thunk,
    callAPI,
    sagaMiddleware,
    routerMiddleware,
    stateSyncMiddleware,
  ];

  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  // this is used by redux-state-sync to pass store.dispatch to the message listener
  initMessageListener(store);

  sagaMiddleware.run(sagas);

  return store;
};

export default configureStore();
