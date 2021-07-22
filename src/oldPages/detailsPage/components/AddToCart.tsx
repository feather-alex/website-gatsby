/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { Fragment } from "react";
import { connect } from "react-redux";

import { CartItem } from "../../cart/store/cart.types";
import {
  addToCart,
  AddToCart as AddToCartActionType,
} from "../../cart/store/cart.actions";
import Analytics from "../../../analytics/analytics";
import { CART } from "../../../analytics/cart/events";
import { getIsMobileBreakpoint } from "../../../app/store/dimensions/dimensions.selectors";
import { resetPlan } from "../../../app/store/plan/plan.actions";
import {
  getMembershipState,
  getDeliveryAreaIdentifier,
  getDeliveryZipCode,
  getIsInDeliveryZone,
} from "../../../app/store/plan/plan.selectors";
import { ActionCreator } from "../../../types/FluxStandardActions";
import {
  ProductOption,
  ProductBrand,
  IdName,
  ProductVariant,
  Image,
  Availability,
  OptionType,
} from "../../../types/Product";
import { PackageVariant, PkgItem } from "../../../types/Package";
import { State as GlobalState } from "../../../types/ReduxState";
import Button, { ButtonStyle } from "../../../ui/buttons/Button";
import Subheader1 from "../../../ui/subheaders/Subheader1";
import Popover from "../../../ui/miscellaneous/Popover";
import Title1 from "../../../ui/titles/Title1";
import Title3 from "../../../ui/titles/Title3";
import { BRAND, SHADES } from "../../../ui/variables";
import * as utils from "../../../utils";

import HandleQuantity from "./HandleQuantity";
import StructureOptionsDropdown from "./StructureOptionsDropdown";
import MembershipSelectedOverlay from "./MembershipSelectedOverlay";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../../app/store/plan/plan.types";
import {
  formatPkgCartItem,
  formatAddedPkgData,
  getPackageStatus,
  sortOptions,
} from "../detailsPage.service";
import PackageItemsList from "./packages/PackageItemsList";
import { getCartUuid } from "../../cart/store/cart.selectors";
import { addPackagePayloadMapping } from "../../../analytics/cart/payload-mappings";
import {
  SelectedOptions,
  SelectedOption,
} from "../store/productDetails/product.types";
import ColorOptionsSelection from "./ColorOptionsSelection";
import Paragraph2 from "../../../ui/paragraphs/Paragraph2";
import BackInStockInfo from "./BackInStockInfo";

