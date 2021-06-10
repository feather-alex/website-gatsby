import { State as GlobalState } from '../../types/ReduxState';
import { getIsAuthenticated } from '../auth/login/store/login.selectors';
import AccountPage from '../../pages/account/AccountPage';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Layout from '../../app/Layout';

class Account extends React.Component {
  render() {
    return (
      <Layout>
        <AccountPage />
      </Layout>
    );
  }
}

const ProtectedAccount = ({ authenticated }: { authenticated: boolean }) => {
  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return <Account />;
};

const mapStateToProps = (state: GlobalState) => ({
  authenticated: getIsAuthenticated(state)
});

export default connect(mapStateToProps)(ProtectedAccount);
