import {
  ErrorBoundary,
  FieldCheckboxProps,
  FieldRadiosProps,
  FieldSelectProps,
  FieldTextAreaProps,
  FieldTextProps,
} from "@howso/react-tailwind-flowbite-components";
import { ButtonProps } from "flowbite-react";
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
import { IFeatureAttributePurposes } from "../types";

export type IFeaturesAttributesContext = IFeatureAttributePurposes & {
  buttonProps?: Partial<ButtonProps>;
  fieldCheckboxProps?: Partial<FieldCheckboxProps>;
  fieldRadiosProps?: Pick<FieldRadiosProps, "labelInline" | "labelProps">;
  fieldSelectProps?: Pick<FieldSelectProps, "labelInline" | "labelProps">;
  fieldTextProps?: Pick<FieldTextProps, "labelInline" | "labelProps">;
  fieldStackProps?: {
    stackProps?: ComponentProps<"div">;
  } & Pick<IFeaturesAttributesContext, "fieldTextProps">;
  fieldTextAreaProps?: Pick<FieldTextAreaProps, "labelInline" | "labelProps">;
  groupBaseProps?: Omit<
    FeatureAttributesGroupBaseProps,
    "title" | "basic" | "advanced" | "isAdvancedOpen"
  >;
};

const defaultContext = { purposes: ["core"] } as IFeaturesAttributesContext;
export const FeaturesAttributesContext: Context<IFeaturesAttributesContext> =
  createContext(defaultContext);

export type FeaturesAttributesContextProviderProps =
  IFeatureAttributePurposes & {
    children: ReactNode;
    compact?: boolean;
  };
export const FeaturesAttributesContextProvider: FC<
  FeaturesAttributesContextProviderProps
> = ({ children, compact, purposes }) => {
  const buttonProps: IFeaturesAttributesContext["buttonProps"] = useMemo(
    () => ({ size: compact ? "sm" : undefined }),
    [compact],
  );
  const fieldCheckboxProps: IFeaturesAttributesContext["fieldCheckboxProps"] =
    useMemo(
      () => ({
        containerProps: compact
          ? { className: inlineCheckboxClassName }
          : undefined,
        sizing: compact ? compactFieldSize : undefined,
      }),
      [compact],
    );
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
      titleProps: { className: twMerge(compact && "text-md") },
      advancedControlProps: { size: compact ? "sm" : undefined },
      sectionProps: { className: twMerge(compact && "ml-0") },
    }),
    [compact],
  );

  return (
    <FeaturesAttributesContext.Provider
      value={{
        buttonProps,
        fieldCheckboxProps,
        fieldRadiosProps,
        fieldSelectProps,
        fieldTextProps,
        fieldStackProps,
        fieldTextAreaProps,
        groupBaseProps,
        purposes,
      }}
    >
      <ErrorBoundary>{children}</ErrorBoundary>
    </FeaturesAttributesContext.Provider>
  );
};

const inlineLabelClassName = "w-40";
const inlineCheckboxClassName = "ml-40 pl-2"; // pl-2 accounts for the flex gap 2 between label and field
const inlineLabelStackClassName = `[&_div:nth-child(1)_label]:w-40`;
const inlineLabelStackFieldClassName = "";
const compactFieldSize: FieldTextProps["sizing"] = "sm";
