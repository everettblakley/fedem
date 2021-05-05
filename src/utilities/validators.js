export function notEmptyValidator(value, propertyName = "") {
  if (value.length > 0) return "";
  return `${propertyName || "Value"} cannot be empty.`;
}

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const uppercaseRegex = /^.*[A-Z]+.*$/;
export const lowercaseRegex = /^.*[a-z]+.*$/;
export const numberRegex = /^.*[0-9]+.*$/;

export function emailValidator(email) {
  if (emailRegex.test(email)) return "";
  return "Invalid email address";
}

export function minimumLengthValidator(value, minimum, propertyName = "") {
  if (value.length >= minimum) return "";
  return `${propertyName || "Value"} must be at least ${minimum} characters`;
}

export function maxiumumLengthValidator(value, maximum, propertyName = "") {
  if (value.length <= maximum) return "";
  return `${propertyName || "Value"} must be at most ${maximum} characters`;
}

export function containsUppercaseValidator(value, propertyName = "") {
  if (uppercaseRegex.test(value)) return "";
  return `${
    propertyName || "Value"
  } must contain at least one uppercase character`;
}

export function containsLowercaseValidator(value, propertyName = "") {
  if (lowercaseRegex.test(value)) return "";
  return `${
    propertyName || "Value"
  } must contain at least one lowercase character`;
}

export function containsNumberValidator(value, propertyName = "") {
  if (numberRegex.test(value)) return "";
  return `${
    propertyName || "Value"
  } must contain at least one numerical character`;
}

export function passwordValidator(password) {
  const prop = "Password";
  const errors = [
    minimumLengthValidator(password, 8, prop),
    containsLowercaseValidator(password, prop),
    containsUppercaseValidator(password, prop),
    containsNumberValidator(password, prop),
  ];
  return errors.filter((e) => !!e).join(". ");
}

export function equalValuesValidator(
  value1,
  value2,
  property1Name = "",
  property2Name = property1Name
) {
  if (value1 === value2) return "";
  return `${property1Name || "Value 1"} must equal ${
    property2Name || "Value 2"
  }`;
}
