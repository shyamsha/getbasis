export interface LoginFormParams {
  username: string;
  password: string;
}

export interface PhoneNumber {
  phoneNumber: string;
}

export interface PhoneNumberVerify {
  phoneNumber: string;
  verificationCode: string;
  token: string;
}

export interface Version {
  minimum: number;
  current: number;
}

export interface Results {
  wrongOtpCount: number;
  resendOtpCount: number;
  token: number;
  isLogin: boolean;
}

export interface messageObj {}

export interface PhoneNumberResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: Results;
}

export interface PhoneNumberVerifyResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: Results;
}

export enum AuthActionTypes {
  LOGIN_REQUEST = "@@auth/login/LOGIN_REQUEST",
  LOGIN_SUCCESS = "@@auth/login/LOGIN_SUCCESS",
  LOGIN_ERROR = "@@auth/login/LOGIN_ERROR",

  PHONE_NUMBER_REQUEST = "@@auth/phone/PHONE_NUMBER_REQUEST",
  PHONE_NUMBER_SUCCESS = "@@auth/phone/PHONE_NUMBER_SUCCESS",
  PHONE_NUMBER_FAILURE = "@@auth/phone/PHONE_NUMBER_FAILURE",

  PHONE_NUMBER_VERIFY_REQUEST = "@@auth/phone/PHONE_NUMBER_VERIFY_REQUEST",
  PHONE_NUMBER_VERIFY_SUCCESS = "@@auth/phone/PHONE_NUMBER_VERIFY_SUCCESS",
  PHONE_NUMBER_VERIFY_FAILURE = "@@auth/phone/PHONE_NUMBER_VERIFY_FAILURE",

  LOGOUT_REQUEST = "@@auth/logout/LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "@@auth/logout/LOGOUT_SUCCESS",
  LOGOUT_ERROR = "@@auth/logout/LOGOUT_ERROR",
}

export interface AuthState {
  readonly loading: boolean;
  readonly phoneNumber: PhoneNumberResponse | null;
  readonly phoneNumberVerify: PhoneNumberVerifyResponse | null;
  readonly errors: { phone?: string , phoneVerify?:string };
}
