import { isNull } from "./primitives";

export const isFormDataEmpty = (value: unknown): boolean => {
  if (value === "") {
    return true;
  }

  if (isNull(value)) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  return false;
};
