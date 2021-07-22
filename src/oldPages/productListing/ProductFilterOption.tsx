/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import qs from "query-string";

import SelectInput, { InputType } from "../../ui/formElements/SelectInput";
import { FilterType, createQuery, queryToList } from "./filter.service";
import { useHistory } from "react-router";
import Title1 from "../../ui/titles/Title1";
import { IdentifierAndName } from "../../types/Product";
import { BRAND } from "../../ui/variables";

interface Props {
  option: IdentifierAndName;
  filterType: FilterType;
}

const ProductFilterOption = ({ option, filterType }: Props) => {
  const history = useHistory();
  const { location } = history;
  const handleToggle = React.useCallback(
    (identifier: string) => () => {
      const newQuery = createQuery({
        identifier,
        filterType,
        locationSearch: location.search,
      });
      history.replace(`${location.pathname}?${newQuery}`);
    },
    [history, filterType, location]
  );

  const search = qs.parse(location.search, { arrayFormat: "comma" });
  const filters = queryToList(search[filterType]);
  const isChecked = Boolean(
    filters.some((filter: string) => filter === option.identifier)
  );
  return (
    <div
      css={css`
        padding-left: 2px;
        padding-bottom: 16px;
      `}
      key={option.identifier}
    >
      <SelectInput
        inputType={InputType.Checkbox}
        onChange={handleToggle(option.identifier)}
        isChecked={isChecked}
      >
        <span
          css={css`
            display: inline-block;
          `}
        >
          <Title1
            color={isChecked ? BRAND.PRIMARY_TEXT : BRAND.SECONDARY_TEXT}
            isBold={isChecked}
          >
            {option.name}
          </Title1>
        </span>
      </SelectInput>
    </div>
  );
};

export default ProductFilterOption;
