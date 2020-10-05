import { action } from "typesafe-actions";
import {
  AuthActionTypes,
  EmailParams,
  EmailResponse,
  EmailVerifyParams,
  EmailVerifyResponse,
  LogoutParams,
  PhoneNumber,
  PhoneNumberResponse,
  PhoneNumberVerify,
  PhoneNumberVerifyResponse,
  ReSendEmailParams,
  ReSendEmailResponse,
  ReSendPhoneNumber,
  SignUpParams,
  SignUpResponse,
} from "./types";

export const phoneNumberRequest = (params: PhoneNumber) =>
  action(AuthActionTypes.PHONE_NUMBER_REQUEST, params);
export const phoneNumberSuccess = (res: PhoneNumberResponse) =>
  action(AuthActionTypes.PHONE_NUMBER_SUCCESS, res);
export const phoneNumberError = (message: Error) =>
  action(AuthActionTypes.PHONE_NUMBER_FAILURE, message);

export const phoneNumberVerifyRequest = (params: PhoneNumberVerify) =>
  action(AuthActionTypes.PHONE_NUMBER_VERIFY_REQUEST, params);
export const phoneNumberVerifySuccess = (res: PhoneNumberVerifyResponse) =>
  action(AuthActionTypes.PHONE_NUMBER_VERIFY_SUCCESS, res);
export const phoneNumberVerifyError = (message: Error) =>
  action(AuthActionTypes.PHONE_NUMBER_VERIFY_FAILURE, message);

export const reSendPhoneNumberRequest = (params: ReSendPhoneNumber) =>
  action(AuthActionTypes.RESEND_PHONE_NUMBER_REQUEST, params);
export const reSendPhoneNumberSuccess = (res: PhoneNumberResponse) =>
  action(AuthActionTypes.RESEND_PHONE_NUMBER_SUCCESS, res);
export const reSendPhoneNumberError = (message: Error) =>
  action(AuthActionTypes.RESEND_PHONE_NUMBER_FAILURE, message);

export const emailRequest = (params: EmailParams) =>
  action(AuthActionTypes.EMAIL_REQUEST, params);
export const emailSuccess = (res: EmailResponse) =>
  action(AuthActionTypes.EMAIL_SUCCESS, res);
export const emailError = (message: Error) =>
  action(AuthActionTypes.EMAIL_FAILURE, message);

export const emailVerifyRequest = (params: EmailVerifyParams) =>
  action(AuthActionTypes.EMAIL_VERIFY_REQUEST, params);
export const emailVerifySuccess = (res: EmailVerifyResponse) =>
  action(AuthActionTypes.EMAIL_VERIFY_SUCCESS, res);
export const emailVerifyError = (message: Error) =>
  action(AuthActionTypes.EMAIL_VERIFY_FAILURE, message);

export const reSendEmailRequest = (params: ReSendEmailParams) =>
  action(AuthActionTypes.RESEND_EMAIL_VERIFY_REQUEST, params);
export const ReSendEmailSuccess = (res: ReSendEmailResponse) =>
  action(AuthActionTypes.RESEND_EMAIL_VERIFY_SUCCESS, res);
export const ReSendEmailError = (message: Error) =>
  action(AuthActionTypes.RESEND_EMAIL_VERIFY_FAILURE, message);

export const referralCodeRequest = (params:{code:string}) =>
  action(AuthActionTypes.REFERRAL_CODE_REQUEST,params);
export const referralCodeSuccess = (res: any) =>
  action(AuthActionTypes.REFERRAL_CODE_SUCCESS, res);
export const referralCodeFailure = (message: Error) =>
  action(AuthActionTypes.REFERRAL_CODE_FAILURE, message);

export const signUpRequest = (params: SignUpParams) =>
  action(AuthActionTypes.SIGNUP_REQUEST, params);
export const SignUpSuccess = (res: SignUpResponse) =>
  action(AuthActionTypes.SIGNUP_SUCCESS, res);
export const signUpError = (message: Error) =>
  action(AuthActionTypes.SIGNUP_FAILURE, message);

export const logoutRequest = (params: LogoutParams) =>
  action(AuthActionTypes.LOGOUT_REQUEST,params);
export const logoutSuccess = (res: any) =>
  action(AuthActionTypes.LOGOUT_SUCCESS, res);
export const logoutError = (message: Error) =>
  action(AuthActionTypes.LOGOUT_ERROR, message);
