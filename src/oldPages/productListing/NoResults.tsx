/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Header2 from '../../ui/headers/Header2';

const NoResults = () => (
  <div
    css={css`
      padding: 24px;
    `}
  >
    <Header2>No results found. Try:</Header2>
    <ul>
      <li>Refining your filters</li>
      <li>Clearing all filters</li>
      <li>Selecting another category</li>
    </ul>
  </div>
);

export default NoResults;
