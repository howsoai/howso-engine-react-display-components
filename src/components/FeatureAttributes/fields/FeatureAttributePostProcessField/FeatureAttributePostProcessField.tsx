import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { Trans } from "react-i18next";
import { FieldTextArea, Link } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributePostProcessProps = Record<string, unknown>;
/**
 * Custom Amalgam code that is called on resulting values of this feature during react operations.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.post_process
 */
export const FeatureAttributePostProcessField: FC<
  FeatureAttributePostProcessProps
> = () => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  return (
    <FieldTextArea
      label={t("FeatureAttributes.FeatureAttributePostProcessField.label")}
      placeholder={`; Simple example: Included standard text prefixing 'target'.
(concat "PROCESSED: " #target 0)
; Complex example: Generate a nickname using 'name' based on 'age' feature.
(if (< #age 0 18) ; If the person is under 18
  (concat "Lil " #name 0) ; Prefix with a Diminutive
  #name 0 ; Don't adjust other names
)`}
      rows={7}
      {...form.register("post_process")}
      className="font-mono"
      helperText={
        <Trans
          t={t}
          i18nKey={"FeatureAttributes.FeatureAttributePostProcessField.help"}
        >
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
