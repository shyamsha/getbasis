import { push } from "connected-react-router";
import React, { Component, Dispatch, Fragment } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  PhoneNumberResponse,
  PhoneNumberVerifyResponse,
  EmailResponse,
  EmailVerifyResponse,
  ReSendEmailResponse,
  SignUpResponse,
} from "../../Auth/types";
import { Card, Avatar, Modal, Button, Input } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import { userRequest } from "./action";
import { UserEditResponse, UserParams } from "./types";

const { Meta } = Card;
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
  user: UserEditResponse;
  errors: {};
}

interface PropsDispatchFromState {
  onNavigateToRoute: typeof push;
  onUserEdit: typeof userRequest;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {
  isVisible: boolean;
}
class Dashboard extends Component<AllProps, State> {
  state: State = {
    isVisible: false,
  };

  userEdit = () => {
    this.setState({ isVisible: true });
  };

  render() {
    const userName: PhoneNumberVerifyResponse = JSON.parse(
      localStorage.getItem("user") as string,
    );

    const user =
      this.props.phoneNumberVerify !== null &&
      this.props.phoneNumberVerify.results !== undefined;
    const firstName = user
      ? this.props.phoneNumberVerify.results.user?.firstName
      : null;
    const lastName = user
      ? this.props.phoneNumberVerify.results.user?.lastName
      : null;
    const name = `${firstName} ${lastName}`;
    const email = user
      ? this.props.phoneNumberVerify.results.user?.email
      : null;
    return (
      <Fragment>
        <div style={{ padding: "2rem" }}>
          <Card
            style={{ width: 300 }}
            actions={[<EditOutlined key="edit" onClick={this.userEdit} />]}
          >
            <Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={name}
              description={email}
            />
          </Card>
        </div>
        {this.state.isVisible ? (
          <Modal
            title="Profile"
            visible={this.state.isVisible}
            closeIcon={null}
            onCancel={()=>this.setState({isVisible:false})}
            footer={null}
          >
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
              }}
              validationSchema={yup.object().shape({
                firstName: yup.string().required("First Name Required."),
                lastName: yup.string().required("Last Name Required."),
              })}
              onSubmit={values =>{
                this.props.onUserEdit({
                  user_id: userName.results.user?._id as any,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  avatar: null,
                })
                this.setState({isVisible:false})
              }
              }
            >
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
                setFieldValue,
              }) => (
                <FormContainer onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <StyledInput
                      type="text"
                      id="firstName "
                      name="firstName "
                      placeholder="Enter firstName "
                      value={values.firstName}
                      onChange={handleChange("firstName")}
                      onBlur={() => setFieldTouched("firstName")}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="error-text">{errors.firstName}</div>
                    )}
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <StyledInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter lastName"
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                      onBlur={() => setFieldTouched("lastName")}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="error-text">{errors.lastName}</div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <LoginButton
                      loading={false}
                      htmlType="submit"
                      type="primary"
                      className="login-form-button"
                    >
                      Edit
                    </LoginButton>
                  </div>
                </FormContainer>
              )}
            </Formik>
          </Modal>
        ) : null}
      </Fragment>
    );
  }
}

const FormContainer = styled.form`
  padding-top: 3rem;
  padding-bottom: 3.188em;
  .error-text {
    color: #fe5331;
    font-family: "OpenSans-Regular";
    font-size: 0.875rem;
    font-weight: 400;
    position: absolute;
    padding-top: 0.2rem;
    padding-left: 0.5rem;
  }
`;

const StyledInput = styled(Input)`
  height: 3.5rem;
  border-radius: 0.25rem;
  border: 0.063rem solid #ecedf2;
  background-color: #ffffff;
  color: #848ca3;
  font-family: "OpenSans-Regular";
  font-size: 0.875rem;
  .ant-input:not(:first-child) {
    padding-left: 2.625rem;
    font-family: "Open Sans";
    font-size: 0.875rem;
    color: #848ca3;
  }
`;

const LoginButton = styled(Button)`
  height: 3rem;
  width: 100%;
  border-radius: 0.25rem;
  background-color: #0aafff;
  border-color: unset;
  box-shadow: none;
  i {
    color: #ffffff;
    font-size: 1rem;
  }
  span {
    color: #ffffff;
    font-family: "OpenSans-Regular";
    font-size: 0.875rem;
    font-weight: 600;
  }
  &:hover,
  &:focus {
    border-color: unset;
  }
`;

const mapStateToProps: any = ({ auth, user }: ApplicationState) => ({
  loading: user.loading,
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
  user: user.user,
  errors: auth.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onNavigateToRoute: (route: string, state?: any) =>
    dispatch(push(route, state)),
  onUserEdit: (params: UserParams) => dispatch(userRequest(params)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Dashboard);
