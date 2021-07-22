import Cookies from "js-cookie";
import { SagaIterator } from "redux-saga";
import { put, call, takeLatest, select, delay } from "redux-saga/effects";
import { FluxStandardAction } from "../../../../types/FluxStandardActions";
import Request, { RequestMethod } from "../../../../api/request";
import { history } from "../../../../store/history";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_EXPIRATION,
  CHECK_AUTHENTICATION,
  loginSuccess,
  loginFailure,
  logOutExpiration,
  logOut,
  resetAuthentication,
} from "./login.actions";
import { getEmailHasNotBeenVerified } from "./login.selectors";
import { LoginResponseResource } from "./login.types";
import Analytics from "../../../../analytics/analytics";
import { ACCOUNTS } from "../../../../analytics/accounts/events";
import {
  showNavbarBanner,
  dismissNavbarBanner,
} from "../../../../app/store/navbar/navbar.actions";
import { BannerType } from "../../../../app/store/navbar/navbar.types";

export function* handleLogin(action: FluxStandardAction): SagaIterator {
  try {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = yield call(
      [Request, "send"],
      RequestMethod.POST,
      "/auth/login",
      undefined,
      action.payload.credentials
    );
    const loginResponse = response as LoginResponseResource;
    yield call(Cookies.set, "token", loginResponse.token, {
      expires: new Date(new Date().getTime() + loginResponse.expiresIn * 1000),
    });

    yield call(Analytics.trackUser, {
      properties: {
        name: `${loginResponse.firstName} ${loginResponse.lastName}`,
        email: action.payload.credentials.email,
      },
    });
    if (loginResponse.customerId) {
      yield call(Analytics.tatariIdentify, loginResponse.customerId);
    }

    yield put(loginSuccess(loginResponse));
    yield put(logOutExpiration({ expiresIn: loginResponse.expiresIn }));
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yield call(history.push as any, "/account");
  } catch (error) {
    yield put(loginFailure(error));

    // check for email verification
    const emailHasNotBeenVerified = yield select(getEmailHasNotBeenVerified);
    if (emailHasNotBeenVerified) {
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yield call(history.push as any, "/verify");
    }
  }
}

export function* handleLogout(): SagaIterator {
  yield call(Cookies.remove, "token");
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yield call(history.push as any, "/login");
  yield delay(200);
  yield put(
    showNavbarBanner({
      bannerType: BannerType.Announcement,
      message: `You've been logged out of your Feather Account`,
    })
  );
  yield delay(2500);
  yield put(dismissNavbarBanner());
}

export function* handleLogoutAutoExpiration(
  action: FluxStandardAction
): SagaIterator {
  yield delay(parseInt(action.payload.expiration.expiresIn, 10) * 1000);
  const isTokenPresent = yield call<(id: string) => string | undefined>(
    Cookies.get,
    "token"
  );
  if (!isTokenPresent) {
    yield call(Analytics.trackEvent, ACCOUNTS.LOGOUT_SESSION_EXPIRATION);
    yield put(logOut());
  }
}

export function* handleOnLoadAuthentication(): SagaIterator {
  const isTokenPresent = yield call<(id: string) => string | undefined>(
    Cookies.get,
    "token"
  );
  if (!isTokenPresent) {
    yield put(resetAuthentication());
  }
}

export default function* loginWatchers() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(LOGOUT_REQUEST, handleLogout);
  yield takeLatest(LOGOUT_EXPIRATION, handleLogoutAutoExpiration);
  yield takeLatest(CHECK_AUTHENTICATION, handleOnLoadAuthentication);
}
