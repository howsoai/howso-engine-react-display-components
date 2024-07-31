import { FC } from "react";
import { FeatureAttributesConfigurationIssue } from "../utils";
import { FeatureAttributesConfigurationIssuesI18nBundle as i18n } from "./FeatureAttributesConfigurationIssues.i18n";
import { useTranslation } from "react-i18next";

export type FeatureAttributesConfigurationIssuesProps = {
  issues: FeatureAttributesConfigurationIssue[] | undefined;
};
export const FeatureAttributesConfigurationIssues: FC<
  FeatureAttributesConfigurationIssuesProps
> = ({ issues }) => {
  const { t } = useTranslation(i18n.namespace);

  if (!issues?.length) {
    return null;
  }

  return (
    <ul className="list-disc list-outside pl-4">
      {issues.map((issue) => (
        <li key={issue.translationKey}>{t(issue.translationKey)}</li>
      ))}
    </ul>
  );
};
