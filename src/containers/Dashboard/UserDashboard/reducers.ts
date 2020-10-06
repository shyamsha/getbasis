
import { Reducer } from "redux";
import { UserActionTypes, UserState } from "./types";

const initialState: UserState = {
  loading: false,
  user: null,
    errors: {
    user: undefined,
  }
};

type A<T = string, U = any> = { type: T; payload: U };

const reducer: Reducer<UserState, A> = (
  state: UserState = initialState,
  action: A,
) => {
  switch (action.type) {
    case UserActionTypes.USER_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, user: undefined },
      };
    case UserActionTypes.USER_EDIT_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UserActionTypes.USER_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, user: action.payload },
      };


    default:
      return state;
  }
};

export { initialState as userInitialState, reducer as userReducer };
