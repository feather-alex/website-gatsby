/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {
  ProductVariant,
  ProductOption,
  IdName,
  OptionType,
  ProductVariantOption,
  Availability
} from '../../../types/Product';
import * as utils from '../../../utils';
import { SHADES, BRAND } from '../../../ui/variables';
import Dropdown, { MenuItem } from '../../../ui/formElements/Dropdown';
import { SelectedOption, SelectedOptions } from '../store/productDetails/product.types';
import { PackageVariant } from '../../../types/Package';
import { DeliveryAreaIdentifier } from '../../../app/store/plan/plan.types';

interface Props {
  variants?: (ProductVariant | PackageVariant)[];
  structureOption?: ProductOption;
  selectedVariant: ProductVariant | PackageVariant | null;
  selectedOptions: SelectedOptions | null;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  handleOptionSelect?: (selection: SelectedOption) => void;
  isPackage: boolean;
}

const determineStatus = <T extends { availability: Availability[] }>(
  variant: T | null,
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null,
  isPackage: boolean
) => {
  if (variant && variant.availability && !isPackage) {
    // Is it enabled and in stock?
    if (
      !utils.isEnabled(deliveryAreaIdentifier, variant.availability) ||
      !utils.isInStock(deliveryAreaIdentifier, variant.availability)
    ) {
      return ' - Out of stock';
    }
  }
  return null;
};

const determineOptionStatus = <T extends { options: ProductVariantOption[]; availability: Availability[] }>(
  structureOptionValueIdentifier: string,
  selectedOptions: SelectedOptions | null,
  variants: T[],
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null,
  isPackage: boolean
) => {
  if (selectedOptions) {
    // if we have an option selection on a type other than structure
    const otherOptionSelected = selectedOptions[OptionType.Color] || selectedOptions[OptionType.Material];
    let associatedOptionProductVariant;
    if (otherOptionSelected) {
      associatedOptionProductVariant = variants.find((variant) => {
        const structureOption = variant.options.find((option) => option.type === OptionType.Structure);
        const otherOption = variant.options.find((option) =>
          selectedOptions[OptionType.Color] ? option.type === OptionType.Color : option.type === OptionType.Material
        );
        return (
          structureOption?.valueIdentifier === structureOptionValueIdentifier &&
          otherOption?.valueIdentifier === otherOptionSelected.identifier
        );
      });
    } else {
      associatedOptionProductVariant = variants.find(
        (variant) => variant.options[0].valueIdentifier === structureOptionValueIdentifier
      );
    }
    return associatedOptionProductVariant
      ? determineStatus(associatedOptionProductVariant, deliveryAreaIdentifier, isPackage)
      : '';
  }
  return '';
};

const StructureOptionsDropdown = ({
  variants,
  structureOption,
  selectedVariant,
  selectedOptions,
  deliveryAreaIdentifier,
  handleOptionSelect,
  isPackage
}: Props) => {
  // if there is no structure option for this product or
  // if there is only a single structure option we don't need to
  // provide a way to make that selection
  if (!variants || !structureOption || !selectedOptions || structureOption.values.length === 1) {
    return null;
  }

  const selectedStructureOption = selectedOptions[OptionType.Structure];

  return (
    <Dropdown
      id="dropdown-custom-options"
      key="options"
      title={`${selectedStructureOption?.name} ${
        determineStatus(selectedVariant, deliveryAreaIdentifier, isPackage) || ''
      }`}
      onSelect={handleOptionSelect}
      css={css`
        width: ${isPackage ? '100%' : '60%'};
        height: 51px;
        border: 1px solid ${SHADES.SHADE_LIGHTER};
        border-top: 0;
        ${!isPackage && 'border-right: 0;'}

        .dropdown-menu {
          background-color: ${BRAND.BACKGROUND};
          outline: 1px solid ${SHADES.SHADE_LIGHTER};
        }
      `}
    >
      {structureOption.values.length > 0 &&
        structureOption.values.map((value: IdName) => (
          <MenuItem eventKey={{ identifier: value.identifier, name: value.name }} key={value.name}>
            {value.name}
            {determineOptionStatus(value.identifier, selectedOptions, variants, deliveryAreaIdentifier, isPackage)}
          </MenuItem>
        ))}
    </Dropdown>
  );
};

export default StructureOptionsDropdown;
