import { PhoneNumberVerify } from './../containers/Auth/types';
import config from "../config/app";
import requestConfig from "../config/request";
import { PhoneNumber } from "../containers/Auth/types";
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

  export const phoneNumber =  (params:PhoneNumber)=>{
    const url =`${API_ENDPOINT}/users/phone`;
    return API.post(url,params,config)
  }

  export const phoneNumberVerify =(params:PhoneNumberVerify) =>{
    const url =`${API_ENDPOINT}/users/phone/verify`;
    return API.post(url,params,config)
  }

  export const logout = () => {
    const url = `${API_ENDPOINT}/logout`;
    return API.get(url);
  };

  /*testing-500-error*/
  // export const test = () => {
  //   const url =`${API_ENDPOINT}`;
  //   return API.get(url)
  // }
