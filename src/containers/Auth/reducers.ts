import {
  AuthState,
  AuthActionTypes,
  SignUpResponse,
  PhoneNumberVerifyResponse,
} from "./types";
import { Reducer } from "redux";

const initialState: AuthState = {
  loading: false,
  phoneNumber: null,
  phoneNumberVerify: null,
  reSendPhoneNumber: null,
  phoneSuccess: false,
  emailLoading: {
    email: false,
    emailVerify: false,
    reSendEmail: false,
  },
  email: null,
  emailVerify: null,
  reSendEmail: null,
  emailSuccess: false,
  signUpLoading: false,
  referralCode: null,
  signUp: null,
  errors: {
    phone: undefined,
    phoneVerify: undefined,
    reSendPhone: undefined,
    email: undefined,
    emailVerify: undefined,
    reSendEmail: undefined,
    signUp: undefined,
  },
};

const userStatus = (state: AuthState, res: SignUpResponse) => {
  const user = res.results.user;
  localStorage.setItem("user", JSON.stringify(user));
  return { ...state, signUpLoading: false, signUp: res };
};

const userLogin = (state: AuthState, res: PhoneNumberVerifyResponse) => {
  if (res.results.isLogin) {
    const user = res.results.user;

    localStorage.setItem("user", JSON.stringify(user));
  }
  return {
    ...state,
    loading: false,
    phoneSuccess: true,
    phoneNumberVerify: res,
  };
};

type A<T = string, U = any> = { type: T; payload: U };

const reducer: Reducer<AuthState, A> = (
  state: AuthState = initialState,
  action: A,
) => {
  switch (action.type) {
    case AuthActionTypes.PHONE_NUMBER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, phone: undefined },
      };
    case AuthActionTypes.PHONE_NUMBER_SUCCESS:
      return { ...state, loading: false, phoneNumber: action.payload.data };
    case AuthActionTypes.PHONE_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, phone: action.payload },
      };

    case AuthActionTypes.PHONE_NUMBER_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, phoneVerify: undefined },
      };
    case AuthActionTypes.PHONE_NUMBER_VERIFY_SUCCESS:
      return userLogin(state, action.payload.data);
    case AuthActionTypes.PHONE_NUMBER_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          phoneSuccess: false,
          phoneVerify: action.payload,
        },
      };

    case AuthActionTypes.RESEND_PHONE_NUMBER_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, reSendPhone: undefined },
      };
    case AuthActionTypes.RESEND_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        reSendPhoneNumber: action.payload.data,
      };

    case AuthActionTypes.RESEND_PHONE_NUMBER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, reSendPhone: action.payload },
      };
    case AuthActionTypes.EMAIL_REQUEST:
      return {
        ...state,
        emailLoading: { ...state.emailLoading, email: true },
        errors: { ...state.errors, email: undefined },
      };
    case AuthActionTypes.EMAIL_SUCCESS:
      return {
        ...state,
        emailLoading: { ...state.emailLoading, email: false },
        email: action.payload,
      };
    case AuthActionTypes.EMAIL_FAILURE:
      return {
        ...state,
        emailLoading: { ...state.emailLoading, email: false },
        errors: { ...state.errors, email: action.payload },
      };

    case AuthActionTypes.EMAIL_VERIFY_REQUEST:
      return {
        ...state,
        emailLoading: { ...state.emailLoading, emailVerify: true },
        emailSuccess: false,
        errors: { ...state.errors, emailVerify: undefined },
      };
    case AuthActionTypes.EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        emailLoading: { ...state.emailLoading, emailVerify: false },
        emailSuccess: true,
        emailVerify: action.payload,
      };
    case AuthActionTypes.EMAIL_VERIFY_FAILURE:
      return {
        ...state,
        emailLoading: { ...state.emailLoading, emailVerify: false },
        emailSuccess: false,
        errors: { ...state.errors, emailVerify: action.payload },
      };

    case AuthActionTypes.RESEND_EMAIL_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, reSendEmail: undefined },
      };
    case AuthActionTypes.RESEND_EMAIL_VERIFY_SUCCESS:
      return { ...state, loading: false, reSendEmail: action.payload };
    case AuthActionTypes.RESEND_EMAIL_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, reSendEmail: action.payload },
      };

    case AuthActionTypes.REFERRAL_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, signUp: undefined },
      };
    case AuthActionTypes.REFERRAL_CODE_SUCCESS:
      return { ...state, loading: false, referralCode: action.payload };
    case AuthActionTypes.REFERRAL_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, signUp: action.payload },
      };

    case AuthActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        errors: { ...state.errors, signUp: undefined },
      };
    case AuthActionTypes.SIGNUP_SUCCESS:
      return userStatus(state, action.payload);
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, signUp: action.payload },
      };

    case AuthActionTypes.LOGOUT_REQUEST:
      return { ...state, loading: true, errors: { ...state.errors } };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        phoneNumber: null,
        phoneNumberVerify: null,
        reSendPhoneNumber: null,
        phoneSuccess: false,
        emailLoading: {
          email: false,
          emailVerify: false,
          reSendEmail: false,
        },
        email: null,
        emailVerify: null,
        reSendEmail: null,
        emailSuccess: false,
        signUpLoading: false,
        referralCode: null,
        signUp: null,
        errors: {
          ...state.errors,
          phone: undefined,
          phoneVerify: undefined,
          reSendPhone: undefined,
          email: undefined,
          emailVerify: undefined,
          reSendEmail: undefined,
          signUp: undefined,
        },
      };
    case AuthActionTypes.LOGOUT_ERROR:
      return { ...state, loading: false, errors: { ...state.errors } };

    default:
      return state;
  }
};

export { initialState as authInitialState, reducer as authReducer };
