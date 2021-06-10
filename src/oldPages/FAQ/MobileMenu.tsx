/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import FaqsCategories from './FaqsCategories';
import { FAQCategory } from '../../contentful/contentful.types';
import MobileAccordionMenu from '../../ui/pageElements/MobileAccordionMenu';

interface Props {
  categories: FAQCategory[];
}

const MobileMenu = ({ categories }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleClick = React.useCallback(() => setIsMenuOpen(!isMenuOpen), [setIsMenuOpen, isMenuOpen]);

  return (
    <MobileAccordionMenu isMenuOpen={isMenuOpen} onClick={handleClick} title="Categories">
      <FaqsCategories toggleMobileMenu={handleClick} categories={categories} />
    </MobileAccordionMenu>
  );
};

export default MobileMenu;
