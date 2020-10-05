import React, { Fragment } from "react";
import styled from "styled-components";
import {
  LogoutParams,
  PhoneNumberVerifyResponse,
} from "../../containers/Auth/types";
import { Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { push } from "connected-react-router";

interface Props {
  onLogout: (params: LogoutParams) => void;
  userDetails: PhoneNumberVerifyResponse;
  onNavigateToRoute: typeof push;
}

export default function Header(props: Props) {

  const userLogout = () => {
    if (
      props.userDetails !== null &&
      props.userDetails.results.isLogin &&
      props.userDetails.results.user
    )
      props.onLogout({ user_id: props.userDetails.results.user._id });
      localStorage.removeItem("user");
      props.onNavigateToRoute("/login")
  };
  return (
    <Fragment>
      <HeaderBar>
        <Title>GetBasis</Title>
        <div>
          <Avatar icon={<UserOutlined />} />
          <LogoutOutlined
            style={{ color: "red", paddingLeft: "0.5rem" }}
            onClick={userLogout}
          />
        </div>
      </HeaderBar>
    </Fragment>
  );
}

const HeaderBar = styled.div`
  height: 4rem;
  background-color: #0a121c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Title = styled.div`
  font-family: "OpenSans-Regular";
  font-size: 0.75rem;
  line-height: 1.33;
  color: #ffffff;
  opacity: 0.8;
`;
