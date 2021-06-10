export const quizStepPayloadMapping = ({ currentStep }: { currentStep: string }) => ({
  step_viewed: currentStep
});

export const quizFinalStepPayloadMapping = ({ name, email }: { name: string; email: string }) => ({
  customer_name: name,
  customer_email: email
});
