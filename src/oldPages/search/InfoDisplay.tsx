/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Paragraph2 from "../../ui/paragraphs/Paragraph2";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import { BRAND, BREAKPOINTS } from "../../ui/variables";

const InfoDisplayContainer = styled.div`
  border: 1px solid ${BRAND.ACCENT};
  text-align: center;
  margin: 16px 0 112px;
  padding: 32px;
  width: 100%;

  @media ${BREAKPOINTS.MOBILE} {
    margin: 0 24px 72px;
    width: calc(100% - 48px);
  }
`;

const ButtonContainer = styled.span`
  @media ${BREAKPOINTS.MOBILE} {
    display: block;
    margin-bottom: 8px;
  }
`;

const InfoDisplay = () => (
  <InfoDisplayContainer>
    <Paragraph2>
      If you want to see everything,{" "}
      <ButtonContainer>
        <Button style={ButtonStyle.TEXT} to="/products">
          browse all furniture.
        </Button>{" "}
      </ButtonContainer>
      Or, shop our{" "}
      <ButtonContainer>
        <Button style={ButtonStyle.TEXT} to="/packages">
          room packages.
        </Button>
      </ButtonContainer>
    </Paragraph2>
  </InfoDisplayContainer>
);

export default InfoDisplay;
