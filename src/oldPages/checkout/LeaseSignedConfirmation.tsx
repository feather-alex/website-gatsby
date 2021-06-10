/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../../app/Layout';
import Button from '../../ui/buttons/Button';
import Header1 from '../../ui/headers/Header1';
import Paragraph2 from '../../ui/paragraphs/Paragraph2';
import Subheader2 from '../../ui/subheaders/Subheader2';
import { BREAKPOINTS, SHADES } from '../../ui/variables';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../auth/login/store/login.selectors';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px 96px;
  text-align: center;
`;

const Header = styled(Header1)`
  padding-bottom: 48px;
  max-width: 612px;
`;

const Subheader = styled(Subheader2)`
  max-width: 420px;
`;

const CTAContainer = styled.div`
  background-color: ${SHADES.WHITE};
  padding: 44px 84px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 44px 24px;
  }
`;

const CTAButton = styled(Button)`
  margin: 24px 0;
`;

const ActivateAccountLink = styled(Link)`
  text-decoration: underline;
`;

const LeaseSignedConfirmation = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Layout>
      <Container>
        <Header>Thank you for signing your Feather&nbsp;Lease!</Header>
        <CTAContainer>
          <Subheader>Be sure to check your account for delivery confirmation & details.</Subheader>
          {isAuthenticated ? (
            <CTAButton to="/account">Go to Account</CTAButton>
          ) : (
            <CTAButton to="/login">Log In to Account</CTAButton>
          )}
          {!isAuthenticated && (
            <Paragraph2>
              Don't have an account yet?{' '}
              <ActivateAccountLink to="/setup-account">Activate&nbsp;Today</ActivateAccountLink>
            </Paragraph2>
          )}
        </CTAContainer>
      </Container>
    </Layout>
  );
};

export default LeaseSignedConfirmation;
