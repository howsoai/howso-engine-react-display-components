import {
  ErrorBoundary,
  FieldRadiosProps,
  FieldSelectProps,
  FieldTextAreaProps,
  FieldTextProps,
  FieldToggleProps,
} from "@howso/react-tailwind-flowbite-components";
import {
  ComponentProps,
  Context,
  FC,
  ReactNode,
  createContext,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";
import { FeatureAttributesGroupBaseProps } from "../groups";

export type IFeaturesAttributesContext = {
  fieldCheckboxProps?: Partial<FieldToggleProps>;
  fieldRadiosProps?: Pick<FieldRadiosProps, "labelInline" | "labelProps">;
  fieldSelectProps?: Pick<FieldSelectProps, "labelInline" | "labelProps">;
  fieldTextProps?: Pick<FieldTextProps, "labelInline" | "labelProps">;
  fieldStackProps?: {
    stackProps?: ComponentProps<"div">;
  } & Pick<IFeaturesAttributesContext, "fieldTextProps">;
  fieldTextAreaProps?: Pick<FieldTextAreaProps, "labelInline" | "labelProps">;
  fieldToggleProps?: Partial<FieldToggleProps>;
  groupBaseProps?: Omit<
    FeatureAttributesGroupBaseProps,
    "title" | "basic" | "advanced" | "isAdvancedOpen"
  >;
};

export const FeaturesAttributesContext: Context<IFeaturesAttributesContext> =
  createContext({});

export type FeaturesAttributesContextProviderProps = {
  children: ReactNode;
  compact?: boolean;
};
export const FeaturesAttributesContextProvider: FC<
  FeaturesAttributesContextProviderProps
> = ({ children, compact }) => {
  const fieldCheckboxProps: IFeaturesAttributesContext["fieldCheckboxProps"] =
    useMemo(() => ({}), []);
  const fieldRadiosProps: IFeaturesAttributesContext["fieldRadiosProps"] =
    useMemo(
      () => ({
        labelInline: compact,
        labelProps: compact
          ? { className: twMerge(inlineLabelClassName) }
          : undefined,
        sizing: compact ? compactFieldSize : undefined,
      }),
      [compact],
    );
  const fieldSelectProps: IFeaturesAttributesContext["fieldSelectProps"] =
    useMemo(
      () => ({
        labelInline: compact,
        labelProps: compact
          ? { className: twMerge(inlineLabelClassName) }
          : undefined,
        sizing: compact ? compactFieldSize : undefined,
      }),
      [compact],
    );
  const fieldTextProps: IFeaturesAttributesContext["fieldTextProps"] = useMemo(
    () => ({
      labelInline: compact,
      labelProps: compact
        ? { className: twMerge(inlineLabelClassName) }
        : undefined,
      sizing: compact ? compactFieldSize : undefined,
    }),
    [compact],
  );
  const fieldTextAreaProps: IFeaturesAttributesContext["fieldTextAreaProps"] =
    useMemo(
      () => ({
        labelInline: compact,
        labelProps: compact
          ? { className: twMerge(inlineLabelClassName) }
          : undefined,
        sizing: compact ? compactFieldSize : undefined,
      }),
      [compact],
    );
  const fieldToggleProps: IFeaturesAttributesContext["fieldToggleProps"] =
    useMemo(() => ({}), []);

  const fieldStackProps: IFeaturesAttributesContext["fieldStackProps"] =
    useMemo(
      () => ({
        fieldTextProps: {
          labelInline: compact,
          labelProps: compact
            ? { className: twMerge(inlineLabelStackFieldClassName) }
            : undefined,
          sizing: compact ? compactFieldSize : undefined,
        },
        stackProps: compact
          ? { className: twMerge(inlineLabelStackClassName) }
          : undefined,
      }),
      [compact],
    );
  const groupBaseProps: IFeaturesAttributesContext["groupBaseProps"] = useMemo(
    () => ({
      titleProps: {
        className: twMerge(compact && "text-md"),
      },
      advancedControlProps: {
        size: compact ? "sm" : undefined,
      },
    }),
    [compact],
  );

  return (
    <FeaturesAttributesContext.Provider
      value={{
        fieldCheckboxProps,
        fieldRadiosProps,
        fieldSelectProps,
        fieldTextProps,
        fieldStackProps,
        fieldTextAreaProps,
        fieldToggleProps,
        groupBaseProps,
      }}
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </FeaturesAttributesContext.Provider>
  );
};
const inlineLabelClassName = "w-40";
const inlineLabelStackClassName = `[&_div:nth-child(1)_label]:w-40`;
const inlineLabelStackFieldClassName = "";
const compactFieldSize: FieldTextProps["sizing"] = "sm";
