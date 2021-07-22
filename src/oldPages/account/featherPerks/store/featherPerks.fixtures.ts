import {
  FeatherPerksRequestPayload,
  FeatherPerksSuccessPayload,
  FeatherPerksContent,
} from "./featherPerks.types";
import { APIError } from "../../../../api/error";

export const mockRequestPayload: FeatherPerksRequestPayload = {
  id: "ID",
};

export const mockSuccessPayload: FeatherPerksSuccessPayload = {
  perks: [
    {
      name: "brand",
      logo: "url",
      website: "url",
      discount: "10% off",
      imageUrl: "url",
      caption: "caption",
    },
  ],
};

export const mockError: APIError = {
  name: "sad lil fail boi",
  error: "sad lil fail boi",
  status: 404,
  message: "it works on my computer",
};

export const mockContentfulPerk = {
  name: "brand",
  logo: "url",
  website: "url",
  discount: "10% off",
  imageUrl: "url",
  caption: {
    data: {},
    nodeType: "document",
    content: [
      {
        data: {},
        marks: [],
        nodeType: "text",
        value: "caption",
      },
    ],
  },
};

export const mockContentfulResponse = {
  items: [
    {
      fields: {
        perks: [{ fields: mockContentfulPerk }],
      },
    },
  ],
} as object as FeatherPerksContent;
