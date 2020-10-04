import { Button, Input } from "antd";
import { Formik } from "formik";
import React, { FC } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { PhoneNumberResponse, SignUpParams, SignUpResponse } from "../types";

interface Props {
  phoneNumber: PhoneNumberResponse;
  signUpLoading: boolean;
  signUp: SignUpResponse;
  referral: string;
  onReferralCode: (params: { code: string }) => void;
  onSignUp: (params: SignUpParams) => void;
}

const SignUpForm: FC<Props> = (props: Props) => {
  const { signUpLoading, phoneNumber } = props;

  return (
    <Container>
      <div className="title-text">
        <SmallText></SmallText>
        <Welcome>Please signUp to your account</Welcome>
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          referredCodeKey: "",
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().required("First Name Required."),
          lastName: yup.string().required("Last Name Required."),
          email: yup
            .string()
            .required("Email Required.")
            .email("Invalid Email"),
          phone: yup.string().required("Phone Number Required."),
          referredCodeKey: yup.string().required("referredCodeKey Required."),
        })}
        onSubmit={values =>
          props.onSignUp({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phone,
            referredCodeKey: values.referredCodeKey,
            token: phoneNumber.results.token,
            agreeToPrivacyPolicy: true,
            source: "WEB_APP",
          })
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
                onChange={handleChange("firstName ")}
                onBlur={() => setFieldTouched("firstName ")}
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
            <div style={{ marginBottom: "1.5rem" }}>
              <StyledInput
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
              />
              {touched.email && errors.email && (
                <div className="error-text">{errors.email}</div>
              )}
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <StyledInput
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={values.phone}
                onChange={handleChange("phone")}
                onBlur={() => setFieldTouched("phone")}
              />
              {touched.phone && errors.phone && (
                <div className="error-text">{errors.phone}</div>
              )}
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <StyledInput
                id="referredCodeKey"
                name="referredCodeKey"
                value={values.referredCodeKey}
                placeholder="referredCodeKey"
                type="text"
                onChange={e => {
                  setFieldValue("referredCodeKey", e.target.value);
                  if (e.target.value.length > 5) {
                    props.onReferralCode({ code: e.target.value });
                  }
                }}
                onBlur={() => setFieldTouched("referredCodeKey")}
              />
              {touched.referredCodeKey && errors.referredCodeKey && (
                <div className="error-text">{errors.referredCodeKey}</div>
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
                loading={signUpLoading}
                htmlType="submit"
                type="primary"
                className="login-form-button"
              >
                Sign Up
              </LoginButton>
            </div>
          </FormContainer>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;
  padding: 6.5rem;
  .title-text {
    color: #1c2d41;
    font-family: "OpenSans-Regular";
    font-size: 1.25rem;
  }
  .subtitle-text {
    color: #848ca3;
    font-family: "OpenSans-Regular";
    font-size: 0.875rem;
    font-weight: 400;
  }
  .error-text {
    color: #fe5331;
    font-family: "OpenSans-Regular";
    font-size: 0.875rem;
    font-weight: 400;
    position: absolute;
    padding-top: 0.2rem;
    padding-left: 0.5rem;
  }
  .forgot-password-button-text {
    color: #848ca3;
    font-family: "OpenSans-SemiBold";
    font-size: 0.75rem;
    font-weight: 600;
  }
`;

const FormContainer = styled.form`
  padding-top: 3rem;
  padding-bottom: 3.188em;
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

const SmallText = styled.span`
  color: #848ca3;
  font-family: "OpenSans-Light";
  font-size: 1rem;
  font-weight: 300;
  line-height: 3rem;
  padding-left: 0.5rem;
`;

const Welcome = styled.div`
  color: #848ca3;
  font-family: "OpenSans-Regular";
  font-size: 0.875rem;
`;

export default SignUpForm;
