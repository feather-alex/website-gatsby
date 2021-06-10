/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { SecondaryGroup } from '../../../../contentful/contentful.types';
import MobileNavCategoryCard from '../../../../ui/navbar/MobileNavCategoryCard';
import Header3 from '../../../../ui/headers/Header3';
import { Fragment } from 'react';
import Subheader1 from '../../../../ui/subheaders/Subheader1';
import ArrowIcon, { Direction } from '../../../../ui/icons/ArrowIcon';
import { BRAND } from '../../../../ui/variables';
import { Z_INDICIES } from '../../../../ui/zIndicies';

const GroupContainer = styled.div`
  position: relative;
  top: ${({ index }: { columns: number; index: number }) => (index === 0 ? '48px' : '0')};
  left: 0;
  padding: 0px 24px 48px;
  display: grid;
  grid-template-columns: repeat(${({ columns }: { columns: number; index: number }) => columns}, 1fr);
  column-gap: 16px;
`;

const GroupHeader = styled(Header3)`
  margin: 8px 0 16px 24px;
`;

const CategoryHeader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  padding: 16px 0 32px 24px;
  max-height: 32px;
  width: 100%;
  background-color: ${BRAND.BACKGROUND};
  z-index: ${Z_INDICIES.MOBILE_NAV_MENU_SECONDARY_HEADER};
  > div {
    margin: 5px 8px 0;
  }
`;

interface Props {
  toggleMobileNavOverlay: () => void;
  secondaryMenuTitle: string;
  secondaryGroups: SecondaryGroup[];
  handleNavLinkClick: (currentLink: string) => () => void;
  handleGoBack: () => void;
}

const MobileNavSubMenu = ({
  secondaryMenuTitle,
  secondaryGroups,
  toggleMobileNavOverlay,
  handleNavLinkClick,
  handleGoBack
}: Props) => {
  const handleClick = (linkName: string) => () => {
    handleNavLinkClick(linkName)();
    toggleMobileNavOverlay();
  };

  return (
    <Fragment>
      <CategoryHeader onClick={handleGoBack}>
        <ArrowIcon direction={Direction.Left} width={15} />
        <Subheader1>{secondaryMenuTitle}</Subheader1>
      </CategoryHeader>
      {secondaryGroups.map((group, index) => (
        <Fragment key={index}>
          {group.title && <GroupHeader>{group.title}</GroupHeader>}
          <GroupContainer columns={group.categories[0].isFullscreen ? 1 : 2} index={index}>
            {group.categories.map((category) => (
              <MobileNavCategoryCard
                key={category.name}
                name={category.name}
                imageUrl={category.image.url}
                to={category.link}
                isFullscreen={category.isFullscreen}
                onClick={handleClick(category.name)}
              />
            ))}
          </GroupContainer>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default MobileNavSubMenu;
