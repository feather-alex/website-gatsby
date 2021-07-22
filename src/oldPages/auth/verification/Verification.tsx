/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import { State as GlobalState } from "../../../types/ReduxState";
import { ActionCreator } from "../../../types/FluxStandardActions";
import { APIError } from "../../../types/ReduxState";
import AlternateLayout from "../../../app/AlternateLayout";
import {
  resendVerification as resendVerificationAction,
  ResendVerification,
  resetResentVerificationEmail,
} from "./store/verification.actions";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import AuthPageHeader from "../AuthPageHeader";
import AuthPageEmailSentMessage from "../AuthPageEmailSentMessage";
import { getIsMobileBreakpoint } from "../../../app/store/dimensions/dimensions.selectors";
import VerificationForm from "./VerificationForm";
import {
  getIsFetching,
  getError,
  getHasResentVerificationEmail,
} from "./store/verification.selectors";
import { getEmail } from "../register/store/register.selectors";
import { VerificationFormData } from "./store/verification.types";
import Analytics from "../../../analytics/analytics";
import PAGES from "../../../analytics/pages";

interface Props {
  resendVerification: ResendVerification;
  resetResentVerificationEmail: ActionCreator;
  email: string;
  isFetching: boolean;
  isMobileBreakpoint: boolean;
  verificationError: APIError | null;
  hasResentVerificationEmail: boolean;
}

class Verification extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.VERIFY);
  }

  componentWillUnmount() {
    this.props.resetResentVerificationEmail();
  }

  resendVerification = (values: VerificationFormData) => {
    this.props.resendVerification(values);
  };

  render() {
    const {
      email,
      isFetching,
      verificationError,
      hasResentVerificationEmail,
      isMobileBreakpoint,
    } = this.props;

    return (
      <AlternateLayout>
        <AuthPageHeader
          headerText="Email verification required"
          isMobileBreakpoint={isMobileBreakpoint}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 12px 24px 0;
          `}
        >
          {hasResentVerificationEmail ? (
            <AuthPageEmailSentMessage email={email} />
          ) : (
            <React.Fragment>
              <div
                css={css`
                  max-width: 420px;
                `}
              >
                <Paragraph2>
                  {`In order to access your account, you'll need to verify the email address on file. Check your inbox for
                  the verification email, or resend using the button below.`}
                </Paragraph2>
              </div>
              <VerificationForm
                onSubmit={this.resendVerification}
                initialValues={{ email }}
                isFetching={isFetching}
                verificationError={verificationError}
              />
            </React.Fragment>
          )}
        </div>
      </AlternateLayout>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  isFetching: getIsFetching(state),
  verificationError: getError(state),
  hasResentVerificationEmail: getHasResentVerificationEmail(state),
  email: getEmail(state),
});

const mapDispatchToProps = {
  resendVerification: resendVerificationAction,
  resetResentVerificationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
