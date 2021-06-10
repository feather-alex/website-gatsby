/** @jsx jsx */
import styled from '@emotion/styled';
import { jsx } from '@emotion/core';

import Title1 from '../../ui/titles/Title1';
import RichTextWrapper from '../../contentful/RichTextWrapper';

interface Props {
  titleText: string;
  paragraphText: string;
}

const FAQContainer = styled.div`
  margin-bottom: 40px;
`;

const Question = styled(Title1)`
  margin-bottom: 16px;
`;

const Answer = styled(RichTextWrapper)`
  & p {
    font-size: 16px;
    line-height: 23px;
    margin-bottom: 15px;
  }
`;

const MembershipPageFAQs = ({ titleText, paragraphText }: Props) => (
  <FAQContainer>
    <Question isBold={true}>{titleText}</Question>
    <Answer key={titleText} text={paragraphText} />
  </FAQContainer>
);

export default MembershipPageFAQs;
