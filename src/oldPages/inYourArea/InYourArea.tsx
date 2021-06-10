/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Layout from '../../app/Layout';
import Header1 from '../../ui/headers/Header1';
import Subheader2 from '../../ui/subheaders/Subheader2';
import Button, { ButtonStyle } from '../../ui/buttons/Button';
import { BRAND, BREAKPOINTS, FONTS } from '../../ui/variables';
import { useSelector } from 'react-redux';
import { getCityPages } from '../../app/store/contentfulPages/pages.selectors';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LargeLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 56px 0;
  max-width: 1176px;
  padding: 0 24px;
  @media ${BREAKPOINTS.MOBILE} {
    margin: 32px 0;
  }
`;

const baseText = css`
  color: ${BRAND.PRIMARY};
  font-size: 48px;
  line-height: 60px;
  font-family: ${FONTS.PRIMARY};
  @media ${BREAKPOINTS.MOBILE} {
    font-size: 24px;
    line-height: 36px;
  }
`;

const LargeLink = styled(Link)`
  ${baseText};
  text-decoration: underline;
  transition: color 0.25s linear;

  &:hover {
    color: ${BRAND.PRIMARY};
    text-decoration: none;
  }
`;

const Comma = styled.span`
  ${baseText};
  margin-right: 8px;
`;

const Header = styled(Header1)`
  text-align: center;
  margin-top: 190px;
  @media ${BREAKPOINTS.MOBILE} {
    margin-top: 48px;
  }
`;

const ExploreButton = styled(Button)`
  margin: 32px 0 300px;
  @media ${BREAKPOINTS.MOBILE} {
    margin-bottom: 120px;
  }
`;

export interface LocationInfo {
  city: string;
  link: string;
}

const InYourArea = () => {
  const locations = useSelector(getCityPages);

  return (
    <Layout>
      <Section>
        <Header>Feather in your&nbsp;area.</Header>
        <LargeLinksWrapper>
          {locations.map((location, index) => (
            <div key={location.slug}>
              <LargeLink to={location.slug}>{location.title}</LargeLink>
              {index < locations.length - 1 && <Comma>,</Comma>}
            </div>
          ))}
        </LargeLinksWrapper>
        <Subheader2>Ready to start your rental journey?</Subheader2>
        <ExploreButton style={ButtonStyle.PRIMARY} to="/products">
          Explore Furniture
        </ExploreButton>
      </Section>
    </Layout>
  );
};

export default InYourArea;
