export enum ReasonsForInquiry {
  CustomerQuestion = 'I have a question - current customer',
  NonCustomerQuestion = "I have a question - I'm not a customer yet",
  StagingAndOffice = 'Staging and office inquiries',
  Affiliates = 'Affiliates & Partners',
  Press = 'Press',
  Merchandising = 'Merchandising',
  Billing = 'Billing'
}

export interface ContactRequest {
  email: string;
  name: string;
  company: string;
  message: string;
  reasonForInquiry: ReasonsForInquiry;
}

export interface ContactFormData {
  fullName: string;
  emailAddress: string;
  companyName: string;
  reasonForInquiry: ReasonsForInquiry;
  messageBody: string;
}

export interface ContactState {
  isProccessingRequest: boolean;
  displayErrorMessage: boolean;
  displaySuccessMessage: boolean;
}