export const FlexLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
`;

interface StateProps {
  isMobileBreakpoint: boolean;
  membershipState: MembershipState;
  zipcode: string | null;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  isInDeliveryZone: boolean | null;
  cartUuid: string;
}

interface DispatchProps {
  resetPlanAction: ActionCreator;
  addToCart: AddToCartActionType;
}

interface OwnProps {
  isQuizResults?: boolean;
  isPackage: boolean;
  identifier: string;
  title: string;
  brand?: ProductBrand;
  options?: ProductOption[];
  variants?: ProductVariant[] | PackageVariant[];
  retailPrice: number;
  memberRentalPrice: number;
  nonMemberRentalPrice: number;
  availability: Availability[] | null;
  mainImage: Image;
  categories: IdName[];
  selectedItems?: PkgItem[];
  selectedItemsQuantity?: { [id: string]: number };
  selectedOptions: SelectedOptions;
  selectedVariant: ProductVariant | PackageVariant | null;
  handleOptionSelect?: (
    optionType: OptionType
  ) => (selection: SelectedOption) => void;
  handleSelectedItemsQuantity?: (
    identifier: string
  ) => (itemsQuantity: number) => void;
  handleResetPackage?: () => void;
  packageHasChanged?: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
  quantity: number;
  successfullyAddedToCart: boolean;
}

class AddToCart extends React.Component<Props, State> {
  public readonly state = {
    quantity: 1,
    successfullyAddedToCart: false,
  };

  handleAddQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  handleRemoveQuantity = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 1,
    }));
  };

  handleAddToCart = () => {
    const {
      title,
      brand,
      isPackage,
      identifier,
      categories,
      mainImage,
      selectedItems,
      selectedItemsQuantity,
      selectedVariant,
      membershipState,
      deliveryAreaIdentifier,
      isQuizResults,
      cartUuid,
    } = this.props;

    const { quantity } = this.state;

    if (isQuizResults && selectedItems && selectedItemsQuantity) {
      selectedItems.forEach((item) => {
        const cartItem = formatPkgCartItem(
          item,
          membershipState,
          deliveryAreaIdentifier,
          identifier,
          selectedItemsQuantity[item.identifier]
        );

        this.props.addToCart(cartItem);
      });
    } else {
      // We want to make sure a variant has been selected even if we
      // shouldn't be able to click on `Add to cart` if it's not the case
      if (selectedVariant) {
        // Are we on a package details page?
        if (isPackage && selectedItems && selectedItemsQuantity) {
          // We want to track all the updates we made to the package
          // before adding it to the cart:
          Analytics.trackEvent(
            CART.PACKAGE_ADDED,
            addPackagePayloadMapping(
              formatAddedPkgData(
                identifier,
                selectedVariant.identifier,
                selectedItems,
                selectedItemsQuantity,
                deliveryAreaIdentifier,
                membershipState,
                cartUuid
              )
            )
          );

          selectedItems.forEach((item) => {
            // We want to make sure we only add to the cart items that are in stock and enabled
            if (
              utils.isInStock(deliveryAreaIdentifier, item.availability) &&
              utils.isEnabled(deliveryAreaIdentifier, item.availability)
            ) {
              const cartItem = formatPkgCartItem(
                item,
                membershipState,
                deliveryAreaIdentifier,
                identifier,
                selectedItemsQuantity[item.identifier],
                selectedVariant
              );

              this.props.addToCart(cartItem);
            }
          });

          // or a product details page?
        } else {
          let cartImage: Image = selectedVariant.mainImage;

          if (!cartImage.mobile && !cartImage.desktop) {
            cartImage = mainImage;
          }

          const cartItem: CartItem = {
            type: "product",
            title,
            brand: brand ? brand.name : "",
            categories,
            identifier,
            quantity,
            variantIdentifier: selectedVariant.identifier,
            variantName: selectedVariant.options
              .filter((option) => option.type !== OptionType.Material)
              .sort(sortOptions)
              .map((option) => option.valueName)
              .join(", "),
            rentalPrices: selectedVariant.rentalPrices,
            image: cartImage,
            rentalLength: membershipState === MembershipState.MEMBER ? 12 : 3,
            location: deliveryAreaIdentifier,
            availability: selectedVariant.availability,
          };

          this.props.addToCart(cartItem);
        }
      }
    }
    // Update local state to reflect a successful addition.
    this.setState({ successfullyAddedToCart: true });

    // Reset local state (resets Add To Cart button text).
    setTimeout(() => this.setState({ successfullyAddedToCart: false }), 1500);
  };

  renderButton = () => {
    const { successfullyAddedToCart } = this.state;
    const {
      deliveryAreaIdentifier,
      availability,
      isInDeliveryZone,
      selectedItems,
      isQuizResults,
      isPackage,
    } = this.props;

    // This component is being used for individual items but also package details
    // pages and quiz results, so we want to check the stock/enabled status correctly
    // depending on what kind of product we are on
    // Quiz results always return in stock items (and items do not have availability info)
    const isEnabled = isPackage
      ? isQuizResults ||
        getPackageStatus(deliveryAreaIdentifier, selectedItems, "isEnabled")
      : utils.isEnabled(deliveryAreaIdentifier, availability);

    const isInStock = isPackage
      ? isQuizResults ||
        getPackageStatus(deliveryAreaIdentifier, selectedItems, "isInStock")
      : utils.isInStock(deliveryAreaIdentifier, availability);

    if (successfullyAddedToCart) {
      return <Button>Added!</Button>;
    } else if (!isEnabled || !isInStock) {
      return <Button isDisabled={true}>Out of stock</Button>;
    } else if (!isInDeliveryZone) {
      return (
        <Button dataCy="outside-zone" isDisabled={true}>
          Outside delivery zone
        </Button>
      );
    }

    return (
      <Button dataCy="add-to-cart" onClick={this.handleAddToCart}>
        Add to cart
      </Button>
    );
  };

  render() {
    const {
      variants,
      options,
      zipcode,
      retailPrice,
      selectedOptions,
      selectedVariant,
      resetPlanAction,
      memberRentalPrice,
      isMobileBreakpoint,
      membershipState,
      nonMemberRentalPrice,
      deliveryAreaIdentifier,
      handleOptionSelect,
      handleSelectedItemsQuantity,
      handleResetPackage,
      packageHasChanged,
      selectedItems,
      selectedItemsQuantity,
      isQuizResults,
      isPackage,
      availability,
    } = this.props;

    const { quantity } = this.state;

    const structureOption =
      options && options.find((option) => option.type === OptionType.Structure);
    const otherOptions =
      options &&
      options.filter(
        (option) =>
          option.type === OptionType.Material ||
          option.type === OptionType.Color
      );

    return (
      <Fragment>
        <MembershipSelectedOverlay />
        <div
          css={css`
            height: 51px;
            padding: 0 16px;
            border: 1px solid ${SHADES.SHADE_LIGHTER};
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Title1 dataCy="product-details-plan-title">
            {`
              ${
                membershipState === MembershipState.MEMBER
                  ? "Annual Member"
                  : "Short-Term Plan"
              }
              ${zipcode ? `: ${zipcode}` : ""}
            `}
          </Title1>
          <Button style={ButtonStyle.COMPACT_TEXT} onClick={resetPlanAction}>
            Change plan
          </Button>
        </div>

        <div
          css={css`
            display: flex;
            margin-bottom: 5px;
          `}
        >
          <StructureOptionsDropdown
            isPackage={isPackage}
            variants={variants}
            structureOption={structureOption}
            selectedVariant={selectedVariant}
            selectedOptions={selectedOptions}
            handleOptionSelect={
              handleOptionSelect && handleOptionSelect(OptionType.Structure)
            }
            deliveryAreaIdentifier={deliveryAreaIdentifier}
          />
          {!isPackage && (
            <HandleQuantity
              quantity={quantity}
              handleAddQuantity={this.handleAddQuantity}
              handleRemoveQuantity={this.handleRemoveQuantity}
            />
          )}
        </div>
        <ColorOptionsSelection
          selectedOptions={selectedOptions}
          variants={variants as ProductVariant[]} // currently packages do not support color option selection so we can safely assume variant type here
          options={otherOptions}
          handleOptionSelect={
            handleOptionSelect && handleOptionSelect(OptionType.Color)
          }
        />
        {selectedItems && selectedItemsQuantity && handleSelectedItemsQuantity && (
          <section>
            <div
              css={css`
                display: flex;
                ${packageHasChanged ? "justify-content: space-between;" : ""}
                margin: 32px 0 0;
              `}
            >
              <Title1 isBold={true}>This package includes:</Title1>
              {packageHasChanged && (
                <Button
                  dataCy="reset-package-button"
                  style={ButtonStyle.COMPACT_TEXT}
                  onClick={handleResetPackage}
                >
                  Reset package
                </Button>
              )}
            </div>

            <PackageItemsList
              items={selectedItems}
              membershipState={membershipState}
              isQuizResults={isQuizResults}
              selectedItemsQuantity={selectedItemsQuantity}
              handleSelectedItemsQuantity={handleSelectedItemsQuantity}
            />
            <div
              css={css`
                height: 1px;
                margin: 32px 0;
                background-color: ${BRAND.ACCENT};
              `}
            />
          </section>
        )}
        <FlexLine>
          <Subheader1 dataCy="price-per-month">{`$${
            membershipState === MembershipState.MEMBER
              ? memberRentalPrice
              : nonMemberRentalPrice
          }/mo`}</Subheader1>
          {this.renderButton()}
        </FlexLine>

        {!isPackage && (
          <BackInStockInfo
            deliveryAreaIdentifier={deliveryAreaIdentifier}
            availability={availability}
          />
        )}

        <FlexLine
          css={css`
            ${isMobileBreakpoint ? "& p { font-size: 14px; }" : ""}
          `}
        >
          <Paragraph2
            color={BRAND.SECONDARY_TEXT}
          >{`Retail: $${retailPrice.toLocaleString()}`}</Paragraph2>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Paragraph2 color={BRAND.SECONDARY_TEXT}>
              Payments go toward ownership
            </Paragraph2>
            <Popover
              isMobileBreakpoint={isMobileBreakpoint}
              isIconInverted={true}
            >
              <Title3 color={BRAND.SECONDARY_TEXT}>
                We’ll apply your monthly payments towards the retail price if
                you choose to own.
              </Title3>
            </Popover>
          </div>
        </FlexLine>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  isMobileBreakpoint: getIsMobileBreakpoint(state),
  membershipState: getMembershipState(state),
  deliveryAreaIdentifier: getDeliveryAreaIdentifier(state),
  zipcode: getDeliveryZipCode(state),
  isInDeliveryZone: getIsInDeliveryZone(state),
  cartUuid: getCartUuid(state),
});

const mapDispatchToProps: DispatchProps = {
  resetPlanAction: resetPlan,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
