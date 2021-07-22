/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Layout from "../../app/Layout";
import Bestsellers from "../homepage/Bestsellers";
import Header1 from "../../ui/headers/Header1";
import Paragraph1 from "../../ui/paragraphs/Paragraph1";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import { BREAKPOINTS, MARGINS, SHADES } from "../../ui/variables";

const NotFoundSection = styled.section`
  width: 100%;
  background-color: ${SHADES.WHITE};
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 175px 0;
  max-width: 690px;
  margin: 0 auto;

  @media ${BREAKPOINTS.MOBILE} {
    padding: 150px ${MARGINS.MOBILE};
  }

  h1 {
    margin-bottom: 24px;
  }

  p {
    margin-bottom: 32px;
  }
`;

const ProductOrPackageNotFound = () => (
  <Layout>
    <NotFoundSection>
      <NotFoundContainer>
        <Header1>Oops! We couldn't find what you were looking for.</Header1>
        <Paragraph1>
          We can reset your furniture hunt by showing you our whole selection.
        </Paragraph1>
        <Button style={ButtonStyle.PRIMARY} to="/products">
          Shop All Furniture
        </Button>
      </NotFoundContainer>
    </NotFoundSection>
    <Bestsellers />
  </Layout>
);

export default ProductOrPackageNotFound;
