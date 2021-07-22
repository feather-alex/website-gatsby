/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import FaqsCategories from "./FaqsCategories";
import { FAQCategory } from "../../contentful/contentful.types";

interface Props {
  categories: FAQCategory[];
}

const DesktopMenu = ({ categories }: Props) => (
  <div
    css={css`
      position: sticky;
      top: 120px;
      margin-left: 57px;
      float: left;
      padding-top: 78px;
      width: 0;
    `}
  >
    <FaqsCategories categories={categories} />
  </div>
);

export default DesktopMenu;
