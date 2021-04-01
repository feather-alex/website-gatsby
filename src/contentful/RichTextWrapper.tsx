/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import DOMPurify from "dompurify";

import { getStyles as getParagraphStyles } from "../ui/paragraphs/Paragraph1";
import { getStyles as getHeader1Styles } from "../ui/headers/Header1";
import { getStyles as getHeader2Styles } from "../ui/headers/Header2";
import { getStyles as getHeader3Styles } from "../ui/headers/Header3";
import { getStyles as getHeader4Styles } from "../ui/headers/Header4";
import { getStyles as getSubheader1Styles } from "../ui/subheaders/Subheader1";
import { getStyles as getSubheader2Styles } from "../ui/subheaders/Subheader2";

const StyledDiv = styled.div`
  /* Conforms to our Paragraph1 styles */
  & p {
    ${getParagraphStyles}
  }
  & b,
  strong {
    font-weight: 500;
  }
  & ul,
  ol {
    padding-left: 1em;
    list-style: inherit;
  }
  /* Conforms to our ButtonStyle.INLINE styles */
  & a {
    white-space: nowrap;
    position: relative;
    width: fit-content;
    padding: 0px;
    border: none;
    font-family: "Centra No2";
    color: rgb(0, 0, 0);
    background-color: transparent;
    transition: all 150ms ease 0s;
    text-decoration: none !important;
    font-weight: inherit !important;
    &:after {
      content: "";
      position: absolute;
      bottom: 2px;
      width: 100%;
      height: 1px;
      opacity: 1;
      background-color: currentcolor;
      left: 0px;
      transition: opacity 150ms ease 0s;
    }
    &:hover:after {
      opacity: 0;
    }
  }
  /* Conforms to our Header1 styles */
  & h1 {
    ${getHeader1Styles}
  }
  /* Conforms to our Header2 styles */
  & h2 {
    ${getHeader2Styles}
  }
  /* Conforms to our Header3 styles */
  & h3 {
    ${getHeader3Styles}
  }
  /* Conforms to our Header4 styles */
  & h4 {
    ${getHeader4Styles}
  }
  /* Conforms to our Subheader1 styles */
  & h5 {
    ${getSubheader1Styles}
  }
  /* Conforms to our Subheader2 styles */
  & h6 {
    ${getSubheader2Styles}
  }
`;

const RichTextWrapper = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <StyledDiv
    className={className}
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
  ></StyledDiv>
);

export default RichTextWrapper;
