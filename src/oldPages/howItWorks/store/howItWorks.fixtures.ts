import {
  HowItWorksRequestPayload,
  HowItWorksSuccessPayload,
  HowItWorksPageContent,
} from "./howItWorks.types";
import { APIError } from "../../../types/ReduxState";

const mockHeader = "The Big Foo";

const mockMeta = {
  name: "foo",
  description: "foo?",
  imageUrl: "foo!",
  title: "FOO",
};

const mockFaq = { answer: "a lot", question: "how much?" };

const mockContentfulFaq = {
  answer: {
    data: {},
    nodeType: "document",
    content: [
      {
        data: {},
        marks: [],
        nodeType: "text",
        value: "a lot",
      },
    ],
  },
  question: "how much?",
};

const mockStep = {
  step: "one",
  order: 1,
  headerText: `And I'll form the head`,
  headerImageUrl: "fakerUrl.com",
  detailText: "Do people even read these",
  detailImageUrl: "fakeUrl.com",
  detailImageSaturation: 5,
  detailImageSharpness: 10,
};

export const mockRequestPayload: HowItWorksRequestPayload = {
  id: "ID",
};

export const mockSuccessPayload: HowItWorksSuccessPayload = {
  header: mockHeader,
  faqs: [mockFaq],
  meta: mockMeta,
  steps: [mockStep],
};

export const mockError: APIError = {
  error: "sad lil Shakespeare boi",
  status: 404,
  message: "The error doth protest too much, methinks",
};

export const mockContentfulResponse = {
  items: [
    {
      fields: {
        header: mockHeader,
        meta: {
          fields: mockMeta,
        },
        faqCategory: {
          fields: {
            faqs: [
              {
                fields: mockContentfulFaq,
              },
            ],
          },
        },
        steps: [
          {
            fields: mockStep,
          },
        ],
      },
    },
  ],
} as object as HowItWorksPageContent;

export const mockFormattedResponse = {
  header: mockHeader,
  meta: mockMeta,
  faqs: [mockFaq],
  steps: [mockStep],
};
