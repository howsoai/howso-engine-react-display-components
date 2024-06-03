import { Decorator } from "@storybook/react";
import {
  FieldValues,
  FormProvider,
  UseFormProps,
  useForm,
} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormProviderDecorator = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(
  props?: UseFormProps<TFieldValues, TContext>,
): Decorator => {
  return (Story) => {
    const form = useForm(props);
    return (
      <FormProvider {...form}>
        <Story />
      </FormProvider>
    );
  };
};

export const withPadding: Decorator = (Story) => (
  <div className="p-2">
    <Story />
  </div>
);
