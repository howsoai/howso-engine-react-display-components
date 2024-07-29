import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import {
  FieldTextArea,
  FieldTextAreaProps,
  Link,
} from "@howso/react-tailwind-flowbite-components";
import { twMerge } from "tailwind-merge";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";
import { FeatureAttributePostProcessFieldIl8nBundle as il8n } from "./FeatureAttributePostProcessField.il8n";

export type FeatureAttributePostProcessProps = Partial<FieldTextAreaProps>;
/**
 * Custom Amalgam code that is called on resulting values of this feature during react operations.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.post_process
 */
export const FeatureAttributePostProcessField: FC<
  FeatureAttributePostProcessProps
> = (props) => {
  const { t } = useTranslation(il8n.namespace);
  const { fieldTextAreaProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();

  return (
    <FieldTextArea
      {...fieldTextAreaProps}
      label={t("FeatureAttributes.FeatureAttributePostProcessField.label")}
      placeholder={t(il8n.strings.placeholder)}
      rows={7}
      {...props}
      {...form.register("post_process")}
      className={twMerge("font-mono", props.className)}
      helperText={
        <Trans t={t} i18nKey={il8n.strings.help}>
          <Link
            href="https://howsoai.github.io/amalgam/"
            target="_blank"
            external
          >
            Amalgam
          </Link>
          code that is called on resulting values of this feature during `react`
          operations.
        </Trans>
      }
    />
  );
};
