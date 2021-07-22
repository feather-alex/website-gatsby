import { createAction } from "@reduxjs/toolkit";

/*
 This helper method automatically creates three actions
 necessary in order to make an asynchronous request.
 Example Usage:
 const fetchUser = createRequestAction<{}, { user: User }, { error: Error }>('fetchUser');
*/
export default function createRequestAction<R, S, F>(actionType: string) {
  return {
    request: createAction<R>(`${actionType}_REQUEST`),
    success: createAction<S>(`${actionType}_SUCCESS`),
    failure: createAction<F>(`${actionType}_FAILURE`),
  };
}
