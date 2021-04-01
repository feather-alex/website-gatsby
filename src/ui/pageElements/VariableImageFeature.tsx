/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { BREAKPOINTS, BRAND } from "../../ui/variables";
import BaseImage from "../images/BaseImage";

const Section = styled.section`
  display: flex;

  @media ${BREAKPOINTS.DESKTOP} {
    max-height: 700px;
  }

  @media ${BREAKPOINTS.MOBILE} {
    height: 100%;
    flex-direction: column;
  }
`;
const ImageContainer = styled.div`
  width: ${({ width }: { width: number }) => width}%;
  display: flex;
  @media ${BREAKPOINTS.MOBILE} {
    width: 100%;
  }
`;
const ChildrenContainer = styled.div`
  background-color: ${BRAND.PRIMARY};
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: ${({ width }: { width: number }) => width}%;
  @media ${BREAKPOINTS.MOBILE} {
    padding: 48px 24px;
    width: 100%;
  }
`;

interface Props {
  image: {
    src: string;
    alt?: string;
  };
  imageWidthPercentage: number;
  children: React.ReactNode;
  className?: string;
}

const VariableImageFeature = ({
  image,
  children,
  imageWidthPercentage,
  className,
}: Props) => (
  <Section className={className}>
    <ImageContainer width={imageWidthPercentage}>
      <BaseImage imgUrl={image.src} alt={image.alt} />
    </ImageContainer>
    <ChildrenContainer width={100 - imageWidthPercentage}>
      {children}
    </ChildrenContainer>
  </Section>
);

export default VariableImageFeature;
