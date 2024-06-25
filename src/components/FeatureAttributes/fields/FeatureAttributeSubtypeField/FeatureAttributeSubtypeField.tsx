import { FC, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { useDefaultTranslation } from "@/hooks";
import {
  FeatureAttributes,
  FeatureAttributesDataTypeEnum,
} from "@howso/openapi-client";
import {
  FieldSelect,
  FieldSelectProps,
} from "@howso/react-tailwind-flowbite-components";
import { featureAttributeSubtypeFieldLabel } from "./constants";
import { FeaturesAttributesContext } from "../../FeaturesAttributesContext";

export type FeatureAttributeSubtypeProps = Partial<FieldSelectProps> & {
  featureType: FeatureAttributes["type"] | undefined;
  dataType: FeatureAttributes["data_type"];
  nonSensitive: FeatureAttributes["non_sensitive"];
};
/**
 * The type used in novel nominal substitution.
 *  For Novel Nominal substitution, the subtype of each feature must be specified
 * these often need to be manually adjusted or specified.
 *
 * If a subtype isn’t detected or specified, a subtype of int-id will be used. Without any additional changes, a 64-bit value is produced during synthesis and nominal substitution will ignore it because it doesn’t know type of substitution should be performed. The following code demonstrates examples of subtype specifications.
 *
 * Available subtypes are in https://documentation.howso.com/en/latest/synthesizer/user_guide/adv_settings/nominal_substitution/default_nominals.html
 * They might even be able to make their own: https://documentation.howso.com/en/latest/synthesizer/user_guide/adv_settings/nominal_substitution/create_your_own.html
 * Which means they need to have open text entry
 *
 * Conditions:
 * Feature type: Nominal or Ordinal
 * Non-sensitive: false
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.subtype
 */
export const FeatureAttributeSubtypeField: FC<FeatureAttributeSubtypeProps> = ({
  featureType,
  dataType,
  nonSensitive,
  ...props
}) => {
  const { t } = useDefaultTranslation();
  const { fieldTextProps } = useContext(FeaturesAttributesContext);
  const form = useFormContext();
  const subtype = form.getValues("subtype");

  if (featureType === "continuous" || nonSensitive) {
    return null;
  }

  const required = true;
  const isSubtypeValueInOptions =
    !!dataType && subtypes[dataType] && subtypes[dataType].includes(subtype);
  const isSubtypeCustom = !!subtype && !isSubtypeValueInOptions;

  return (
    <FieldSelect
      {...fieldTextProps}
      required={required}
      label={t(featureAttributeSubtypeFieldLabel)}
      {...props}
      {...form.register("subtype", { required })}
      helperText={t("FeatureAttributes.FeatureAttributeSubtypeField.help")}
    >
      {isSubtypeCustom && <option value={subtype}>{subtype}</option>}
      {dataType &&
        subtypes[dataType].map((subtype) => (
          <option key={subtype} value={subtype}>
            {subtype}
          </option>
        ))}
    </FieldSelect>
  );
};

const subtypes: Record<FeatureAttributesDataTypeEnum, string[]> = {
  number: [
    "int-id",
    "integer", // TODO nominal_substitution_config
    "sliding-win-int-id", // TODO nominal_substitution_config
    "seq-int-id", // TODO nominal_substitution_config
  ],
  string: [
    "int-id",
    "address",
    "city",
    "company",
    "country", // TODO nominal_substitution_config
    "country-code", // TODO nominal_substitution_config
    "credit-card-num", // TODO nominal_substitution_config
    "email", // TODO nominal_substitution_config
    "extended-name", // TODO nominal_substitution_config
    "first-name", // TODO nominal_substitution_config
    "full-name", // TODO nominal_substitution_config
    "gender", // TODO nominal_substitution_config
    "last-name",
    // "list",  // TODO required nominal_substitution_config
    //   nominal_substitution_config = {
    //     "features": {
    //         "RAINBOW": {
    //             "substitution": "naive",
    //             "tags": ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
    //         },
    //         "DOMINANT HAND": {
    //             "substitution": "naive",
    //             "tags": ["right handed", "left handed"],
    //             "weights": [90.0, 10.0]
    //         }
    //     },
    // }
    "phone-number",
    "postcode",
    "ssn", // TODO nominal_substitution_config
    "state",
    "state-abbr",
    "street-address",
    "text", // TODO nominal_substitution_config
    "us-address-line2",
    "uuid",
  ],
  yaml: ["int-id"],
  json: ["int-id"],
  formatted_date_time: ["int-id"],
  string_mixable: ["int-id"],
  // A TS typing requirement, wont' actually be used.
  boolean: ["int-id"],
  amalgam: ["int-id"],
};
