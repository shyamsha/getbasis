import { AuthState, AuthActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: AuthState = {
  loading: false,
  phoneNumber: null,
  phoneNumberVerify: null,
  errors: { phone: undefined, phoneVerify: undefined },
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
      return { ...state, loading: false, phoneNumber: action.payload };
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
      return { ...state, loading: false, phoneNumberVerify: action.payload };
    case AuthActionTypes.PHONE_NUMBER_VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, phoneVerify: action.payload },
      };

    default:
      return state;
  }
};

export { initialState as authInitialState, reducer as authReducer };
