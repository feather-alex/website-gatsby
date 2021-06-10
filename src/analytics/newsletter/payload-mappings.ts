export const signupPayloadMapping = ({ email, origin }: { email: string; origin: string }) => ({
  customer_email: email,
  ui_location: origin
});

export const trackEmailUserPayloadMapping = ({ email }: { email: string }) => ({
  email
});
