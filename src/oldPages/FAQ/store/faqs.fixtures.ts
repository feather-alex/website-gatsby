import {
  FaqContentRequestPayload,
  FaqContentSuccessPayload,
} from "./faqs.types";
import { FAQPageContent } from "./faqs.types";
import { APIError } from "../../../types/ReduxState";
import { FAQ, FAQCategory } from "../../../contentful/contentful.types";

export const mockRequestPayload: FaqContentRequestPayload = {
  id: "ID",
};

export const mockSuccessPayload: FaqContentSuccessPayload = {
  faqCategories: [
    {
      name: "General",
      faqs: [{ answer: "a lot", question: "how much?" }],
    },
  ],
  meta: {
    name: "foo",
    description: "foo?",
    imageUrl: "foo!",
    title: "FOO",
  },
};

export const mockError: APIError = {
  error: "sad lil fail boi",
  status: 404,
  message: "it works on my computer",
};

export const mockContentfulFaq = {
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

const mockMeta = {
  name: "foo",
  description: "foo?",
  imageUrl: "foo!",
  title: "FOO",
};

export const mockContentfulResponse = {
  items: [
    {
      fields: {
        name: "FAQ Page",
        faqCategories: [
          {
            fields: {
              name: "General",
              faqs: [
                {
                  fields: mockContentfulFaq,
                },
              ],
            },
          },
        ],
        meta: {
          fields: mockMeta,
        },
      },
    },
  ],
} as object as FAQPageContent;

export const mockFormattedResponse = {
  meta: mockMeta,
  faqCategories: [
    {
      name: "General",
      faqs: [
        {
          answer: "a lot",
          question: "how much?",
        },
      ],
    },
  ],
};

export const makeMockFaqs = (amount: number): FAQ[] => {
  const faqs = [];
  for (let i = 0; i < amount; i++) {
    faqs.push({
      question: "does it really matter?",
      answer: "perhaps not",
    });
  }

  return faqs;
};

export const makeMockFaqCategory = (category: string): FAQCategory => ({
  name: category,
  faqs: makeMockFaqs(5),
});
