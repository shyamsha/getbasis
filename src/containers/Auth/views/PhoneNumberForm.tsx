import { Button, Input } from "antd";
import { Formik } from "formik";
import React, { FC } from "react";
import styled from "styled-components";
import * as yup from "yup";

interface Props {
  loading: boolean;
}

const PhoneNumberForm: FC<Props> = (props: Props) => {
  const { loading } = props;

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
          phone: yup.string().required("Phone is Required."),
          otp: yup.string().required("Otp is Required."),
        })}
        onSubmit={values => {}}
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
  align-items:stretch;
  width: 100%;
  height:100%;
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
