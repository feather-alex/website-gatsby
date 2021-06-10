/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Header1 from '../../ui/headers/Header1';
import Paragraph1 from '../../ui/paragraphs/Paragraph1';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import { BREAKPOINTS, COLORS } from '../../ui/variables';
import { LineBreak } from './AdditionalUnderwriting';
import Layout from '../../app/Layout';

const Container = styled.div`
  background-color: ${COLORS.CREAM};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 136px;
  margin: 0 24px 139px 24px;

  @media ${BREAKPOINTS.MOBILE} {
    min-width: 375px;
    width: 100%;
    margin: 0 auto 66px auto;
    padding: 64px 24px 0 24px;
  }
`;

const Head = styled.div`
  max-width: 888px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const SubHeader = styled(Paragraph1)`
  text-align: left;
  max-width: 680px;
  margin-top: 24px;
`;

const List = styled.ul`
  margin-top: 8px;
`;

const ListItem = styled.li`
  margin-left: 16px;
  list-style-type: disc;
`;

const BodyText = styled(Paragraph1)`
  margin: 0 auto 32px auto;
  @media ${BREAKPOINTS.MOBILE} {
    margin-top: 0;
    margin-bottom: 16px;
  }
`;

const DepositRequestSuccess = () => (
  <Layout>
    <Container>
      <Head>
        <Header1 dataCy="deposit-header">
          Please send us some additional information to begin the review process
        </Header1>
        <SubHeader>
          Now that you've chosen to submit a deposit, we need additional information from you. You will receive an email
          shortly from customerapplication@livefeather.com. Please reply with:
          <List>
            <ListItem>A copy of a photo ID (Passport, U.S. State ID or U.S. Driver’s License).</ListItem>
            <ListItem>
              Your most recent pay stub from a US-based employer that clearly identifies your employer, gross income,
              and date of payment occurring in the last 30 days.
            </ListItem>
          </List>
        </SubHeader>
        <LineBreak />
        <BodyText>In the meantime, learn more about our mission & standards.</BodyText>
        <Button to={'/about'} style={ButtonStyle.SECONDARY}>
          About Feather
        </Button>
      </Head>
    </Container>
  </Layout>
);

export default DepositRequestSuccess;
