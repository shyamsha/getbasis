import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { loginRequest } from "../actions";
import { ApplicationState } from "../../../store";
import styled from "styled-components";
import PhoneNumberFrom from "../views/PhoneNumberForm";
// import EmailVerifyForm from "../views/EmailverifyForm";

interface PropsFromState {
  loading: boolean;
  errors: {};
}

interface PropsDispatchFromState {
  onLogin: typeof loginRequest;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {}

class Login extends Component<AllProps, State> {
  state: State = {};

  componentDidMount() {
    this.props.onLogin();
  }

  render() {
    const { loading } = this.props;
    return (
      <Container>
        <FirstHalf>
          <PhoneNumberFrom loading={loading} />
          {/* <EmailVerifyForm loading={loading}/> */}
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
  errors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLogin: () => dispatch(loginRequest()),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Login);
