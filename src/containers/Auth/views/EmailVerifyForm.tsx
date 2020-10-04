import { Button, Input, message } from "antd";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import {
  EmailResponse,
  EmailVerifyResponse,
  ReSendEmailResponse,
  EmailParams,
  EmailVerifyParams,
  ReSendEmailParams,
  PhoneNumberResponse,
} from "../types";

interface Props {
  emailLoading: {
    email: boolean;
    emailVerify: boolean;
    reSendEmail: boolean;
  };
  phoneNumber: PhoneNumberResponse;
  email: EmailResponse;
  emailVerify: EmailVerifyResponse;
  reSendEmail: ReSendEmailResponse;
  onEmail: (params: EmailParams) => void;
  onEmailVerify: (params: EmailVerifyParams) => void;
  onReSendEmail: (params: ReSendEmailParams) => void;
}

const EmailVerifyForm: FC<Props> = (props: Props) => {
  const { emailLoading, phoneNumber, email, emailVerify, reSendEmail } = props;
  const [otpToggle, setOtpToggle] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const sendOtp = (values: { email: string; phone: string; otp: string }) => {
    setOtpToggle(false);
    props.onEmail({
      email: values.email,
      token: phoneNumber.results.token,
      phoneNumber: values.phone,
    });
  };
  const validEmail = (email: String) => {
    if (email.length < 0) {
      setIsPhoneValid(false);
    } else if (email.length > 3 && email.includes("@")) {
      setIsPhoneValid(true);
    }
  };
  const reSendOtp = (values: { email: string; otp: string }) => {
    props.onReSendEmail({
      email: values.email,
      token: phoneNumber.results.token,
    });
  };

  useEffect(() => {
    if (emailLoading.email&&email!==null) {
      message.success(email.message);
    }
    if (
      emailLoading.emailVerify && emailVerify!==null
    ) {
      message.success(emailVerify.message);
    }
    if (
      emailLoading.reSendEmail && reSendEmail!==null
    ) {
      message.success(reSendEmail.message);
    }
  }, [
    email,
    emailVerify,
    reSendEmail,
    emailLoading.email,
    emailLoading.emailVerify,
    emailLoading.reSendEmail,
  ]);

  return (
    <Container>
      <div className="title-text">
        <SmallText></SmallText>
        <Welcome>Welcome back. Please login/signUp to your account</Welcome>
      </div>
      <Formik
        initialValues={{
          email: "",
          phone: "",
          otp: "",
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .required("Email Required.")
            .email("Invalid Email"),
          phone: yup.string().required("Phone Required"),
          otp: yup.string().required("Otp is Required."),
        })}
        onSubmit={values =>
          props.onEmailVerify({
            email: values.email,
            token: `${phoneNumber.results.token}`,
            verificationToken: values.otp,
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
              <div className="error-text">
                {isPhoneValid ? "" : "Email Required"}
              </div>
              {otpToggle ? (
                <span
                  style={{
                    color: "#0aafff",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={
                    values.email.length > 3 && values.email.includes("@")
                      ? () => sendOtp(values)
                      : () => validEmail(values.email)
                  }
                >
                  Send OTP
                </span>
              ) : (
                <span
                  style={{
                    color: "#0aafff",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={
                    values.email.length > 3 && values.email.includes("@")
                      ? () => reSendOtp(values)
                      : () => validEmail(values.email)
                  }
                >
                  ReSend OTP
                </span>
              )}
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <StyledInput
                id="otp"
                name="otp"
                value={values.otp}
                placeholder="Otp"
                type="text"
                onChange={handleChange("otp")}
                onBlur={() => setFieldTouched("otp")}
              />
              {touched.otp && errors.otp && (
                <div className="error-text">{errors.otp}</div>
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
                loading={emailLoading.emailVerify}
                htmlType="submit"
                type="primary"
                className="login-form-button"
              >
                Verify Email
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

export default EmailVerifyForm;
