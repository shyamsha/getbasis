import { Action } from "redux";
import { put,call, takeLatest, all, fork } from "redux-saga/effects";
import { loginError, loginSuccess, phoneNumberError, phoneNumberSuccess, phoneNumberVerifyError, phoneNumberVerifySuccess } from "./actions";
import * as Api from "../../services/Api";
import { unknownError } from "../../utils/api-helper";
import { AuthActionTypes, PhoneNumber, PhoneNumberVerify } from "./types";

type SagaAction<T> = Action & { payload: T };

function* login() {
  try {
    const res = yield call(Api.logout);
    if (res.error) {
      yield put(loginError(res.error));
    } else {
      yield put(loginSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(loginError(err));
    } else {
      yield put(loginError(unknownError("An unknown error occured")));
    }
  }
}

function* phoneNumber({ payload: params }: SagaAction<PhoneNumber>) {
  try {
    const res = yield call(Api.phoneNumber,params);
    if (res.error) {
      yield put(phoneNumberError(res.error));
    } else {
      yield put(phoneNumberSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(phoneNumberError(err));
    } else {
      yield put(phoneNumberError(unknownError("An unknown error occurred")));
    }
  }
}

function* phoneNumberVerify({ payload: params }: SagaAction<PhoneNumberVerify>) {
  try {
    const res = yield call(Api.phoneNumber,params);
    if (res.error) {
      yield put(phoneNumberVerifyError(res.error));
    } else {
      yield put(phoneNumberVerifySuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(phoneNumberVerifyError(err));
    } else {
      yield put(phoneNumberVerifyError(unknownError("An unknown error occurred")));
    }
  }
}


// function* logout() {
//   try {
//     const res = yield call(Api.logout);
//     if (res.error) {
//       yield put(logoutError(res.error));
//     } else {
//       yield put(logoutSuccess(res.data));
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       yield put(logoutError(err));
//     } else {
//       yield put(logoutError(unknownError("An unknown error occured")));
//     }
//   }
// }

function* watchFetchRequest() {
    yield takeLatest(AuthActionTypes.LOGIN_REQUEST, login);
    yield takeLatest(AuthActionTypes.PHONE_NUMBER_REQUEST, phoneNumber);
    yield takeLatest(AuthActionTypes.PHONE_NUMBER_VERIFY_REQUEST, phoneNumberVerify);

  }

  export function* authSaga() {
    yield all([fork(watchFetchRequest)]);
  }
