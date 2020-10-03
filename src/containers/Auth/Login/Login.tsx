import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import {
  phoneNumberRequest,
  phoneNumberVerifyRequest,
  reSendPhoneNumberRequest,
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
} from "../types";
import EmailVerifyForm from "../views/EmailVerifyForm";

interface PropsFromState {
  loading: boolean;
  phoneNumber: PhoneNumberResponse;
  phoneNumberVerify: PhoneNumberVerifyResponse;
  reSendPhoneNumber: PhoneNumberResponse;
  errors: {};
}

interface PropsDispatchFromState {
  onPhoneNumber: typeof phoneNumberRequest;
  onPhoneNumberVerify: typeof phoneNumberVerifyRequest;
  onReSendPhoneNumberOTP: typeof reSendPhoneNumberRequest;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {}

class Login extends Component<AllProps, State> {
  state: State = {};

  componentDidMount() {}

  render() {
    const { loading } = this.props;
    return (
      <Container>
        <FirstHalf>
          {/* <PhoneNumberFrom
            loading={loading}
            onPhoneNumber={this.props.onPhoneNumber}
            onPhoneNumberVerify={this.props.onPhoneNumberVerify}
            onReSendPhoneNumberOTP={this.props.onReSendPhoneNumberOTP}
            phoneNumber={this.props.phoneNumber}
            phoneNumberVerify={this.props.phoneNumberVerify}
            reSendPhoneNumber={this.props.reSendPhoneNumber}
          /> */}
          <EmailVerifyForm loading={loading}/>
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
  phoneNumber: auth.phoneNumber !== null && auth.phoneNumber,
  phoneNumberVerify: auth.phoneNumberVerify,
  reSendPhoneNumber: auth.reSendPhoneNumber,
  errors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onPhoneNumber: (params: PhoneNumber) => dispatch(phoneNumberRequest(params)),
  onPhoneNumberVerify: (params: PhoneNumberVerify) =>
    dispatch(phoneNumberVerifyRequest(params)),
  onReSendPhoneNumberOTP: (params: ReSendPhoneNumber) =>
    dispatch(reSendPhoneNumberRequest(params)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Login);
