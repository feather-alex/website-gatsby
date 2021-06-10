/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Header1 from '../../ui/headers/Header1';
import Subheader2 from '../../ui/subheaders/Subheader2';
import { BRAND } from '../../ui/variables';
import Paragraph2 from '../../ui/paragraphs/Paragraph2';
import Button from '../../ui/buttons/Button';
import Caption from '../../ui/captions/Caption';

const Container = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled(Header1)`
  margin-bottom: 24px;
  max-width: 684px;
`;

const Subheader = styled(Subheader2)`
  max-width: 612px;
`;

const HorizontalRule = styled.hr`
  height: 1px;
  width: 100%;
  margin: 48px 0;
  background-color: ${BRAND.ACCENT};
`;

const LoginButton = styled(Button)`
  margin: 24px 0;
`;

const CaptionText = styled(Caption)`
  max-width: 244px;
`;

interface Props {
  email: string;
}

const AuthPageEmailSentMessage = ({ email }: Props) => (
  <Container>
    <Header>Verify your email address to complete account setup.</Header>
    <Subheader>We sent an email to {email}. Check your inbox and let us know it’s really you.</Subheader>
    <HorizontalRule />
    <Paragraph2>Once you're verified:</Paragraph2>
    <LoginButton to="/login">Log In to Account</LoginButton>
    <CaptionText color={BRAND.SECONDARY_TEXT}>Feather Accounts are only available for active customers.</CaptionText>
  </Container>
);

export default AuthPageEmailSentMessage;
