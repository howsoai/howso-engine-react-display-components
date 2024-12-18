import { ComponentProps, FC } from "react";
import { useTranslation } from "react-i18next";
import { EnginePropertyLabelsI18nBundle as i18n } from "./i18n";

export type PropertyLabelProps = ComponentProps<"span"> & {
  property: keyof typeof i18n.strings;
};
export const PropertyLabel: FC<PropertyLabelProps> = ({
  property,
  ...props
}) => {
  const { t } = useTranslation(i18n.namespace);

  return <span {...props}>{t(i18n.strings[property])}</span>;
};
