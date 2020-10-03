export interface LogoutParams {
  user_id:string;
}

export interface PhoneNumber {
  phoneNumber: string;
}

export interface ReSendPhoneNumber {
  phoneNumber: string;
  token: number;
}

export interface PhoneNumberVerify {
  phoneNumber: string;
  verificationCode: string;
  token: number;
}

export interface EmailParams {
  email: string;
  token: number;
  phoneNumber: string;
}

export interface EmailVerifyParams {
  email: string;
  token: number;
  verificationToken: string;
}

export interface ReSendEmailParams {
  email:string;
  token:number;
}

export interface EmailResults {
  wrongEmailTokenCount: number;
  resendEmailTokenCount: number;
  token: string;
  isLogin?: boolean;
  id?: any;
  phoneNumber: string;
}

export interface EmailVerifyResults {
  wrongEmailTokenCount: number;
  resendEmailTokenCount: number;
  isLogin: boolean;
  id?: any;
}

export interface ReSendEmailResults {
  wrongEmailTokenCount: number;
  resendEmailTokenCount: number;
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

export interface Status {
  doesUserExists: boolean;
  isOnboardingFinished: boolean;
  isReadyForOnboarding: boolean;
  isBankAccountDataFinished: boolean;
  isNominationDataFinished: boolean;
  isFatcaDetailsFinished: boolean;
  isKycDetailsFinished: boolean;
  isAddressDetailsFinished: boolean;
  isKycCheckDetailsFinished: boolean;
  isPersonalDetailsFinished: boolean;
  isKycVerified: boolean;
  isDocumentsUploaded: boolean;
}

export interface KycDetails {
}

export interface Card {
  id: string;
  position: number;
  type: string;
}

export interface Lesson {
  active: boolean;
  _id: string;
  title: string;
  position: number;
  cards: Card[];
}

export interface Module {
  _id: string;
  title: string;
  position: number;
  rewards: number;
}

export interface NextLesson {
  lesson: Lesson;
  module: Module;
}

export interface Privacy {
  emailPrivacy: string;
  professionPrivacy: string;
  locationPrivacy: string;
}

export interface User {
  _id: string;
  avatar?: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  email: string;
  emailVerified: boolean;
  investmentSubscribed: boolean;
  rewards: number;
  nextGoal: number;
  referralToken: string;
  referralMessage: string;
  referralCount: number;
  badges: any[];
  token: string;
  onboardingStatus: string;
  status: Status;
  kycDetails: KycDetails;
  hasMadeInvestments: boolean;
  nextLesson: NextLesson;
  isMandateApproved: boolean;
  rewardKeys: string[];
  unsubscribe: any[];
  profession: string;
  expertise: string;
  privacy: Privacy;
}

export interface SignUpResults {
  user: User;
  logStatus?: any;
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referredCodeKey: string;
  agreeToPrivacyPolicy: boolean;
  token: string;
  source: string;
}

export interface SignUpResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: SignUpResults;
}
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

export interface EmailResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: EmailResults;
}

export interface EmailVerifyResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: EmailVerifyResults;
}

export interface ReSendEmailResponse {
  success: boolean;
  version: Version;
  statusCode: number;
  responseCode: string;
  message: string;
  messageObj?: messageObj;
  results: ReSendEmailResults;
}

export enum AuthActionTypes {

  PHONE_NUMBER_REQUEST = "@@auth/phone/PHONE_NUMBER_REQUEST",
  PHONE_NUMBER_SUCCESS = "@@auth/phone/PHONE_NUMBER_SUCCESS",
  PHONE_NUMBER_FAILURE = "@@auth/phone/PHONE_NUMBER_FAILURE",

  PHONE_NUMBER_VERIFY_REQUEST = "@@auth/phone/PHONE_NUMBER_VERIFY_REQUEST",
  PHONE_NUMBER_VERIFY_SUCCESS = "@@auth/phone/PHONE_NUMBER_VERIFY_SUCCESS",
  PHONE_NUMBER_VERIFY_FAILURE = "@@auth/phone/PHONE_NUMBER_VERIFY_FAILURE",

  RESEND_PHONE_NUMBER_REQUEST = "@@auth/phone/RESEND_PHONE_NUMBER_REQUEST",
  RESEND_PHONE_NUMBER_SUCCESS = "@@auth/phone/RESEND_PHONE_NUMBER_SUCCESS",
  RESEND_PHONE_NUMBER_FAILURE = "@@auth/phone/RESEND_PHONE_NUMBER_FAILURE",

  EMAIL_REQUEST = "@@auth/email/EMAIL_REQUEST",
  EMAIL_SUCCESS = "@@auth/email/EMAIL_SUCCESS",
  EMAIL_FAILURE = "@@auth/email/EMAIL_FAILURE",

  EMAIL_VERIFY_REQUEST = "@@auth/email/EMAIL_VERIFY_REQUEST",
  EMAIL_VERIFY_SUCCESS = "@@auth/email/EMAIL_VERIFY_SUCCESS",
  EMAIL_VERIFY_FAILURE = "@@auth/email/EMAIL_VERIFY_FAILURE",

  RESEND_EMAIL_VERIFY_REQUEST = "@@auth/email/RESEND_EMAIL_VERIFY_REQUEST",
  RESEND_EMAIL_VERIFY_SUCCESS = "@@auth/email/RESEND_EMAIL_VERIFY_SUCCESS",
  RESEND_EMAIL_VERIFY_FAILURE = "@@auth/email/RESEND_EMAIL_VERIFY_FAILURE",

  SIGNUP_REQUEST = "@@auth/signUp/SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "@@auth/signUp/SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "@@auth/signUp/SIGNUP_FAILURE",

  LOGOUT_REQUEST = "@@auth/logout/LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "@@auth/logout/LOGOUT_SUCCESS",
  LOGOUT_ERROR = "@@auth/logout/LOGOUT_ERROR",
}

export interface AuthState {
  readonly loading: boolean;
  readonly phoneNumber: PhoneNumberResponse | null;
  readonly phoneNumberVerify: PhoneNumberVerifyResponse | null;
  readonly reSendPhoneNumber: PhoneNumber | null;
  readonly email: EmailResponse | null;
  readonly emailVerify: EmailVerifyResponse | null;
  readonly reSendEmail: ReSendEmailResponse | null;
  readonly signUp: SignUpResponse | null;
  readonly errors: {
    phone?: string;
    phoneVerify?: string;
    reSendPhone?: string;
    email?:string;
    emailVerify?:string;
    reSendEmail?:string;
    signUp?:string;
  };
}
