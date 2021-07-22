/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import ProductFilterButtons from "./ProductFilterButtons";
import { getFilters, FilterType, createQuery } from "./filter.service";
import { useHistory } from "react-router";
import DesktopSortDropdown from "./DesktopSortDropdown";

interface Props {
  filterNameMap: { [identifier: string]: string };
}

const ProductSortOrder = ({ filterNameMap }: Props): JSX.Element => {
  const history = useHistory();
  const { location } = history;

  const activeFilters = getFilters(location);

  const handleSortOptionClick = React.useCallback(
    (sortIdentifier: string, sortDirection: string) => {
      const partialQuery = createQuery({
        identifier: sortIdentifier === "default" ? undefined : sortIdentifier,
        filterType: FilterType.SORT_BY,
        locationSearch: location.search,
        replace: true,
      });
      const newQuery = createQuery({
        identifier: sortDirection === "default" ? undefined : sortDirection,
        filterType: FilterType.ORDER,
        locationSearch: partialQuery,
        replace: true,
      });

      history.replace(`${location.pathname}?${newQuery}`);
    },
    [location, history]
  );

  return (
    <div
      css={css`
        width: 100%;
        padding: 8px 50px;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
        `}
      >
        <ProductFilterButtons filterNameMap={filterNameMap} />
      </div>
      <div
        css={css`
          position: relative;
          display: flex;
        `}
      >
        <DesktopSortDropdown
          activeFilters={activeFilters}
          handleSortOptionClick={handleSortOptionClick}
        />
      </div>
    </div>
  );
};

export default ProductSortOrder;
