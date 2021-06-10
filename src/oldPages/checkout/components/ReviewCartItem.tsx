/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Title3 from '../../../ui/titles/Title3';
import { Line } from '../../cart/components/MiniCartFooter';
import FixedSizeImage from '../../../ui/images/FixedSizeImage';
import Paragraph1 from '../../../ui/paragraphs/Paragraph1';
import { BRAND, BREAKPOINTS } from '../../../ui/variables';
import { Fragment } from 'react';

export const LineBreak = styled(Line)`
  margin: 16px 0;
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductImageAndDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ProductDetails = styled.div`
  margin-left: 20px;

  @media ${BREAKPOINTS.MOBILE} {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

interface Props {
  index: number;
  backgroundImage: string;
  title: string;
  variantName: string;
  price: number;
  isMobileBreakpoint: boolean;
}

const ReviewCartItem = ({ backgroundImage, title, variantName, price, isMobileBreakpoint }: Props) => (
  <Fragment>
    <ProductContainer>
      <ProductImageAndDetails>
        {isMobileBreakpoint ? (
          <FixedSizeImage src={backgroundImage} width={64} height={64} />
        ) : (
          <FixedSizeImage src={backgroundImage} width={86} height={86} />
        )}
        <ProductDetails>
          <Paragraph1>{title}</Paragraph1>
          <Title3 color={BRAND.SECONDARY_TEXT}>{variantName}</Title3>
        </ProductDetails>
      </ProductImageAndDetails>
      <div>${price}/mo</div>
    </ProductContainer>
    <LineBreak />
  </Fragment>
);

export default ReviewCartItem;
