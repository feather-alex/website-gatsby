/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  FullPackageDetails,
  PkgItem,
  PackageVariant,
} from "../../types/Package";
import { Option } from "./DetailsPageInfo";
import {
  FullProductDetails,
  ProductVariant,
  Image,
  OptionType,
  ProductVariantOption,
  IdentifierAndName,
} from "../../types/Product";
import { SelectedOptions } from "./store/productDetails/product.types";
import {
  DeliveryAreaIdentifier,
  MembershipState,
} from "../../app/store/plan/plan.types";
import { CartItem, CartPkgItem, CartPkg } from "../cart/store/cart.types";
import { isInStock } from "../../utils";
import { Fragment } from "react";

// TODO v4: add compression params? --> `?auto=compress&q=65`
/**
 * Returns image url that corresponds to user device, or falls-back to other device image url
 */
export const getImageSrc = (isMobileBreakpoint: boolean, image: Image) => {
  return isMobileBreakpoint
    ? image.mobile || image.desktop
    : image.desktop || image.mobile;
};

export interface ImagesUrls {
  url: string;
  zoomUrl?: string | null;
}

/**
 * Returns array of ImagesUrls where urls corresponds to user device,
 * or falls-back to other device image urls.
 * First element is package 'lifestyleImage'
 */
export const getImageSrcArray = (
  isMobileBreakpoint: boolean,
  lifestyleImage: Image,
  otherImages: Image[],
  detailImages: Image[],
  sceneImages: Image[]
) => {
  const imageSrcArray: ImagesUrls[] = [];
  const lifestyleImageSrc = getImageSrc(isMobileBreakpoint, lifestyleImage);
  if (lifestyleImageSrc) {
    imageSrcArray.push({
      url: lifestyleImageSrc,
      zoomUrl: lifestyleImage.zoom,
    });
  }

  otherImages.forEach((otherImage) => {
    const otherImageSrc = getImageSrc(isMobileBreakpoint, otherImage);
    if (otherImageSrc) {
      imageSrcArray.push({
        url: otherImageSrc,
        zoomUrl: otherImage.zoom,
      });
    }
  });

  detailImages.forEach((detailImage) => {
    const detailImageSrc = getImageSrc(isMobileBreakpoint, detailImage);
    if (detailImageSrc) {
      imageSrcArray.push({
        url: detailImageSrc,
        zoomUrl: detailImage.zoom,
      });
    }
  });

  sceneImages.forEach((sceneImage) => {
    const sceneImageSrc = getImageSrc(isMobileBreakpoint, sceneImage);
    if (sceneImageSrc) {
      imageSrcArray.push({
        url: sceneImageSrc,
      });
    }
  });

  return imageSrcArray;
};

/**
 * Returns array of image urls specifcially for the desktop carousel
 * where due to design consideration and nuka-carousel functionality
 * we use an array that is repeated to avoid a "flicker" on next slide load
 */
export const getDesktopImageSrcArray = (imageSrcArray: ImagesUrls[]) => {
  if (imageSrcArray.length > 3) {
    return imageSrcArray;
  } else {
    return [...imageSrcArray, ...imageSrcArray];
  }
};

interface Prices {
  memberRentalPrice: number;
  nonMemberRentalPrice: number;
  retailPrice: number;
}

/**
 * Iterates through 'selectedItems' and returns prices object with
 * properties for calculated totals:
 * 'memberRentalPrice', 'nonMemberRentalPrice', and 'retailPrice'
 */
export const getPackagePrices = (
  selectedItems: PkgItem[],
  selectedItemsQuantity?: { [id: string]: number }
): Prices => {
  const initialPackagePrices: Prices = {
    memberRentalPrice: 0,
    nonMemberRentalPrice: 0,
    retailPrice: 0,
  };

  return selectedItems.reduce((total: Prices, packageItem) => {
    const quantity = selectedItemsQuantity
      ? selectedItemsQuantity[packageItem.identifier]
      : 1;
    total.memberRentalPrice += packageItem.rentalPrices[12] * quantity;
    total.nonMemberRentalPrice += packageItem.rentalPrices[3] * quantity;
    total.retailPrice += packageItem.retailPrice * quantity;

    return total;
  }, initialPackagePrices);
};

const getVariantIdentifier = (selectedOption: Option) => {
  for (const [optionKey, optionValue] of Object.entries(selectedOption)) {
    if (optionKey && optionValue) {
      return `${optionKey}-${optionValue}`;
    }
  }
  return "default";
};

const findSelectedVariant = <
  T extends { variants: U[] },
  U extends { identifier: string }
>(
  selectedVariantIdentifier: string,
  data: T
): U | null => {
  for (let i = 0; i < data.variants.length; i++) {
    const currentVariant = data.variants[i];
    if (
      currentVariant.identifier === selectedVariantIdentifier ||
      currentVariant.identifier === "default"
    ) {
      return currentVariant;
    }
  }
  return null;
};

