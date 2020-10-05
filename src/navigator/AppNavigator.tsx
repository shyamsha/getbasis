import React, { Fragment, Component, Dispatch, FC } from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import { RouteEnums } from "./RouteEnums";
import Login from "../containers/Auth/Login/Login";
import Dashboard from "../containers/Dashboard/UserDashboard/Dashboard";
import Header from "../components/Header/Header";
import { ApplicationState } from "../store";
import { logoutRequest } from "../containers/Auth/actions";
import {
  LogoutParams,
  PhoneNumberVerifyResponse,
} from "../containers/Auth/types";
import { push } from "connected-react-router";

interface PropsFromState {
  loading: boolean;
  userDetails: PhoneNumberVerifyResponse;
}

interface PropsDispatchFromState {
  onLogout: typeof logoutRequest;
  onNavigateToRoute: typeof push;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {
  hasError: boolean;
}

class AppNavigator extends Component<any, any> {
  state: State = {
    hasError: false,
  };

  Auth: FC = () => (
    <Fragment>
      <Switch>
        <Route path={`/${RouteEnums.LOGIN}`} component={Login} exact />
      </Switch>
    </Fragment>
  );

  App: FC = () => (
    <Fragment>
      <Header
        onLogout={this.props.onLogout}
        userDetails={this.props.userDetails}
        onNavigateToRoute={this.props.onNavigateToRoute}
      />
      <Switch>
        <Route path={`/${RouteEnums.DASHBOARD}`} component={Dashboard} exact />
      </Switch>
    </Fragment>
  );

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (user === null || user === "undefined") {
      this.props.onNavigateToRoute(`/${RouteEnums.LOGIN}`);
    }
    if (user) {
      this.props.onNavigateToRoute(`/${RouteEnums.DASHBOARD}`);
    }
  }

  componentDidUpdate(prevProps: AllProps) {
    const now = this.props;
    if (
      now.userDetails !== null &&
      now.userDetails.results !== null &&
      !now.userDetails.results.isLogin
    ) {
      this.props.onNavigateToRoute(`/${RouteEnums.LOGIN}`);
    }
    if (
      now.userDetails !== null &&
      now.userDetails.results !== null &&
      now.userDetails.results.isLogin
    ) {
      this.props.onNavigateToRoute(`/${RouteEnums.DASHBOARD}`);
    }
  }

  render() {
   const user= this.props.userDetails !== null &&
    this.props.userDetails.results !== null &&
    this.props.userDetails.results.isLogin
    return user ? <this.App /> : <this.Auth />;
  }
}

const mapStateToProps: any = ({ auth }: ApplicationState) => ({
  loading: auth.loading,
  userDetails: auth.phoneNumberVerify,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onLogout: (params: LogoutParams) => dispatch(logoutRequest(params)),
  onNavigateToRoute: (route: string, state?: any) =>
    dispatch(push(route, state)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(AppNavigator);
