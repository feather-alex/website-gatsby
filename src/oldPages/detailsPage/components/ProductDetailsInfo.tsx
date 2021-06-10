/** @jsx jsx */
import { useSelector } from 'react-redux';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import BaseImage from '../../../ui/images/BaseImage';
import Header2 from '../../../ui/headers/Header2';
import Paragraph1 from '../../../ui/paragraphs/Paragraph1';
import { ProductDimension, ProductBrand, ProductMaterial } from '../../../types/Product';
import Title1 from '../../../ui/titles/Title1';
import { SHADES, BRAND, BREAKPOINTS, COLORS } from '../../../ui/variables';
import Paragraph2 from '../../../ui/paragraphs/Paragraph2';
import { getIsMobileBreakpoint } from '../../../app/store/dimensions/dimensions.selectors';

const DimensionContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const DottedLine = styled.div`
  flex-grow: 1;
  border-bottom: 2px dotted ${BRAND.ACCENT};
  margin: 5px 8px;
`;

const HorizontalRule = styled.div`
  height: 1px;
  width: 100%;
  margin: 32px 0;
  background-color: ${BRAND.ACCENT};
`;

interface Props {
  description: string;
  dimensions: ProductDimension;
  brand: ProductBrand;
  materials: ProductMaterial[];
}

const ProductDetailsInfo = ({ description, dimensions, brand, materials }: Props) => {
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const Paragraph = isMobileBreakpoint ? Paragraph2 : Paragraph1;
  const tabletBreakpoint = BREAKPOINTS.MOBILE;
  const mobileBreakpoint = 'screen and (max-width: 425px)';

  const dimensionsImage = dimensions.image.desktop || null;

  return (
    <section
      css={css`
        background-color: ${COLORS.CLOUD};
        padding: 112px 0 144px;
        width: 100%;

        @media ${tabletBreakpoint} {
          padding: 64px 24px 80px;
        }
      `}
    >
      <div
        css={css`
          text-align: center;

          @media ${mobileBreakpoint} {
            text-align: left;
          }
        `}
      >
        <Header2>Product Details</Header2>
      </div>
      <div
        css={css`
          max-width: 872px;
          margin: 36px auto 0;
          padding: 0 64px 64px 64px;
          text-align: center;

          @media ${tabletBreakpoint} {
            width: 100%;
            max-width: 553px;
            padding: 0 0 48px 0;
          }

          @media ${mobileBreakpoint} {
            margin: 12px 0 0;
            text-align: left;
          }
        `}
      >
        <Paragraph>{description}</Paragraph>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 336px;
          margin: 0 24px;

          @media ${tabletBreakpoint} {
            flex-direction: column;
            height: 100%;
          }
        `}
      >
        <div
          css={css`
            min-width: ${dimensionsImage ? '300px' : '416px'};
            margin-right: ${dimensionsImage ? '96px' : '0'};

            @media ${tabletBreakpoint} {
              max-width: 400px;
              width: 100%;
              margin-right: 0;
              margin-bottom: 48px;
            }

            @media ${mobileBreakpoint} {
              min-width: 100%;
              align-self: flex-start;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            `}
          >
            <Title1 isBold={true}>Dimensions</Title1>
            <Title1 color={SHADES.SHADE_DARK}>(Inches)</Title1>
          </div>

          <DimensionContainer>
            <Title1>Height</Title1>
            <DottedLine />
            <Title1>{dimensions.height}</Title1>
          </DimensionContainer>
          <DimensionContainer>
            <Title1>Width</Title1>
            <DottedLine />
            <Title1>{dimensions.width}</Title1>
          </DimensionContainer>
          <DimensionContainer>
            <Title1>Depth</Title1>
            <DottedLine />
            <Title1>{dimensions.length}</Title1>
          </DimensionContainer>

          <HorizontalRule />

          <Title1 isBold={true}>{`By ${brand.name}`}</Title1>
          <div
            css={css`
              margin-top: 8px;
            `}
          >
            <Title1>{materials.join(', ')}</Title1>
          </div>
        </div>
        {dimensionsImage && (
          <div
            css={css`
              max-height: 386px;
              max-width: 821px;

              @media ${tabletBreakpoint} {
                align-self: center;
              }
            `}
          >
            <BaseImage
              imgUrl={dimensionsImage}
              alt="dimensions diagram"
              height={isMobileBreakpoint ? 256 : 334}
              shouldPreload={true}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailsInfo;
