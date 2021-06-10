/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import { State as GlobalState } from '../../../types/ReduxState';
import { APIError } from '../../../types/ReduxState';
import { logIn, LogIn, loginReset, LoginReset } from './store/login.actions';
import { getError, getIsFetching, getEmailHasNotBeenVerified } from './store/login.selectors';
import { LoginRequestResource as LoginFormData } from './store/login.types';
import LoginForm from './LoginForm';
import FeatherModal from '../../../ui/modals/FeatherModal';
import AuthPageHeader from '../AuthPageHeader';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import Analytics from '../../../analytics/analytics';
import AlternateLayout from '../../../app/AlternateLayout';
import PAGES from '../../../analytics/pages';
import Header1 from '../../../ui/headers/Header1';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';

interface Props extends RouteComponentProps {
  logIn: LogIn;
  loginReset: LoginReset;
  authError: APIError | null;
  emailHasNotBeenVerified: boolean;
  isMobileBreakpoint: boolean;
  isFetching: boolean;
}

interface State {
  showForgotPasswordModal: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showForgotPasswordModal: false
    };
  }

  componentDidMount() {
    Analytics.trackPage(PAGES.LOGIN);
  }

  componentWillUnmount() {
    this.props.loginReset();
  }

  handleUserSignIn = (values: LoginFormData) => {
    this.props.logIn({ email: values.email, password: values.password });
  };

  toggleForgotPasswordModal = () => {
    this.setState((prevState) => ({ showForgotPasswordModal: !prevState.showForgotPasswordModal }));
  };

  determineHeaderText = () => {
    const values = queryString.parse(this.props.location.search);
    if (values.email && values.message === 'Your email was verified. You can continue using the application.') {
      return 'Email verified! Please login';
    } else {
      return 'Log in to Feather';
    }
  };

  determineEmailInitialValue = () => {
    const values = queryString.parse(this.props.location.search);
    const emailInitialValue = values.email || '';
    return emailInitialValue as string;
  };

  render() {
    const { authError, isMobileBreakpoint, isFetching } = this.props;
    const { showForgotPasswordModal } = this.state;

    return (
      <AlternateLayout>
        <AuthPageHeader headerText={this.determineHeaderText()} isMobileBreakpoint={isMobileBreakpoint} />
        <LoginForm
          onSubmit={this.handleUserSignIn}
          loginError={authError}
          toggleForgotPasswordModal={this.toggleForgotPasswordModal}
          isFetching={isFetching}
          initialValues={{ email: this.determineEmailInitialValue() }}
        />
        <FeatherModal isOpen={showForgotPasswordModal} onClose={this.toggleForgotPasswordModal}>
          <React.Fragment>
            <div
              css={css`
                max-width: 325px;
                margin-bottom: 50px;
              `}
            >
              <Header1>Need help signing in?</Header1>
            </div>
            <Button to="/forgot-password">Reset your password</Button>
            <div
              css={css`
                position: relative;
                padding-bottom: 4px;
                margin-top: 55px;
              `}
            >
              <Button
                style={ButtonStyle.TEXT}
                mailto="hello@livefeather.com?subject=Customer%20Accounts%20|%20Login%20Issue"
              >
                Contact your account manager
              </Button>
            </div>
          </React.Fragment>
        </FeatherModal>
      </AlternateLayout>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  authError: getError(state),
  emailHasNotBeenVerified: getEmailHasNotBeenVerified(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  logIn,
  loginReset
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Login);
