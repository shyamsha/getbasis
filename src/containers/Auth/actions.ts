import { action } from "typesafe-actions";
import { AuthActionTypes, PhoneNumberResponse, PhoneNumberVerifyResponse } from "./types";

export const loginRequest = () =>
action(AuthActionTypes.LOGIN_REQUEST);
export const loginSuccess = (res: any) =>
action(AuthActionTypes.LOGIN_SUCCESS, res);
export const loginError = (message: Error) =>
action(AuthActionTypes.LOGIN_ERROR, message);

export const phoneNumberRequest = () =>
action(AuthActionTypes.PHONE_NUMBER_REQUEST)
export const phoneNumberSuccess = (res: PhoneNumberResponse) =>
action(AuthActionTypes.PHONE_NUMBER_SUCCESS, res);
export const phoneNumberError = (message: Error) =>
action(AuthActionTypes.LOGIN_ERROR, message);

export const phoneNumberVerifyRequest = () =>
action(AuthActionTypes.PHONE_NUMBER_VERIFY_REQUEST)
export const phoneNumberVerifySuccess = (res: PhoneNumberVerifyResponse) =>
action(AuthActionTypes.PHONE_NUMBER_VERIFY_SUCCESS, res);
export const phoneNumberVerifyError = (message: Error) =>
action(AuthActionTypes.PHONE_NUMBER_VERIFY_FAILURE, message);
