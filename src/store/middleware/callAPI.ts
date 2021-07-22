import { Dispatch, Action } from "redux";

interface ActionObj {
  types: Array<string>;
  callAPI: Function;
  shouldCallAPI: Function;
  payload: object;
}

export default function callAPIMiddleware({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: Function;
}) {
  return (next: Function) => (action: ActionObj) => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (types.length !== 3) {
      throw new Error("Expected an array of three string types.");
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign({}, payload, {
        type: requestType,
      })
    );

    return (
      callAPI()
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) =>
          dispatch(
            Object.assign({}, payload, {
              response,
              type: successType,
            })
          )
        )
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          dispatch(
            Object.assign({}, payload, {
              error: {
                message: error.message,
                status: error.status,
                error: error.error,
                body: error.body,
              },
              type: failureType,
            })
          );
        })
    );
  };
}
