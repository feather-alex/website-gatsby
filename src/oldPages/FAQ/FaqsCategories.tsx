/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { HashLink } from 'react-router-hash-link';
import Title2 from '../../ui/titles/Title2';
import { FAQCategory } from '../../contentful/contentful.types';

interface Props {
  toggleMobileMenu?: () => void;
  categories: FAQCategory[];
}

const FaqsCategories = ({ toggleMobileMenu, categories }: Props) => {
  return (
    <ul
      css={css`
        width: max-content;
        li:not(:first-of-type) {
          margin-top: 10px;
        }
      `}
    >
      {categories.map((category) => (
        <li
          css={css`
            margin-bottom: 18px;
          `}
          key={`list-${category.name}`}
        >
          <div role="button" tabIndex={0} onClick={toggleMobileMenu}>
            <HashLink to={`/faqs#${category.name}`} smooth={true}>
              <Title2 isBold={true}>{category.name}</Title2>
            </HashLink>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FaqsCategories;
