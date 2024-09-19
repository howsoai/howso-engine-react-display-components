import {
  FieldTextArea,
  FieldTextAreaProps,
  Link,
} from "@howso/react-tailwind-flowbite-components";
import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributeDerivedFeatureCodeFieldI18nBundle as i18n } from "./FeatureAttributeDerivedFeatureCodeField.i18n";

export type FeatureAttributeDerivedFeatureCodeProps =
  Partial<FieldTextAreaProps>;
/**
 * Code defining how the value for this feature could be derived if this feature is specified as a
 * derived_context_feature or a derived_action_feature during react flows.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.derived_feature_code
 */
export const FeatureAttributeDerivedFeatureCodeField: FC<
  FeatureAttributeDerivedFeatureCodeProps
> = (props) => {
  const { t } = useTranslation(i18n.namespace);
  const { fieldTextAreaProps, purposes } = useContext(
    FeaturesAttributesContext,
  );
  const form = useFormContext();

  if (!purposes.includes("synthesis")) {
    return null;
  }

  return (
    <FieldTextArea
      {...fieldTextAreaProps}
      label={t(i18n.strings.label)}
      placeholder={t(i18n.strings.placeholder)}
      rows={7}
      {...props}
      className={twMerge("font-mono", props.className)}
      {...form.register("derived_feature_code")}
      helperText={
        <Trans t={t} i18nKey={i18n.strings.help}>
          <Link
            href="https://howsoai.github.io/amalgam/"
            target="_blank"
            external
          >
            Amalgam
          </Link>{" "}
          code...
        </Trans>
      }
    />
  );
};
