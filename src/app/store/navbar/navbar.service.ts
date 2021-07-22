import {
  MobileNavContent,
  MobileNavContentSuccessPayload,
} from "./navbar.types";
import { parseMobileNavCategory } from "../../../contentful/contentful.parsers";

export function formatMobileNavContentResponse(
  content: MobileNavContent
): MobileNavContentSuccessPayload {
  const { fields } = content.items[0];

  return {
    categories: fields.categories.map((category) =>
      parseMobileNavCategory(category)
    ),
  };
}
