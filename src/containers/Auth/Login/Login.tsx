import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import {
  emailRequest,
  emailVerifyRequest,
  phoneNumberRequest,
  phoneNumberVerifyRequest,
  referralCodeRequest,
  reSendEmailRequest,
  reSendPhoneNumberRequest,
  signUpRequest,
} from "../actions";
import { ApplicationState } from "../../../store";
import styled from "styled-components";
import PhoneNumberFrom from "../views/PhoneNumberForm";
import {
  PhoneNumberResponse,
  PhoneNumberVerifyResponse,
  PhoneNumber,
  ReSendPhoneNumber,
  PhoneNumberVerify,
  EmailVerifyResponse,
  EmailResponse,
  ReSendEmailResponse,
  EmailParams,
  EmailVerifyParams,
  ReSendEmailParams,
  SignUpResponse,
  SignUpParams,
} from "../types";
import EmailVerifyForm from "../views/EmailVerifyForm";
import SignUpForm from "../views/SignUpForm";
import { push } from "connected-react-router";

interface PropsFromState {
  loading: boolean;
  phoneNumber: PhoneNumberResponse;
  phoneNumberVerify: PhoneNumberVerifyResponse;
  reSendPhoneNumber: PhoneNumberResponse;
  emailLoading: {
    email: boolean;
    emailVerify: boolean;
    reSendEmail: boolean;
  };
  email: EmailResponse;
  emailVerify: EmailVerifyResponse;
  reSendEmail: ReSendEmailResponse;
  signUpLoading: boolean;
  signUp: SignUpResponse;
  referral: string;
  phoneSuccess: boolean;
  emailSuccess: boolean;
  errors: {};
}

interface PropsDispatchFromState {
  onPhoneNumber: typeof phoneNumberRequest;
  onPhoneNumberVerify: typeof phoneNumberVerifyRequest;
  onReSendPhoneNumberOTP: typeof reSendPhoneNumberRequest;
  onEmail: typeof emailRequest;
  onEmailVerify: typeof emailVerifyRequest;
  onReSendEmail: typeof reSendEmailRequest;
  onReferralCode: typeof referralCodeRequest;
  onSignUp: typeof signUpRequest;
  onNavigateToRoute:typeof push;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {}

class Login extends Component<AllProps, State> {
  state: State = {};

  componentDidMount() {}

  render() {
    const {
      loading,
      emailLoading,
      phoneNumber,
      phoneSuccess,
      emailSuccess,
      phoneNumberVerify
    } = this.props;
    return (
      <Container>
        <FirstHalf>
          {(phoneNumber !== null &&
          phoneNumber.results !== undefined &&
          phoneNumber.results.isLogin !== undefined &&
          !phoneNumber.results.isLogin &&
          phoneSuccess && !emailSuccess) ? (
            <EmailVerifyForm
              emailLoading={emailLoading}
              phoneNumber={phoneNumber}
              onEmail={this.props.onEmail}
              onEmailVerify={this.props.onEmailVerify}
              onReSendEmail={this.props.onReSendEmail}
              email={this.props.email}
              emailVerify={this.props.emailVerify}
              reSendEmail={this.props.reSendEmail}
              phoneSuccess={this.props.phoneSuccess}
              emailSuccess={this.props.emailSuccess}
            />
          ) : (phoneSuccess !== undefined &&
            phoneSuccess) &&
            (emailSuccess !== undefined &&
            emailSuccess)? (
            <SignUpForm
              signUpLoading={this.props.signUpLoading}
              phoneNumber={phoneNumber}
              signUp={this.props.signUp}
              referral={this.props.referral}
              onSignUp={this.props.onSignUp}
              onReferralCode={this.props.onReferralCode}
            />
          ) : (
             <PhoneNumberFrom
              loading={loading}
              onPhoneNumber={this.props.onPhoneNumber}
              onPhoneNumberVerify={this.props.onPhoneNumberVerify}
              onReSendPhoneNumberOTP={this.props.onReSendPhoneNumberOTP}
              phoneNumber={phoneNumber}
              phoneNumberVerify={phoneNumberVerify}
              reSendPhoneNumber={this.props.reSendPhoneNumber}
              onNavigateToRoute={this.props.onNavigateToRoute}
            />
          )}
        </FirstHalf>
        <SecondHalf>
          <Text>Best User Profile</Text>
        </SecondHalf>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
`;
const FirstHalf = styled.div`
  flex: 1 1 0;
  background-color: #ffffff;
`;

const SecondHalf = styled.div`
  flex: 1 1 0;
  display: flex;
  background-color: #0a121c;
`;

const Text = styled.div`
  color: rgb(255, 255, 255);
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const mapStateToProps: any = ({ auth }: ApplicationState) => ({
  loading: auth.loading,
  phoneNumber: auth.phoneNumber,
  phoneNumberVerify: auth.phoneNumberVerify,
  reSendPhoneNumber: auth.reSendPhoneNumber,
  emailLoading: auth.emailLoading,
  email: auth.email,
  emailVerify: auth.emailVerify,
  reSendEmail: auth.reSendEmail,
  signULoading: auth.signUpLoading,
  signUp: auth.signUp,
  referral: auth.referralCode,
  phoneSuccess: auth.phoneSuccess,
  emailSuccess: auth.emailSuccess,
  errors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onPhoneNumber: (params: PhoneNumber) => dispatch(phoneNumberRequest(params)),
  onPhoneNumberVerify: (params: PhoneNumberVerify) =>
    dispatch(phoneNumberVerifyRequest(params)),
  onReSendPhoneNumberOTP: (params: ReSendPhoneNumber) =>
    dispatch(reSendPhoneNumberRequest(params)),
  onEmail: (params: EmailParams) => dispatch(emailRequest(params)),
  onEmailVerify: (params: EmailVerifyParams) =>
    dispatch(emailVerifyRequest(params)),
  onReSendEmail: (params: ReSendEmailParams) =>
    dispatch(reSendEmailRequest(params)),
  onReferralCode: (params: { code: string }) =>
    dispatch(referralCodeRequest(params)),
  onSignUp: (params: SignUpParams) => dispatch(signUpRequest(params)),
  onNavigateToRoute: (route: string, state?: any) =>
  dispatch(push(route, state)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Login);
