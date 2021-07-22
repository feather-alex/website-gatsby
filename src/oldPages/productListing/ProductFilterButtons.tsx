/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

import {
  FilterType,
  displayFilters,
  createQuery,
  getFilters,
} from "./filter.service";
import Button, { ButtonStyle } from "../../ui/buttons/Button";
import CloseSignIcon from "../../ui/icons/CloseSignIcon";
import AllCaps from "../../ui/headers/AllCaps";
import Analytics from "../../analytics/analytics";
import { PRODUCT_CATEGORY } from "../../analytics/product-category/events";
import { useHistory } from "react-router";
import Title3 from "../../ui/titles/Title3";
import { BREAKPOINTS } from "../../ui/variables";
import { getIsMobileBreakpoint } from "../../app/store/dimensions/dimensions.selectors";
import { useSelector } from "react-redux";

interface Props {
  filterNameMap: { [identifier: string]: string };
}

const Title = styled(Title3)`
  color: inherit;
`;

const StyledButton = styled(Button)`
  padding: 4px 12px;
  margin: 0 8px 8px 0;
  height: min-content;
  width: min-content;
  min-width: 0;
  @media ${BREAKPOINTS.MOBILE} {
    padding: 4px 12px;
  }
`;

const StyledCloseIcon = styled(CloseSignIcon)`
  height: 16px;
  display: flex;
  padding: 0 0 0 8px;
`;

const ProductFilterButtons = ({ filterNameMap }: Props) => {
  const history = useHistory();
  const activeFilters = getFilters(history.location);

  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);

  const handleFilterClick = React.useCallback(
    (identifier: string, filterType: FilterType) => {
      return () => {
        const newQuery = createQuery({
          identifier,
          filterType,
          locationSearch: history.location.search,
        });
        history.replace(`${history.location.pathname}?${newQuery}`);
      };
    },
    [history]
  );

  const handleClearClick = React.useCallback(() => {
    Analytics.trackEvent(PRODUCT_CATEGORY.FILTER_CLEAR);
    history.replace(history.location.pathname);
  }, [history]);

  const renderFilter = React.useCallback(
    (filterType: FilterType): ((filter: string) => JSX.Element) =>
      (filter: string): JSX.Element => {
        return (
          <StyledButton
            style={ButtonStyle.SECONDARY}
            onClick={handleFilterClick(filter, filterType)}
            key={filter}
          >
            <Title>{filterNameMap[filter]}</Title>

            <StyledCloseIcon size={16} />
          </StyledButton>
        );
      },
    [handleFilterClick, filterNameMap]
  );

  const filterButtons = Object.keys(activeFilters)
    .filter((filterType: FilterType) => displayFilters[filterType])
    .map((filterType: FilterType) =>
      activeFilters[filterType].map(renderFilter(filterType))
    );

  if (filterButtons.some((value) => value.length)) {
    return (
      <div
        css={css`
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          margin-top: 5px;
          margin-bottom: ${isMobileBreakpoint ? 16 : 11}px;
        `}
      >
        {filterButtons}{" "}
        <span
          css={css`
            cursor: pointer;
            height: fit-content;
          `}
        >
          <AllCaps onClick={handleClearClick}>Clear All</AllCaps>
        </span>
      </div>
    );
  }
  return <div />;
};

export default ProductFilterButtons;
