/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { SelectedOptions, SelectedOption } from '../store/productDetails/product.types';
import { ProductVariant, ProductOption, OptionType } from '../../../types/Product';
import BaseImage from '../../../ui/images/BaseImage';
import { BRAND, SHADES } from '../../../ui/variables';
import Title1 from '../../../ui/titles/Title1';

interface Props {
  selectedOptions: SelectedOptions;
  handleOptionSelect?: (selection: SelectedOption) => void;
  variants?: ProductVariant[];
  options?: ProductOption[];
}

type SwatchesObj = {
  [identifier: string]: { imgUrl: string; optionName: string; type: OptionType };
};

const isSwatchSelected = (
  selectedOptions: SelectedOptions,
  swatchesObj: SwatchesObj,
  optionValueIdentifier: string
): boolean => {
  const selectedColorOption = selectedOptions[swatchesObj[optionValueIdentifier].type];
  if (selectedColorOption) {
    return optionValueIdentifier === selectedColorOption.identifier;
  }
  return false;
};

const ColorOptionsSelection = ({ selectedOptions, variants, options, handleOptionSelect }: Props) => {
  if (!variants || variants.length === 0 || !options || options.length === 0) {
    return null;
  }

  // if we have a structure selection, filter our variants to only
  // include those with that structure option value identifier
  const productVariants = selectedOptions[OptionType.Structure]
    ? variants.filter((variant) =>
        variant.options.find(
          (variantOption) =>
            variantOption.type === OptionType.Structure &&
            variantOption.valueIdentifier === selectedOptions[OptionType.Structure]?.identifier
        )
      )
    : variants;

  const swatchesObj: SwatchesObj = {};
  options.forEach((option) => {
    option.values.forEach((optionValue) => {
      productVariants.forEach((variant) => {
        variant.options.forEach((variantOption) => {
          if (
            variantOption.valueIdentifier === optionValue.identifier &&
            variant.swatchImage.desktop &&
            !swatchesObj[optionValue.identifier]
          ) {
            swatchesObj[optionValue.identifier] = {
              imgUrl: variant.swatchImage.desktop,
              optionName: optionValue.name,
              type: variantOption.type
            };
          }
        });
      });
    });
  });

  const color = 'Color: ';

  return (
    <div
      css={css`
        margin-top: 24px;
      `}
    >
      <Title1>
        {color}
        <span
          css={css`
            color: ${BRAND.SECONDARY_TEXT};
          `}
        >
          {selectedOptions.color ? selectedOptions.color.name : null}
          {selectedOptions.material ? selectedOptions.material.name : null}
        </span>
      </Title1>
      <div
        css={css`
          display: flex;
          margin: 10px 0;
        `}
      >
        {Object.keys(swatchesObj).map((optionValueIdentifier) => (
          <div
            key={optionValueIdentifier}
            tabIndex={0}
            role="button"
            onClick={() =>
              handleOptionSelect &&
              handleOptionSelect({
                identifier: optionValueIdentifier,
                name: swatchesObj[optionValueIdentifier].optionName
              })
            }
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 58px;
              height: 58px;
              margin-right: 12px;
              ${isSwatchSelected(selectedOptions, swatchesObj, optionValueIdentifier)
                ? `border: 2px solid ${BRAND.PRIMARY_TEXT}; border-radius: 50%;`
                : ''}

              &:hover {
                border: 2px solid ${SHADES.SHADE_LIGHT};
                border-radius: 50%;
              }
            `}
          >
            <div
              css={css`
                width: 48px;
                height: 48px;
                border: 1px solid ${SHADES.SHADE_LIGHTER};
                border-radius: 50%;
              `}
            >
              <BaseImage
                imgUrl={swatchesObj[optionValueIdentifier].imgUrl}
                alt=""
                isRounded={true}
                width={50}
                height={50}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        css={css`
          margin: 32px 0;
          width: 100%;
          height: 1px;
          background-color: ${SHADES.SHADE_LIGHTER};
        `}
      />
    </div>
  );
};

export default ColorOptionsSelection;
