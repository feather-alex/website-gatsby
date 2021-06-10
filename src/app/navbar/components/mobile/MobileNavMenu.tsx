/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { NavCategoryWithSubmenu, NavCategoryDirectLink } from '../../../../contentful/contentful.types';
import MobileNavLinkComponent from '../../../../ui/navbar/MobileNavLink';

const NavMenuContainer = styled.div`
  padding: 0px 24px 96px 24px;
`;
interface Props {
  toggleSubMenu: (categoryIndex: number) => void;
  handleNavLinkClick: (currentLink: string) => () => void;
  categories: (NavCategoryWithSubmenu | NavCategoryDirectLink)[];
}

const MobileNavMenu = ({ toggleSubMenu, categories, handleNavLinkClick }: Props) => {
  const handleOnClick = ({
    index,
    category
  }: {
    index: number;
    category: NavCategoryWithSubmenu | NavCategoryDirectLink;
  }) => () => {
    // if we click on a direct link we want call handle nav link clicked
    // which will fire the analytics event and close the overlay
    if ('link' in category) {
      handleNavLinkClick(category.name)();
      // else we want to open the correct sub menu
    } else {
      toggleSubMenu(index);
    }
  };

  return (
    <NavMenuContainer data-cy="mobile-menu">
      {categories.map((category, index) => (
        <MobileNavLinkComponent
          key={category.name}
          name={category.name}
          withArrow={category.designWithArrow}
          imageUrl={category.image.url}
          to={'link' in category ? category.link : undefined}
          onClick={handleOnClick({ index, category })}
        />
      ))}
    </NavMenuContainer>
  );
};

export default MobileNavMenu;
