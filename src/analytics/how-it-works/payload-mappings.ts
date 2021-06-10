export const howItWorksClickQuestionPayloadMapping = ({ question }: { question: React.MouseEvent<string> }) => ({
  question_clicked: question
});
