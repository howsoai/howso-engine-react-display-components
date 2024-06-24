import { useDefaultTranslation } from "@/hooks";
import {
  ExpandCollapseControl,
  ExpandCollapseControlProps,
  formSpacingYDefault,
} from "@howso/react-tailwind-flowbite-components";
import type { ComponentProps } from "react";
import { FC, ReactNode, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributesGroupBaseProps = Omit<
  ComponentProps<"section">,
  "children"
> & {
  title: ReactNode;
  titleProps?: ComponentProps<"div">;
  sectionProps?: ComponentProps<"div">;
  basic?: ReactNode;
  advanced?: ReactNode;
  advancedControlProps?: Omit<
    ExpandCollapseControlProps,
    "children" | "isExpanded" | "onClick"
  >;
  isAdvancedOpen?: boolean;
};
export const FeatureAttributesGroupBase: FC<
  FeatureAttributesGroupBaseProps
> = ({ title, sectionProps, basic, advanced, isAdvancedOpen, ...props }) => {
  const { t } = useDefaultTranslation();
  const { groupBaseProps: contextProps } = useContext(
    FeaturesAttributesContext,
  );
  const [isOpen, setIsOpen] = useState(isAdvancedOpen ?? false);

  return (
    <section
      {...props}
      className={twMerge(
        "border-t border-solid pt-2",
        formSpacingYDefault,
        contextProps?.className,
        props.className,
      )}
    >
      {title && (
        <header className={"mb-4 flex items-center justify-between gap-4"}>
          <div
            {...contextProps?.titleProps}
            className={twMerge(
              "text-lg font-medium dark:text-white",
              contextProps?.titleProps?.className,
            )}
          >
            {title}
          </div>
        </header>
      )}
      {basic && (
        <div
          {...contextProps?.sectionProps}
          {...sectionProps}
          className={twMerge(
            defaultSectionProps,
            contextProps?.sectionProps?.className,
            sectionProps?.className,
          )}
        >
          {basic}
        </div>
      )}
      {advanced && (
        <div
          {...contextProps?.sectionProps}
          {...sectionProps}
          className={twMerge(
            defaultSectionProps,
            contextProps?.sectionProps?.className,
            sectionProps?.className,
          )}
        >
          <ExpandCollapseControl
            {...contextProps?.advancedControlProps}
            isExpanded={isOpen}
            className={twMerge(
              "mb-4 p-0 text-sm font-normal",
              contextProps?.advancedControlProps?.className,
            )}
            fullSized
            onClick={
              advanced
                ? () => {
                    setIsOpen((previous) => !previous);
                  }
                : undefined
            }
          >
            {t("FeatureAttributes.FeatureAttributesGroupBase.expandControl")}
          </ExpandCollapseControl>
          <div
            className={twMerge(
              "max-h-0 overflow-hidden transition-[max-height] duration-200 ease-in-out",
              isOpen && "max-h-[99rem]", // I wonder if this is enough...
            )}
          >
            {advanced}
          </div>
        </div>
      )}
    </section>
  );
};

const defaultSectionProps = "ml-7";
