export const sendContactFormMessagePayloadMapping = ({
  email,
  name,
  company,
  reasonForInquiry,
}: {
  email: string;
  name: string;
  company: string;
  reasonForInquiry: string;
}) => ({
  customer_email: email,
  customer_name: name,
  customer_company: company,
  reason_for_inquiry: reasonForInquiry,
});

export const sendContactFormIdentifyPayloadMapping = ({
  email,
  name,
  company,
}: {
  email: string;
  name: string;
  company: string;
}) => ({
  email,
  name,
  company,
});
