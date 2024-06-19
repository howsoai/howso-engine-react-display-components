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
> = ({ title, basic, advanced, isAdvancedOpen, ...props }) => {
  const { t } = useDefaultTranslation();
  const { groupBaseProps: groupBasePropsRaw = {} } = useContext(
    FeaturesAttributesContext,
  );
  const { titleProps, advancedControlProps, ...groupBaseProps } =
    groupBasePropsRaw;

  const [isOpen, setIsOpen] = useState(isAdvancedOpen ?? false);

  return (
    <section
      {...groupBaseProps}
      {...props}
      className={twMerge(
        "border-t border-solid pt-2",
        formSpacingYDefault,
        groupBaseProps?.className,
        props.className,
      )}
    >
      {title && (
        <header className={"mb-4 flex items-center justify-between gap-4"}>
          <div
            {...titleProps}
            className={twMerge(
              "text-lg font-medium dark:text-white",
              titleProps?.className,
            )}
          >
            {title}
          </div>
        </header>
      )}
      {basic && <div className={childIndention}>{basic}</div>}
      {advanced && (
        <div className={twMerge(childIndention)}>
          <ExpandCollapseControl
            {...advancedControlProps}
            isExpanded={isOpen}
            className={twMerge(
              "mb-4 p-0 text-sm font-normal",
              advancedControlProps?.className,
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

const childIndention = "ml-7";
