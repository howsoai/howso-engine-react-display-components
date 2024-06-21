import { FC } from "react";
import { FeatureAttributesConfigurationIssue } from "../utils";
import { useDefaultTranslation } from "@/hooks";

export type FeatureAttributesConfigurationIssuesProps = {
  issues: FeatureAttributesConfigurationIssue[] | undefined;
};
export const FeatureAttributesConfigurationIssues: FC<
  FeatureAttributesConfigurationIssuesProps
> = ({ issues }) => {
  const { t } = useDefaultTranslation();

  if (!issues?.length) {
    return null;
  }

  return (
    <ul className="list-disc list-outside pl-4">
      {issues.map((issue) => (
        <li>{t(issue.translationKey)}</li>
      ))}
    </ul>
  );
};
