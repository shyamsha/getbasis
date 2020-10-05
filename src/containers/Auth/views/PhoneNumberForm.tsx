import { Button, Input, message } from "antd";
import { push } from "connected-react-router";
import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import enums from "../../../config/enums";
import { RouteEnums } from "../../../navigator/RouteEnums";
import {
  PhoneNumber,
  PhoneNumberResponse,
  PhoneNumberVerify,
  PhoneNumberVerifyResponse,
  ReSendPhoneNumber,
} from "../types";

interface Props {
  loading: boolean;
  onPhoneNumber: (params: PhoneNumber) => void;
  onPhoneNumberVerify: (params: PhoneNumberVerify) => void;
  onReSendPhoneNumberOTP: (params: ReSendPhoneNumber) => void;
  phoneNumber: PhoneNumberResponse;
  phoneNumberVerify: PhoneNumberVerifyResponse;
  reSendPhoneNumber: PhoneNumberResponse;
  onNavigateToRoute: typeof push;
}

const PhoneNumberForm: FC<Props> = (props: Props) => {
  const { loading, phoneNumber, phoneNumberVerify, reSendPhoneNumber } = props;
  const [otpToggle, setOtpToggle] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const sendOtp = (values: { phone: string; otp: string }) => {
    setOtpToggle(false);
    props.onPhoneNumber({ phoneNumber: values.phone });
  };
  const validPhone = (phone: String) => {
    if (phone.length !== 10) {
      setIsPhoneValid(false);
    } else if (phone.length === 10) {
      setIsPhoneValid(true);
    }
  };

  const reSendOtp = (values: { phone: string; otp: string }) => {
    props.onReSendPhoneNumberOTP({
      phoneNumber: values.phone,
      token: phoneNumber.results.token,
    });
  };
console.log(phoneNumberVerify)
console.log(phoneNumber)
  useEffect(() => {
    if (
      phoneNumberVerify !== null &&
      phoneNumberVerify.results !== undefined &&
      phoneNumberVerify.results.isLogin
    ) {
      props.onNavigateToRoute(`/${RouteEnums.DASHBOARD}`);
    }
    if (
      !loading &&
      phoneNumber !== null &&
      reSendPhoneNumber === null &&
      phoneNumberVerify === null &&
      phoneNumber.message === enums.OTPSent
    ) {
      message.success(phoneNumber.message);
    }
    if (
      !loading &&
      phoneNumberVerify !== null &&
      reSendPhoneNumber === null &&
      phoneNumberVerify.message === enums.OTPVerify
    ) {
      message.success(phoneNumberVerify.message);
    }
    if (
      !loading &&
      reSendPhoneNumber !== null &&
      reSendPhoneNumber.message === enums.OTPVerify
    ) {
      message.success(reSendPhoneNumber.message);
    }
  }, [loading, phoneNumber, phoneNumberVerify, props, reSendPhoneNumber]);

  return (
    <Container>
      <div className="title-text">
        <SmallText></SmallText>
        <Welcome>Welcome back. Please login/signUp to your account</Welcome>
      </div>
      <Formik
        initialValues={{
          phone: "",
          otp: "",
        }}
        validationSchema={yup.object().shape({
          phone: yup.string().required("Phone Number Required."),
          otp: yup.string().required("Otp Required."),
        })}
        onSubmit={values => {
          props.onPhoneNumberVerify({
            phoneNumber: values.phone,
            verificationCode: values.otp,
            token: phoneNumber.results.token,
          });
        }}
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
              <div className="error-text">
                {isPhoneValid ? "" : "Phone Number Required"}
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
                    values.phone.length === 10
                      ? () => sendOtp(values)
                      : () => validPhone(values.phone)
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
                    values.phone.length === 10
                      ? () => reSendOtp(values)
                      : () => validPhone(values.phone)
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
                loading={loading}
                htmlType="submit"
                type="primary"
                className="login-form-button"
              >
                Verify Phone Number
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

export default PhoneNumberForm;