/**
 * Take 'selectedOption', return associated package variant object
 */
export const getSelectedVariant = <
  T extends { variants: U[] },
  U extends { identifier: string }
>(
  selectedOption: Option,
  data: T
): U | null => {
  const variantIdentifier = getVariantIdentifier(selectedOption);
  return variantIdentifier.length
    ? findSelectedVariant(variantIdentifier, data)
    : null;
};

/**
 * Take key and value strings; return key-value pair object
 */
export const getSelectedOption = (optionKey: string, optionValue: string) => {
  return { [optionKey]: optionValue };
};

export const determineSelectedVariant = (
  selectedOptions: SelectedOptions,
  variants: ProductVariant[]
): ProductVariant | undefined => {
  return variants.find((variant) => {
    // check to see whether the variant options match our initial option selections
    const isSelectedVariant = variant.options.every(
      (variantOption) =>
        selectedOptions[variantOption.type]?.identifier ===
        variantOption.valueIdentifier
    );
    return isSelectedVariant;
  });
};

export const getInitialSelectedOptions = (
  data: FullProductDetails | FullPackageDetails
): SelectedOptions => {
  const initialSelectedOptions: SelectedOptions = {
    [OptionType.Color]: null,
    [OptionType.Material]: null,
    [OptionType.Structure]: null,
  };
  data.options.forEach((option) => {
    initialSelectedOptions[option.type] = {
      identifier: option.values[0].identifier,
      name: option.values[0].name,
    };
  });
  return initialSelectedOptions;
};

export const getOptionsFromVariant = (
  data?: ProductVariant
): SelectedOptions => {
  const initialSelectedOptions: SelectedOptions = {
    [OptionType.Color]: null,
    [OptionType.Material]: null,
    [OptionType.Structure]: null,
  };
  if (data) {
    data.options.forEach((option) => {
      initialSelectedOptions[option.type] = {
        identifier: option.valueIdentifier,
        name: option.valueName,
      };
    });
  }
  return initialSelectedOptions;
};

export const getInitialSelections = (
  data: FullProductDetails,
  initialVariantIdentifier?: string
): { selectedOptions: SelectedOptions; selectedVariant?: ProductVariant } => {
  if (initialVariantIdentifier) {
    // if for whatever reason we can't find a variant by the provided identifier
    // then let's fallback to the first enabled variant for the product
    const selectedVariant =
      data.variants.find(
        (variant) => variant.identifier === initialVariantIdentifier
      ) ||
      data.variants.find((variant) =>
        variant.availability.some((va) => va.isEnabled)
      );
    const selectedOptions = getOptionsFromVariant(selectedVariant);
    return {
      selectedOptions,
      selectedVariant,
    };
  }
  const initialSelectedOptions = getInitialSelectedOptions(data);
  return {
    selectedOptions: initialSelectedOptions,
    selectedVariant: determineSelectedVariant(
      initialSelectedOptions,
      data.variants
    ),
  };
};

export const determineSelectedPackageVariant = (
  selectedOptions: SelectedOptions,
  variants: PackageVariant[]
): PackageVariant | undefined => {
  return variants.find((variant) =>
    variant.options.every(
      (variantOption) =>
        selectedOptions[variantOption.type]?.identifier ===
        variantOption.valueIdentifier
    )
  );
};

/* Use 'selectedOption' to look up associated package variant and
 * return array of all included items (and their properties).
 */
export const getSelectedItemsArray = (
  selectedOptions: SelectedOptions,
  data: FullPackageDetails
) => {
  const selectedVariant = determineSelectedPackageVariant(
    selectedOptions,
    data.variants
  );
  return (selectedVariant && selectedVariant.items) || [];
};

/**
 * Array of all items (and their properties) included with package variant that corresponds to initial selected option.
 */
export const getInitialSelectedItems = (data: FullPackageDetails) => {
  const intialSelectedOption = getInitialSelectedOptions(data);
  return getSelectedItemsArray(intialSelectedOption, data);
};

/**
 * Return prices for initially displayed package variant
 */
export const getInitialPackagePrices = (data: FullPackageDetails) => {
  const initialSelectedItems = getInitialSelectedItems(data);
  return getPackagePrices(initialSelectedItems);
};

export const sortOptions = (
  a: ProductVariantOption,
  b: ProductVariantOption
) => {
  // They are the same type
  if (a.type === b.type) {
    return 0;
  }
  // Structure always goes first
  if (a.type === OptionType.Structure) {
    return -1;
  }
  // then color
  if (a.type === OptionType.Color && b.type === OptionType.Material) {
    return -1;
  }
  // material goes last
  return 1;
};

/**
 * Return item's data into a CartItem to use for the addToCart action
 */
