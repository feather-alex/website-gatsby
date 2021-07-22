import { DeliveryAreaIdentifier } from "../../../../app/store/plan/plan.types";
import {
  FullProductDetails,
  ProductForListing,
} from "../../../../types/Product";

export const makeMockProductForListing = (num: number): ProductForListing => ({
  title: "Athene chair",
  identifier: `athene-chair-${num}`,
  brand: {
    identifier: "feather",
    name: "Feather",
  },
  categories: [
    {
      identifier: "living-room",
      name: "Living room",
    },
    {
      identifier: "dining-room",
      name: "Dining room",
    },
  ],
  subclass: { identifier: "chair", name: "Chair" },
  variants: [
    {
      identifier: "default",
      retailPrice: 79,
      rentalPrices: {
        "3": 14,
        "12": 4,
      },
      availability: [
        {
          deliveryArea: DeliveryAreaIdentifier.SF,
          isEnabled: true,
          isInStock: true,
          stockExpectedDate: null,
        },
        {
          deliveryArea: DeliveryAreaIdentifier.NY,
          isEnabled: true,
          isInStock: true,
          stockExpectedDate: null,
        },
        {
          deliveryArea: DeliveryAreaIdentifier.LA,
          isEnabled: true,
          isInStock: true,
          stockExpectedDate: null,
        },
      ],
      options: [],
      listingImage: {
        mobile:
          "https://img.livefeather.com/products/athene-chair/images/x6215-main-desktop.jpg",
        desktop:
          "https://img.livefeather.com/products/athene-chair/images/x6215-main-desktop.jpg",
      },
      swatchImage: {
        mobile: null,
        desktop: null,
      },
    },
  ],
  options: [],
});

const testProduct: FullProductDetails = {
  title: "Athene chair",
  identifier: "athene-chair",
  description:
    "A design icon. The Athene Chair features a simple, contoured shape that's supported by solid wood Eiffel legs with a black coated steel assembly. The top is connected to the base by rubber shock mounts, which adds to the chair's legendary comfort.",
  "3dAssetId": null,
  brand: {
    identifier: "feather",
    name: "Feather",
    image: {
      mobile: null,
      desktop: null,
    },
  },
  lifestyle: {
    summary:
      "The versatility. This chair can be used in the living room, dining room, or office.",
    image: {
      mobile: null,
      desktop: null,
    },
  },
  materials: ["Plastic", "Wood"],
  categories: [
    {
      identifier: "living-room",
      name: "Living room",
    },
    {
      identifier: "dining-room",
      name: "Dining room",
    },
  ],
  subclass: { identifier: "chair", name: "Chair" },
  styles: [
    {
      identifier: "contemporary",
      name: "Contemporary",
    },
    {
      identifier: "mid-century",
      name: "Mid-Century",
    },
    {
      identifier: "scandinavian",
      name: "Scandinavian",
    },
  ],
  variants: [
    {
      identifier: "default",
      retailPrice: 79,
      rentalPrices: {
        "3": 14,
        "12": 4,
      },
      availability: [
        {
          deliveryArea: DeliveryAreaIdentifier.SF,
          isEnabled: true,
          isInStock: true,
          stockExpectedDate: null,
        },
        {
          deliveryArea: DeliveryAreaIdentifier.NY,
          isEnabled: true,
          isInStock: true,
          stockExpectedDate: null,
        },
        {
          deliveryArea: DeliveryAreaIdentifier.LA,
          isEnabled: true,
          isInStock: true,
          stockExpectedDate: null,
        },
      ],
      options: [],
      mainImage: {
        mobile:
          "https://img.livefeather.com/products/athene-chair/images/x6215-main-desktop.jpg",
        desktop:
          "https://img.livefeather.com/products/athene-chair/images/x6215-main-desktop.jpg",
      },
      detailImages: [
        {
          mobile:
            "https://img.livefeather.com/products/athene-chair/images/x6215-detail-desktop.jpg",
          desktop:
            "https://img.livefeather.com/products/athene-chair/images/x6215-detail-desktop.jpg",
        },
      ],
      otherImages: [
        {
          mobile:
            "https://img.livefeather.com/products/athene-chair/images/x6215-other-01-desktop.jpg",
          desktop:
            "https://img.livefeather.com/products/athene-chair/images/x6215-other-01-desktop.jpg",
        },
        {
          mobile:
            "https://img.livefeather.com/products/athene-chair/images/x6215-other-02-desktop.jpg",
          desktop:
            "https://img.livefeather.com/products/athene-chair/images/x6215-other-02-desktop.jpg",
        },
        {
          mobile:
            "https://img.livefeather.com/products/athene-chair/images/x6215-other-03-desktop.jpg",
          desktop:
            "https://img.livefeather.com/products/athene-chair/images/x6215-other-03-desktop.jpg",
        },
      ],
      swatchImage: {
        mobile: null,
        desktop: null,
      },
      sceneImages: [
        {
          mobile: null,
          desktop: null,
        },
      ],
      dimensions: {
        width: '18"',
        height: '33"',
        length: '17.5"',
        image: {
          mobile:
            "https://img.livefeather.com/products/athene-chair/images/x6215-dimensions-desktop.png",
          desktop:
            "https://img.livefeather.com/products/athene-chair/images/x6215-dimensions-desktop.png",
        },
        weight: null,
      },
    },
  ],
  options: [],
  availability: [
    {
      deliveryArea: DeliveryAreaIdentifier.SF,
      isEnabled: true,
      isInStock: true,
      stockExpectedDate: null,
    },
    {
      deliveryArea: DeliveryAreaIdentifier.NY,
      isEnabled: true,
      isInStock: true,
      stockExpectedDate: null,
    },
    {
      deliveryArea: DeliveryAreaIdentifier.LA,
      isEnabled: true,
      isInStock: true,
      stockExpectedDate: null,
    },
  ],
};

export default testProduct;
