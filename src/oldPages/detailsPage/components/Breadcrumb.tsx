/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { IdName } from '../../../types/Product';
import Title1 from '../../../ui/titles/Title1';
import { BRAND, SHADES } from '../../../ui/variables';
import Title3 from '../../../ui/titles/Title3';
import { Z_INDICIES } from '../../../ui/zIndicies';

export enum CurrentType {
  Product = 'products',
  Package = 'packages'
}

interface Props {
  type: CurrentType;
  category: IdName;
  title: string;
  isMobileBreakpoint: boolean;
}
const Slash = styled.div`
  color: ${SHADES.SHADE_DARK};
  margin: 0 5px;
`;

const Breadcrumb = ({ type, category, title, isMobileBreakpoint }: Props) => {
  const Title = isMobileBreakpoint ? Title3 : Title1;
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: ${isMobileBreakpoint ? '24px 0 24px' : `64px 0 24px ${type === CurrentType.Package ? '9vw' : '48px'}`};
        width: ${isMobileBreakpoint ? 100 : 50}%;
        background-color: ${BRAND.BACKGROUND};
        z-index: ${Z_INDICIES.BREADCRUMB};
        ${isMobileBreakpoint && `justify-content: center;`}
        transition: top 400ms linear;

        ${isMobileBreakpoint
          ? `
          & p {
            font-size: 12px;
          }`
          : ''}
      `}
    >
      <Link to={`/${type}`}>
        <Title color={SHADES.SHADE_DARK}>{type === CurrentType.Product ? 'Furniture' : 'Packages'}</Title>
      </Link>
      <Slash>/</Slash>
      <Link
        to={`/${type}${
          type === CurrentType.Product ? `/${category.identifier}` : `#${category.name.replace(' ', '')}`
        }`}
      >
        <Title color={SHADES.SHADE_DARK}>{category.name}</Title>
      </Link>
      <Slash>/</Slash>
      <Title color={SHADES.SHADE_DARK}> {title}</Title>
    </div>
  );
};

export default Breadcrumb;
