import { useDefaultTranslation } from "@/hooks";
import {
  ExpandCollapseControl,
  formSpacingYDefault,
} from "@howso/react-tailwind-flowbite-components";
import { TextInputProps } from "flowbite-react";
import type { ComponentProps } from "react";
import { FC, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export type FeatureAttributesGroupBaseProps = Omit<
  ComponentProps<"section">,
  "children"
> & {
  title: ReactNode;
  basic?: ReactNode;
  advanced?: ReactNode;
  isAdvancedOpen?: boolean;
  sizing?: TextInputProps["sizing"];
};
export const FeatureAttributesGroupBase: FC<
  FeatureAttributesGroupBaseProps
> = ({ title, basic, advanced, isAdvancedOpen, ...props }) => {
  const { t } = useDefaultTranslation();
  const [isOpen, setIsOpen] = useState(isAdvancedOpen ?? false);

  return (
    <section
      {...props}
      className={twMerge(
        "border-t border-solid pt-2",
        formSpacingYDefault,
        props.className,
      )}
    >
      {title && (
        <header className={"mb-4 flex items-center justify-between gap-4"}>
          <div className="text-lg font-medium dark:text-white">{title}</div>
        </header>
      )}
      {basic && <div className={childIndention}>{basic}</div>}
      {advanced && (
        <div className={twMerge(childIndention)}>
          <ExpandCollapseControl
            isExpanded={isOpen}
            className="mb-4 p-0 text-sm font-normal"
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
              "max-h-0 overflow-hidden px-1 transition-[max-height] duration-200 ease-in-out",
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
