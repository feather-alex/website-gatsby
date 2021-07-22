import { SagaIterator } from "redux-saga";
import { takeLatest, call, put } from "redux-saga/effects";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import Request, { RequestMethod } from "../../../../api/request";
import {
  RESET_PASSWORD_REQUEST,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "./forgot.password.actions";

export function* handleResetPassword(action: FluxStandardAction): SagaIterator {
  try {
    yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/auth/reset-password",
      undefined,
      action.payload.email,
      true
    );

    yield put(resetPasswordSuccess());
  } catch (error) {
    yield put(resetPasswordFailure(error));
  }
}

export default function* forgotPasswordWatchers() {
  yield takeLatest(RESET_PASSWORD_REQUEST, handleResetPassword);
}
