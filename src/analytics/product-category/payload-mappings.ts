import {
  ProductForListing,
  ProductListRequest,
  VariantDetails,
} from "../../types/Product";
import { AnalyticsProductFormatted } from "../types";

export const clickCategoryProductPayloadMapping = ({
  productBrand,
  productIdentifier,
}: {
  productBrand: string;
  productIdentifier: string;
}) => ({
  product_clicked_brand: productBrand,
  product_clicked_identifier: productIdentifier,
});

type ProductClickedPayloadInput = {
  product: ProductForListing;
  variant: VariantDetails;
  featherPrice: number;
  variantLink: string;
  productListIndex: number;
};

type ProductClickedPayloadOutput = AnalyticsProductFormatted;

export const productClickedPayloadMapping = ({
  product,
  variant,
  featherPrice,
  variantLink,
  productListIndex,
}: ProductClickedPayloadInput): ProductClickedPayloadOutput => ({
  product_id: product.identifier,
  sku: product.identifier,
  category: product.categories[0].identifier,
  name: product.title,
  brand: product.brand.identifier,
  variant: variant.identifier,
  price: featherPrice,
  quantity: 1,
  position: productListIndex + 1,
  url: `${window.location.origin}${variantLink}`,
  image_url: `${
    variant.listingImage.desktop || variant.listingImage.mobile
  }?auto=compress,format`,
});

const convertProducts =
  (category: string) =>
  (
    { identifier, title, variants, brand }: ProductForListing,
    index: number
  ): AnalyticsProductFormatted => ({
    product_id: identifier,
    sku: identifier,
    brand: brand.identifier,
    variant: variants[0].identifier,
    quantity: 1,
    name: title,
    price: variants[0].rentalPrices[12],
    position: index,
    category,
    url: `${window.location.origin}/products/${identifier}`,
    image_url: `${variants[0].listingImage.desktop}?auto=compress,format` || "",
  });

export const filterListPayloadMapping = ({
  body,
  products,
}: {
  body: ProductListRequest;
  products: ProductForListing[];
}) => ({
  list_id: `products - ${body.categories[0]}`,
  category: body.categories[0],
  filters: [
    ...body.filter.brands.map((brand) => ({ type: "brand", value: brand })),
    ...body.filter.classes.map((className) => ({
      type: "class",
      value: className,
    })),
    ...body.filter.subclasses.map((subclass) => ({
      type: "subclass",
      value: subclass,
    })),
  ],
  sorts: [
    {
      type: body.sort,
      value: body.order,
    },
  ],
  products: products.map(convertProducts(body.categories[0])),
});

export const categoryPageViewedPayloadMapping = ({
  listId,
  selectedCategory: category,
  products,
}: {
  listId: string;
  selectedCategory: string;
  products: ProductForListing[];
}) => ({
  list_id: `${listId} - ${category}`,
  category,
  products: products.map(convertProducts(category)),
});

export const removeOrAddFilterPayloadMapping = ({
  filterClicked,
}: {
  filterClicked: string;
}) => ({
  filter_clicked: filterClicked,
});

export const openOrCloseFiltersPayloadMapping = ({
  filters,
}: {
  filters: string;
}) => ({
  filter_category: filters,
});
