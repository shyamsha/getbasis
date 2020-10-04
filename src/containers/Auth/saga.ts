import { Action } from "redux";
import { put, call, takeLatest, all, fork } from "redux-saga/effects";
import {
  emailError,
  emailSuccess,
  emailVerifyError,
  emailVerifySuccess,
  logoutError,
  logoutSuccess,
  phoneNumberError,
  phoneNumberSuccess,
  phoneNumberVerifyError,
  phoneNumberVerifySuccess,
  referralCodeFailure,
  referralCodeSuccess,
  ReSendEmailError,
  ReSendEmailSuccess,
  reSendPhoneNumberError,
  reSendPhoneNumberSuccess,
  signUpError,
  SignUpSuccess,
} from "./actions";
import * as Api from "../../services/Api";
import { unknownError } from "../../utils/api-helper";
import {
  AuthActionTypes,
  EmailParams,
  EmailVerifyParams,
  LogoutParams,
  PhoneNumber,
  PhoneNumberVerify,
  ReSendEmailParams,
  ReSendPhoneNumber,
  SignUpParams,
} from "./types";

type SagaAction<T> = Action & { payload: T };
// Phone Verification API's calling
function* phoneNumber({ payload: params }: SagaAction<PhoneNumber>) {
  try {
    const res = yield call(Api.phoneNumber, params);
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

function* phoneNumberVerify({
  payload: params,
}: SagaAction<PhoneNumberVerify>) {
  try {
    const res = yield call(Api.phoneNumberVerify, params);
    if (res.error) {
      yield put(phoneNumberVerifyError(res.error));
    } else {
      yield put(phoneNumberVerifySuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(phoneNumberVerifyError(err));
    } else {
      yield put(
        phoneNumberVerifyError(unknownError("An unknown error occurred")),
      );
    }
  }
}

function* reSendPhoneNumber({
  payload: params,
}: SagaAction<ReSendPhoneNumber>) {
  try {
    const res = yield call(Api.reSendPhoneNumberOtp, params);
    if (res.error) {
      yield put(reSendPhoneNumberError(res.error));
    } else {
      yield put(reSendPhoneNumberSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(reSendPhoneNumberError(err));
    } else {
      yield put(
        reSendPhoneNumberError(unknownError("An unknown error occurred")),
      );
    }
  }
}
// Email Verification API's calling
function* email({ payload: params }: SagaAction<EmailParams>) {
  try {
    const res = yield call(Api.email, params);
    if (res.error) {
      yield put(emailError(res.error));
    } else {
      yield put(emailSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(emailError(err));
    } else {
      yield put(emailError(unknownError("An unknown error occurred")));
    }
  }
}

function* emailVerify({ payload: params }: SagaAction<EmailVerifyParams>) {
  try {
    const res = yield call(Api.emailVerify, params);
    if (res.error) {
      yield put(emailVerifyError(res.error));
    } else {
      yield put(emailVerifySuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(emailVerifyError(err));
    } else {
      yield put(emailVerifyError(unknownError("An unknown error occurred")));
    }
  }
}

function* reSendEmail({
  payload: params,
}: SagaAction<ReSendEmailParams>) {
  try {
    const res = yield call(Api.reSendEmail, params);
    if (res.error) {
      yield put(ReSendEmailError(res.error));
    } else {
      yield put(ReSendEmailSuccess(res.data.message));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(ReSendEmailError(err));
    } else {
      yield put(
        ReSendEmailError(unknownError("An unknown error occurred")),
      );
    }
  }
}

function* referral({
  payload: params,
}: SagaAction<{code:string}>) {
  try {
    const res = yield call(Api.referralCode, params);
    if (res.error) {
      yield put(referralCodeFailure(res.error));
    } else {
      yield put(referralCodeSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(referralCodeFailure(err));
    } else {
      yield put(
        referralCodeFailure(unknownError("An unknown error occurred")),
      );
    }
  }
}

function* signUp({
  payload: params,
}: SagaAction<SignUpParams>) {
  try {
    const res = yield call(Api.signUp, params);
    if (res.error) {
      yield put(signUpError(res.error));
    } else {
      yield put(SignUpSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(signUpError(err));
    } else {
      yield put(
        signUpError(unknownError("An unknown error occurred")),
      );
    }
  }
}

function* logout({
  payload: params,
}: SagaAction<LogoutParams>) {
  try {
    const res = yield call(Api.logout,params);
    if (res.error) {
      yield put(logoutError(res.error));
    } else {
      yield put(logoutSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(logoutError(err));
    } else {
      yield put(logoutError(unknownError("An unknown error occurred")));
    }
  }
}

function* watchFetchRequest() {
  yield takeLatest(AuthActionTypes.PHONE_NUMBER_REQUEST, phoneNumber);
  yield takeLatest(
    AuthActionTypes.PHONE_NUMBER_VERIFY_REQUEST,
    phoneNumberVerify,
  );
  yield takeLatest(
    AuthActionTypes.RESEND_PHONE_NUMBER_REQUEST,
    reSendPhoneNumber,
  );
  yield takeLatest(AuthActionTypes.EMAIL_REQUEST, email);
  yield takeLatest(AuthActionTypes.EMAIL_VERIFY_REQUEST, emailVerify);
  yield takeLatest(AuthActionTypes.RESEND_EMAIL_VERIFY_REQUEST,reSendEmail);
  yield takeLatest(AuthActionTypes.REFERRAL_CODE_REQUEST,referral)
  yield takeLatest(AuthActionTypes.SIGNUP_REQUEST,signUp);
  yield takeLatest(AuthActionTypes.LOGOUT_REQUEST,logout)
}

export function* authSaga() {
  yield all([fork(watchFetchRequest)]);
}
