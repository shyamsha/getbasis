import { UserActionTypes, UserEditResponse, UserParams } from "./types";
import { action } from "typesafe-actions";

export const userRequest = (params: UserParams) =>
  action(UserActionTypes.USER_EDIT_REQUEST, params);
export const userSuccess = (res: UserEditResponse) =>
  action(UserActionTypes.USER_EDIT_SUCCESS, res);
export const userError = (message: Error) =>
  action(UserActionTypes.USER_EDIT_ERROR, message);
