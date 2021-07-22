import {
  HomepageContentRequestPayload,
  HomepageContentSuccessPayload,
  HomepageContent,
} from "./homepage.types";
import { APIError } from "../../../api/error";
import { UrlType } from "../../../contentful/contentful.types";

export const mockRequestPayload: HomepageContentRequestPayload = {
  id: "ID",
};

export const mockSuccessPayload: HomepageContentSuccessPayload = {
  meta: { name: "foo", description: "foo?", imageUrl: "foo!", title: "FOO" },
  hero: {
    header1: "test",
    header2: "test",
    paragraph: "test",
    desktopImage: {
      url: "test",
      details: {
        size: 123,
      },
      fileName: "test",
      contentType: "test",
    },
    mobileImage: {
      url: "test",
      details: {
        size: 123,
      },
      fileName: "test",
      contentType: "test",
    },
    cta: [{ label: "test", url: "test", urlType: UrlType.EMAIL }],
  },
  homepageSections: [
    {
      header: "test",
      paragraph: "test",
      imagePosition: "left",
      imageUrl: "test",
      cta: { label: "test", url: "test", urlType: UrlType.EMAIL },
      isVertical: false,
    },
  ],
  bestSellers: { title: "test", furnitureIdentifiers: ["test"] },
  textLockup: { title: "test", body: "test" },
  shopByRoom: {
    title: "test",
    rooms: [
      {
        name: "test",
        url: "test",
        image: {
          url: "test",
          details: {
            size: 123,
          },
          fileName: "test",
          contentType: "test",
        },
      },
    ],
  },
  reviews: {
    title: "test",
    reviews: [{ name: "test", quote: "test", city: "test", state: "test" }],
  },
};

export const mockError: APIError = {
  name: "sad lil fail boi",
  error: "sad lil fail boi",
  status: 404,
  message: "it works on my computer",
};

export const mockContentfulHomepageHero = {
  header1: "test",
  header2: "test",
  paragraph: "test",
  desktopImage: {
    fields: {
      file: {
        url: "test",
        details: {
          size: 123,
        },
        fileName: "test",
        contentType: "test",
      },
    },
  },
  mobileImage: {
    fields: {
      file: {
        url: "test",
        details: {
          size: 123,
        },
        fileName: "test",
        contentType: "test",
      },
    },
  },
  cta: [{ fields: { label: "test", url: "test", urlType: "email" } }],
};

export const mockContentfulImageText = {
  header: "test",
  paragraph: {
    data: {},
    nodeType: "document",
    content: [
      {
        data: {},
        marks: [],
        nodeType: "text",
        value: "test",
      },
    ],
  },
  imagePosition: "left",
  imageUrl: "test",
  cta: {
    fields: {
      label: "test",
      url: "test",
      urlType: "email",
    },
  },
  isVertical: false,
};

export const mockContentfulBestSellers = {
  title: "test",
  furnitureIdentifiers: ["test"],
};

export const mockContentfulTextLockup = {
  title: "test",
  body: "test",
};

const mockMeta = {
  name: "foo",
  description: "foo?",
  imageUrl: "foo!",
  title: "FOO",
};

export const mockShopByRoom = {
  title: "test",
  rooms: [
    {
      fields: {
        name: "test",
        url: "test",
        image: {
          fields: {
            file: {
              url: "test",
              details: {
                size: 123,
              },
              fileName: "test",
              contentType: "test",
            },
          },
        },
      },
    },
  ],
};

export const mockContentfulReviewsFeature = {
  title: "test",
  reviews: [
    { fields: { name: "test", quote: "test", city: "test", state: "test" } },
  ],
};

export const mockContentfulResponse = {
  items: [
    {
      fields: {
        hero: {
          fields: mockContentfulHomepageHero,
        },
        homepageSections: [
          {
            fields: mockContentfulImageText,
          },
        ],
        bestSellers: {
          fields: mockContentfulBestSellers,
        },
        textLockup: {
          fields: mockContentfulTextLockup,
        },
        meta: {
          fields: mockMeta,
        },
        shopByRoom: {
          fields: mockShopByRoom,
        },
        reviews: {
          fields: mockContentfulReviewsFeature,
        },
      },
    },
  ],
} as object as HomepageContent;
