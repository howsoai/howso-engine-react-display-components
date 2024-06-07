import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import { Trans } from "react-i18next";
import { FieldTextArea, Link } from "@howso/react-tailwind-flowbite-components";

export type FeatureAttributeDerivedFeatureCodeProps = Record<string, unknown>;
/**
 * Code defining how the value for this feature could be derived if this feature is specified as a
 * derived_context_feature or a derived_action_feature during react flows.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.derived_feature_code
 */
export const FeatureAttributeDerivedFeatureCodeField: FC<
  FeatureAttributeDerivedFeatureCodeProps
> = () => {
  const { t } = useDefaultTranslation();
  const form = useFormContext();

  return (
    <FieldTextArea
      label={t(
        "FeatureAttributes.FeatureAttributeDerivedFeatureCodeField.label",
      )}
      placeholder={`; Simple example: Use the value for feature 'x' from the previously processed row (offset of 1, one lag value).
#x 1
; Complex example: If 'target' feature for this row is 2, return true if 'sepal-length' feature is less than 4.5, otherwise return true.
(if (= #target 0 2)
  (< #sepal-length 0 4.5) ;must be less than 4.5
  (true)
)
`}
      rows={7}
      className="font-mono"
      {...form.register("derived_feature_code")}
      helperText={
        <Trans
          t={t}
          i18nKey={
            "FeatureAttributes.FeatureAttributeDerivedFeatureCodeField.help"
          }
        >
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