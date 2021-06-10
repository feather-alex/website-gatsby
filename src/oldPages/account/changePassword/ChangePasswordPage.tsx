/** @jsx jsx */
import React from 'react';
import { connect } from 'react-redux';
import { css, jsx } from '@emotion/core';
import { State as GlobalState, APIError } from '../../../types/ReduxState';
import { changePasswordRequest, ChangePasswordRequest, resetIsPasswordUpdated } from './store/change.password.actions';
import { ActionCreator } from '../../../types/FluxStandardActions';
import { getError, getIsFetching, getIsPasswordUpdated } from './store/change.password.selectors';
import ChangePasswordForm from './ChangePasswordForm';
import { ChangePasswordData } from './store/change.password.types';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';
import { getEmail } from '../personalInformation/store/personal.information.selectors';
import Title1 from '../../../ui/titles/Title1';
import Header1 from '../../../ui/headers/Header1';
import Header3 from '../../../ui/headers/Header3';
import Button from '../../../ui/buttons/Button';
import Analytics from '../../../analytics/analytics';
import PAGES from '../../../analytics/pages';

interface Props {
  changePasswordRequest: ChangePasswordRequest;
  resetIsPasswordUpdated: ActionCreator;
  error: APIError | null;
  isFetching: boolean;
  isPasswordUpdated: boolean;
  isMobileBreakpoint: boolean;
  email: string;
}

class ChangePassword extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.ACCOUNT_CHANGE_PASSWORD);
  }

  componentWillUnmount() {
    this.props.resetIsPasswordUpdated();
  }

  changePasswordRequest = (values: ChangePasswordData) => {
    this.props.changePasswordRequest({
      email: this.props.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    });
  };

  render() {
    const { isFetching, error, isMobileBreakpoint, isPasswordUpdated } = this.props;

    return (
      <div>
        <div
          css={css`
            ${isMobileBreakpoint && isPasswordUpdated && 'display: none;'}
          `}
        >
          {!isMobileBreakpoint && <Header1>Change Password</Header1>}
          <div
            css={css`
              margin-top: ${isMobileBreakpoint ? '50px' : '20px'};
            `}
          >
            <Title1>Choose a new password</Title1>
          </div>
        </div>
        {isPasswordUpdated ? (
          <div
            css={css`
              ${isMobileBreakpoint ? `margin-top: 130px;` : `margin-top: 56px;`}
              ${isMobileBreakpoint && 'text-align: center; padding: 0 45px;'}
            `}
          >
            <Header3>Your password has been successfully changed!</Header3>
            {isMobileBreakpoint && (
              <div
                css={css`
                  margin-top: 45px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <Button to="/account/billing">Plan and Billing</Button>
              </div>
            )}
          </div>
        ) : (
          <ChangePasswordForm
            onSubmit={this.changePasswordRequest}
            isFetching={isFetching}
            changePasswordError={error}
            isMobileBreakpoint={isMobileBreakpoint}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  error: getError(state),
  isFetching: getIsFetching(state),
  isPasswordUpdated: getIsPasswordUpdated(state),
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  email: getEmail(state)
});

const mapDispatchToProps = {
  changePasswordRequest,
  resetIsPasswordUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
