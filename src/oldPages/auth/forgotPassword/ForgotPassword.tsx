/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import { State as GlobalState } from '../../../types/ReduxState';
import { APIError } from '../../../types/ReduxState';
import { ActionCreator } from '../../../types/FluxStandardActions';
import {
  resetPasswordRequest as resetPasswordRequestAction,
  ResetPasswordRequest,
  resetResetPasswordSent
} from './store/forgot.password.actions';
import { getEmail, getError, getIsFetching, getHasSentResetPasswordLink } from './store/forgot.password.selectors';
import ForgotPasswordForm from './ForgotPasswordForm';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import AuthPageHeader from '../AuthPageHeader';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import AuthPageEmailSentMessage from '../AuthPageEmailSentMessage';
import AlternateLayout from '../../../app/AlternateLayout';
import Analytics from '../../../analytics/analytics';
import PAGES from '../../../analytics/pages';
import { ForgotPasswordFormData } from './store/forgot.password.types';

interface Props {
  error: APIError | null;
  resetPasswordRequest: ResetPasswordRequest;
  resetResetPasswordSent: ActionCreator;
  isFetching: boolean;
  isMobileBreakpoint: boolean;
  hasSentResetPasswordLink: boolean;
  email: string;
}

class ForgotPassword extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.FORGOT_PASSWORD);
  }

  componentWillUnmount() {
    this.props.resetResetPasswordSent();
  }

  resetPasswordRequest = (values: ForgotPasswordFormData) => {
    this.props.resetPasswordRequest(values);
  };

  render() {
    const { isMobileBreakpoint, isFetching, hasSentResetPasswordLink, email } = this.props;

    return (
      <AlternateLayout>
        <AuthPageHeader headerText="Help signing in" isMobileBreakpoint={isMobileBreakpoint} />
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 12px 24px 0;
          `}
        >
          <div
            css={css`
              max-width: 420px;
            `}
          >
            {hasSentResetPasswordLink ? (
              <AuthPageEmailSentMessage email={email} />
            ) : (
              <React.Fragment>
                <Paragraph2>
                  Enter the email address associated with your account. Remember your Feather account can only be linked
                  to the email you checked out with. We will send you an email with a link to verify your account and
                  reset your password.
                </Paragraph2>
                <ForgotPasswordForm
                  onSubmit={this.resetPasswordRequest}
                  isFetching={isFetching}
                  initialValues={{ email }}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </AlternateLayout>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  error: getError(state),
  isFetching: getIsFetching(state),
  hasSentResetPasswordLink: getHasSentResetPasswordLink(state),
  email: getEmail(state)
});

const mapDispatchToProps = {
  resetPasswordRequest: resetPasswordRequestAction,
  resetResetPasswordSent
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
