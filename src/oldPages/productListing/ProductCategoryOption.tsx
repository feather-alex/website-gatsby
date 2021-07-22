/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import SelectInput, { InputType } from "../../ui/formElements/SelectInput";
import { IdName } from "../../app/store/entities/entities.types";
import { useHistory } from "react-router";
import Title1 from "../../ui/titles/Title1";
import { useDispatch } from "react-redux";
import { toggleOverlay } from "../../app/store/overlay/overlay.actions";
import { Overlays } from "../../app/store/overlay/overlay.types";
import { BRAND } from "../../ui/variables";

interface Props {
  option: IdName;
}

const ProductCategoryOption = ({ option }: Props) => {
  const history = useHistory();
  const { location } = history;
  const dispatch = useDispatch();
  const handleSelect = React.useCallback(
    (identifier: string) => () => {
      if (identifier === "packages") {
        dispatch(toggleOverlay(Overlays.MobileProductFilters, false));
        history.replace("/packages");
      } else {
        history.replace(`/products/${identifier}`);
      }
    },
    [history, dispatch]
  );

  const isChecked =
    option.identifier === ""
      ? Boolean(location.pathname.match(/\/products\/?$/))
      : Boolean(location.pathname.endsWith(option.identifier));
  return (
    <div
      css={css`
        padding-left: 2px;
        padding-bottom: 16px;
      `}
      key={option.identifier}
    >
      <SelectInput
        inputType={InputType.Radio}
        onChange={handleSelect(option.identifier)}
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

export default ProductCategoryOption;
