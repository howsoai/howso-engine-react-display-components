import { FC } from "react";
import { FeatureAttributesConfigurationIssue } from "../utils";
import { FeatureAttributesConfigurationIssuesIl8nBundle as il8n } from "./FeatureAttributesConfigurationIssues.il8n";
import { useTranslation } from "react-i18next";

export type FeatureAttributesConfigurationIssuesProps = {
  issues: FeatureAttributesConfigurationIssue[] | undefined;
};
export const FeatureAttributesConfigurationIssues: FC<
  FeatureAttributesConfigurationIssuesProps
> = ({ issues }) => {
  const { t } = useTranslation(il8n.namespace);

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
