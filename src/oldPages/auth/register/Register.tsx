/** @jsx jsx */
import React from "react";
import { connect } from "react-redux";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

import Analytics from "../../../analytics/analytics";
import PAGES from "../../../analytics/pages";
import { State as GlobalState, APIError } from "../../../types/ReduxState";
import { ActionCreator } from "../../../types/FluxStandardActions";
import {
  registerRequest as registerRequestAction,
  RegisterRequest,
  resetHasRegistered,
} from "./store/register.actions";
import {
  getError,
  getIsFetching,
  getHasRegistered,
  getEmail,
} from "./store/register.selectors";
import RegisterForm from "./RegisterForm";
import AuthPageEmailSentMessage from "../AuthPageEmailSentMessage";
import { RegisterFormData } from "./store/register.types";
import Layout from "../../../app/Layout";
import Header1 from "../../../ui/headers/Header1";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 104px 0;
  text-align: center;
`;
interface DispatchProps {
  registerRequest: RegisterRequest;
  resetHasRegistered: ActionCreator;
}

interface StateProps {
  email: string;
  hasRegistered: boolean;
  error: APIError | null;
  isFetching: boolean;
}

type Props = DispatchProps & StateProps;

class Register extends React.Component<Props> {
  componentDidMount() {
    Analytics.trackPage(PAGES.SETUP_ACCOUNT);
  }

  componentWillUnmount() {
    this.props.resetHasRegistered();
  }

  registerRequest = (values: RegisterFormData) => {
    this.props.registerRequest({
      email: values.email,
      password: values.password,
    });
  };

  render() {
    const { isFetching, hasRegistered, email, error } = this.props;

    return (
      <Layout>
        <Container>
          {hasRegistered ? (
            <AuthPageEmailSentMessage email={email} />
          ) : (
            <React.Fragment>
              <Header1>Set up your Feather&nbsp;Account.</Header1>
              <RegisterForm
                onSubmit={this.registerRequest}
                isFetching={isFetching}
                initialValues={{ email }}
                setupAccountError={error}
              />
            </React.Fragment>
          )}
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  error: getError(state),
  email: getEmail(state),
  isFetching: getIsFetching(state),
  hasRegistered: getHasRegistered(state),
});

const mapDispatchToProps: DispatchProps = {
  registerRequest: registerRequestAction,
  resetHasRegistered,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
