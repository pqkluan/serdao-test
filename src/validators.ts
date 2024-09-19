import validator from "validator";

export const validateFirstName = (value: string) => {
  if (!value) return "Cannot be empty";
  if (!validator.isAlpha(value)) return "Invalid first name";
};

export const validateLastName = (value: string) => {
  if (!value) return "Cannot be empty";
  if (!validator.isAlpha(value)) return "Invalid last name";
};

/**
 * Validate IBAN
 *
 * @example MZ59000301080016367102371
 * @param value IBAN value
 * @returns error message or undefined
 */
export const validateIBAN = (value: string) => {
  if (!value) return "Cannot be empty";
  if (!validator.isIBAN(value)) return "Invalid IBAN";
};

export const validateAmount = (value: string) => {
  if (!value) return "Cannot be empty";
  if (!validator.isNumeric(value)) return "Invalid amount";
};
