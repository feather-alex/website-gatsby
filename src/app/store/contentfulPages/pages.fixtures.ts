import { APIError } from "../../../api/error";
import { PagesContent } from "../../../contentful/contentful.types";
import { ContentfulPagesSuccessPayload } from "./pages.types";

export const mockContentfulResponse: PagesContent = {
  items: [
    {
      fields: {
        title: "A brave new world",
        slug: "/newpagewhodis",
        template: "City Page",
        pageId: {
          sys: {
            type: "",
            linkType: "",
            id: "1",
          },
        },
      },
    },
    {
      fields: {
        title: "Landing Page",
        slug: "/landing-page",
        template: "Landing Page",
        pageId: {
          sys: {
            type: "",
            linkType: "",
            id: "2",
          },
        },
      },
    },
  ],
} as object as PagesContent;

export const mockSuccessPayload: ContentfulPagesSuccessPayload = {
  pages: [
    {
      title: "A brave new world",
      slug: "/newpagewhodis",
      template: "City Page",
      pageId: "1",
    },
    {
      title: "Landing Page",
      slug: "/landing-page",
      template: "Landing Page",
      pageId: "2",
    },
  ],
};

export const mockError: APIError = {
  name: "Error",
  status: 500,
  message: "Sola's easter egg part 45",
  error: "Server Error",
};
