/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import ResponsiveImage from '../../../ui/images/ResponsiveImage';
import { BRAND, BREAKPOINTS, SHADES } from '../../../ui/variables';
import RichTextWrapper from '../../../contentful/RichTextWrapper';
import Analytics from '../../../analytics/analytics';
import { ACCOUNTS } from '../../../analytics/accounts/events';

interface Props {
  name: string;
  discount: string;
  imageUrl: string;
  logo: string;
  caption: string;
  website: string;
}

const CardContainer = styled.div`
  position: relative;
  background: ${SHADES.WHITE};
  display: flex;
  flex-direction: column;
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 40px 24px;
`;

const Discount = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${BRAND.PRIMARY};
  color: ${SHADES.WHITE};
  padding: 8px;
  border-radius: 3px;
  z-index: 1;
`;

const ImageContainer = styled.div`
  @media ${BREAKPOINTS.DESKTOP} {
    max-height: 200px;
  }
`;

const CaptionRichTextWrapper = styled(RichTextWrapper)`
  & p {
    font-size: 14px;
    line-height: 20px;
    margin: 24px 0 16px;
  }
`;

const trackClick = (brandName: string) => () => {
  Analytics.trackEvent(ACCOUNTS.FEATHER_PERKS, { brand: `${brandName}` });
};

const FeatherPerkCard = ({ discount, imageUrl, logo, caption, website, name }: Props) => (
  <CardContainer>
    <Discount>{discount}</Discount>
    <ImageContainer>
      <ResponsiveImage src={imageUrl} width={298} height={200} />
    </ImageContainer>
    <CardBody>
      <img src={logo} alt={name} />
      <CaptionRichTextWrapper text={caption} />
      <Button style={ButtonStyle.TEXT} external={website} onClick={trackClick(name)}>
        Shop Now
      </Button>
    </CardBody>
  </CardContainer>
);

export default FeatherPerkCard;
