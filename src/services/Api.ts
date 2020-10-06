import { UserParams } from "./../containers/Dashboard/UserDashboard/types";
import {
  EmailParams,
  PhoneNumber,
  PhoneNumberVerify,
  ReSendPhoneNumber,
  EmailVerifyParams,
  ReSendEmailParams,
  SignUpParams,
  LogoutParams,
  PhoneNumberVerifyResponse,
} from "./../containers/Auth/types";
import config from "../config/app";
import requestConfig from "../config/request";
import * as API from "../utils/api-helper";

const isProd: boolean = config.isProd;

const API_ENDPOINT = isProd
  ? config.production.api_endpoint
  : config.staging.api_endpoint;

export const login = (params: {}) => {
  const url = `${API_ENDPOINT}/login`;
  const config = { ...requestConfig };
  return API.post(url, params, config);
};

export const phoneNumber = (params: PhoneNumber) => {
  const url = `${API_ENDPOINT}/users/phone`;
  return API.post(url, params, config);
};

export const phoneNumberVerify = (params: PhoneNumberVerify) => {
  const url = `${API_ENDPOINT}/users/phone/verify`;
  return API.post(url, params, config);
};

export const reSendPhoneNumberOtp = (params: ReSendPhoneNumber) => {
  const url = `${API_ENDPOINT}/users/otp/resend`;
  return API.put(url, params, config);
};

export const email = (params: EmailParams) => {
  const url = `${API_ENDPOINT}/users/email`;
  return API.post(url, params, config);
};

export const emailVerify = (params: EmailVerifyParams) => {
  const url = `${API_ENDPOINT}/users/email/verify`;
  return API.post(url, params, config);
};

export const reSendEmail = (params: ReSendEmailParams) => {
  const url = `${API_ENDPOINT}/users/token/resendtoken`;
  return API.put(url, params, {});
};

export const referralCode = (params: { code: string }) => {
  const url = `${API_ENDPOINT}/users/referral/${params.code}`;
  return API.put(url, {}, {});
};

export const signUp = (params: SignUpParams) => {
  const url = `${API_ENDPOINT}/users`;
  return API.post(url, params, config);
};

export const userProfile = (params: UserParams) => {
  const url = `${API_ENDPOINT}/users/${params.user_id}`;
  const config = { ...requestConfig };
  const user: PhoneNumberVerifyResponse = JSON.parse(
    localStorage.getItem("user") as string,
  );
  config.headers = {
    "auth-header": `Bearer ${user.results.user?._id},${user.results.user?.token}`,
  };
  return API.put(
    url,
    {
      firstName: params.firstName,
      lastName: params.lastName,
      avatar: params.avatar,
    },
    config,
  );
};

export const logout = (params: LogoutParams) => {
  const url = `${API_ENDPOINT}/users/logout/${params.user_id}`;
  const config = { ...requestConfig };
  const user: PhoneNumberVerifyResponse = JSON.parse(
    localStorage.getItem("user") as string,
  );
  config.headers = {
    "auth-header": `Bearer ${user.results.user?._id},${user.results.user?.token}`,
  };
  return API.deleteResource(url, config);
};