export const formatPkgCartItem = (
  item: PkgItem,
  membershipState: MembershipState,
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null,
  identifier: string,
  quantity: number,
  selectedVariant?: PackageVariant | ProductVariant
): CartItem => ({
  type: "product-of-bundle",
  title: item.title,
  brand: item.brand.name,
  categories: undefined,
  identifier: item.identifier,
  quantity,
  variantIdentifier: item.variantIdentifier,
  variantName: item.options
    .filter((option) => option.type !== OptionType.Material)
    .sort(sortOptions)
    .map((option) => option.valueName)
    .join(", "),
  rentalPrices: item.rentalPrices,
  image: item.image,
  rentalLength: membershipState === MembershipState.MEMBER ? 12 : 3,
  location: deliveryAreaIdentifier,
  availability: item.availability,
  bundleVariantIdentifier: selectedVariant
    ? selectedVariant.identifier
    : undefined,
  bundleIdentifier: identifier,
});

/**
 * Return package's data used as payload for the 'Package Added to Cart' event
 */
export const formatAddedPkgData = (
  identifier: string,
  selectedVariantIdentifier: string,
  selectedItems: PkgItem[],
  selectedItemsQuantity: { [key: string]: number },
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null,
  membershipState: MembershipState,
  cartUuid: string
): CartPkg => {
  const rentalLength = membershipState === MembershipState.MEMBER ? 12 : 3;
  let retailPrice = 0;
  let monthlyPrice = 0;
  const itemsOOS: string[] = [];
  const itemsAdded: CartPkgItem[] = [];
  const itemsRemoved: string[] = [];

  selectedItems.forEach((item) => {
    if (
      isInStock(deliveryAreaIdentifier, item.availability) &&
      selectedItemsQuantity[item.identifier] > 0
    ) {
      const currentItem = {
        identifier: item.identifier,
        variantIdentifier: item.variantIdentifier,
        quantity: selectedItemsQuantity[item.identifier],
        monthlyPrice: item.rentalPrices[rentalLength],
      };

      retailPrice += item.retailPrice;
      monthlyPrice += item.rentalPrices[rentalLength];

      itemsAdded.push(currentItem);
    } else if (selectedItemsQuantity[item.identifier] === 0) {
      itemsRemoved.push(item.identifier);
    } else {
      itemsOOS.push(item.identifier);
    }
  });

  return {
    packageIdentifier: identifier,
    packageVariantIdentifier: selectedVariantIdentifier,
    itemsRemoved,
    itemsOOS,
    itemsAdded,
    retailPrice,
    monthlyPrice,
    cartUuid,
  };
};

/**
 * Get stock/enabled status of a package
 * If at least one item is in stock/enabled, the package is too
 */

export const getPackageStatus = (
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null,
  selectedItems: PkgItem[] | undefined,
  statusToCheck: "isInStock" | "isEnabled"
): boolean => {
  if (deliveryAreaIdentifier === null) {
    return true;
  }

  if (!selectedItems) {
    return false;
  }

  return selectedItems.some((item) =>
    item.availability.some(
      (detail) =>
        detail.deliveryArea === deliveryAreaIdentifier && detail[statusToCheck]
    )
  );
};

interface UniqueItemsData {
  uniqueItems: PkgItem[];
  uniqueItemsQuantity: { [id: string]: number };
}

/**
 * Get unique items, if an Item appears more than once its consolidated and the quanity increases
 */
export const getUniqueItemsData = (items: PkgItem[]): UniqueItemsData => {
  return items.reduce(
    (uniqueItemsData: UniqueItemsData, item) => {
      if (item.identifier in uniqueItemsData.uniqueItemsQuantity) {
        uniqueItemsData.uniqueItemsQuantity[item.identifier] += 1;
      } else {
        uniqueItemsData.uniqueItems.push(item);
        uniqueItemsData.uniqueItemsQuantity[item.identifier] = 1;
      }

      return uniqueItemsData;
    },
    { uniqueItems: [], uniqueItemsQuantity: {} }
  );
};

export const getCustomDetails = (
  categories: IdentifierAndName[],
  identifier: string
) => {
  return categories.some(({ name }) => name === "Eqpt")
    ? [
        {
          header: "Access to curated soft goods & accessories",
          description: (
            <Fragment>
              Feather &amp; Eqpt have partnered to bring you the full furnished
              experience. Go beyond furniture with our curated{" "}
              <a
                href={
                  identifier.startsWith("marfa-two-bedrooms")
                    ? "https://img.livefeather.com/bundles/marfa-two-bedrooms/Marfa+2+Bedroom.pdf"
                    : "https://img.livefeather.com/bundles/marfa-one-bedroom/Marfa+1+Bedroom.pdf"
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                soft goods &amp; accessories bundle.
              </a>{" "}
              Once you checkout with your furniture package, a member of our
              team will follow up with more details.
            </Fragment>
          ),
        },
      ]
    : undefined;
};
