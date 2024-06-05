import { type FieldValues, useFormContext, useWatch } from "react-hook-form";

/**
 * Ensures all fields are watched, and merges defaults with latest values.
 * This hook solves issues with execution order vs subscription order.
 *
 * @see https://react-hook-form.com/docs/usewatch and references the RULES section
 */
export const useFormValues = <
  TFieldValues extends FieldValues,
>(): TFieldValues => {
  const { getValues } = useFormContext<TFieldValues>();

  return {
    ...useWatch(), // subscribe to form value updates
    ...getValues(), // always merge with latest form values
  };
};
