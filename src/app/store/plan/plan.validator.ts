export enum ValidationMessage {
  requireZipcode = 'Zip code is required',
  invalidZipcode = 'Enter valid zip code'
}

export const validateZipcode = (zipcode: string) => {
  let error = undefined;

  if (!zipcode) {
    error = ValidationMessage.requireZipcode;
  } else if (!zipcode.match(/^\d{5}$/)) {
    error = ValidationMessage.invalidZipcode;
  }
  return error;
};
