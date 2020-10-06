export interface UserParams{
  user_id:string,
  firstName: string;
  lastName: string;
  avatar?: any;
}

export interface Version {
  minimum: number;
  current: number;
}

export interface messageObj {}


export interface UserEdit {
  _id: string;
  avatar?: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  phoneNumberVerified: boolean;
  emailVerified: boolean;
  referralToken: string;
  unsubscribe: any[];
}

export interface EditResults {
  user: UserEdit;
}

export interface UserEditResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: EditResults;
}

export enum UserActionTypes {

  USER_EDIT_REQUEST = "@@profile/user/USER_EDIT_REQUEST",
  USER_EDIT_SUCCESS = "@@profile/user/USER_EDIT_SUCCESS",
  USER_EDIT_ERROR = "@@profile/user/USER_EDIT_ERROR",
}

export interface UserState {
  readonly loading: boolean;
  readonly user: UserEditResponse | null;
  readonly errors: {
    user?: string;

  };
}
