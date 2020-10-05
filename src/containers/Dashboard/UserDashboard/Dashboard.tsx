import { push } from "connected-react-router";
import React, { Component, Dispatch, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { PhoneNumberResponse, PhoneNumberVerifyResponse, EmailResponse, EmailVerifyResponse, ReSendEmailResponse, SignUpResponse } from "../../Auth/types";

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
  onNavigateToRoute:typeof push;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {}
class Dashboard extends Component<AllProps,State> {
  render() {
    return (
      <Fragment>
        <div>Dashboard</div>
      </Fragment>
    );
  }
}

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
  onNavigateToRoute: (route: string, state?: any) =>
  dispatch(push(route, state)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Dashboard);
