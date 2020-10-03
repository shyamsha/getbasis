import { AuthState, AuthActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: AuthState = {
  loading: false,
  phoneNumber: null,
  phoneNumberVerify: null,
  reSendPhoneNumber: null,
  email: null,
  emailVerify: null,
  reSendEmail: null,
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
      return {
        ...state,
        loading: false,
        phoneNumberVerify: action.payload.data,
      };
    case AuthActionTypes.PHONE_NUMBER_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, phoneVerify: action.payload },
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
        loading: true,
        errors: { ...state.errors, email: undefined },
      };
    case AuthActionTypes.EMAIL_SUCCESS:
      return { ...state, loading: false, email: action.payload };
    case AuthActionTypes.EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, email: action.payload },
      };

    case AuthActionTypes.EMAIL_VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, emailVerify: undefined },
      };
    case AuthActionTypes.EMAIL_VERIFY_SUCCESS:
      return { ...state, loading: false, emailVerify: action.payload };
    case AuthActionTypes.EMAIL_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
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

    case AuthActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, signUp: undefined },
      };
    case AuthActionTypes.SIGNUP_SUCCESS:
      return { ...state, loading: false, signUp: action.payload };
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, signUp: action.payload },
      };

    default:
      return state;
  }
};

export { initialState as authInitialState, reducer as authReducer };
