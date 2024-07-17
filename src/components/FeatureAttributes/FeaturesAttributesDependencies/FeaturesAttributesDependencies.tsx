import { type FC, useState, type MouseEvent } from "react";
import { useAtom } from "jotai";
import {
  Alert,
  ButtonProps,
  Checkbox,
  HelperText,
  Table,
  Tooltip,
} from "flowbite-react";
import {
  ExpandCollapseControl,
  PrimaryButton,
  ReadabilityConstraint,
  TableHeadCell,
  UpdateIcon,
  WarningIcon,
} from "@howso/react-tailwind-flowbite-components";
import { useDefaultTranslation } from "@/hooks";
import { type InferFeatureAttributesParamsAtom } from "../hooks";
import { FeatureAttributesIndex } from "../types";
import { twMerge } from "tailwind-merge";

export type FeaturesAttributesDependenciesProps = {
  paramsAtom: InferFeatureAttributesParamsAtom;
  /** A function to be called update operations */
  onUpdate?: (event: MouseEvent) => void;
};
/**
 * Provides a feature to feature grid allowing users to quickly associate features with each other.
 *
 * @see https://documentation.howso.com/en/latest/openapi/types/FeatureAttributes.html#howso.openapi.models.FeatureAttributes.dependent_features
 */
export const FeaturesAttributesDependencies: FC<
  FeaturesAttributesDependenciesProps
> = (props) => {
  const { t } = useDefaultTranslation();
  const [params, setParams] = useAtom(props.paramsAtom);
  const [dependencies, setDependencies] = useState<DependenciesIndex>(
    getDependencies(params.features || {}),
  );
  const features = Object.keys(params.features || {});

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const onUpdate: ButtonProps["onClick"] = (event) => {
    event.preventDefault();
    setParams((params) => {
      const updates = { ...params };
      updates.features ||= {};
      // Remove all current dependencies
      Object.keys(updates).forEach((feature) => {
        delete updates.features![feature].dependent_features;
      });

      // Loop through the dependencies map updating features
      Object.entries(dependencies).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const [featureA, featureB] = key.split(":");
        if (featureA === featureB) {
          return;
        }

        updates.features![featureA].dependent_features ||= [];
        updates.features![featureB].dependent_features ||= [];
        updates.features![featureA].dependent_features!.push(featureB);
        updates.features![featureB].dependent_features!.push(featureA);
      });

      return updates;
    });

    props.onUpdate && props.onUpdate(event);
  };

  return (
    <>
      <ReadabilityConstraint className="mx-auto">
        <HelperText className="mb-4" color={"gray"}>
          {t("FeatureAttributes.FeaturesAttributesDependencies.help")}
        </HelperText>
      </ReadabilityConstraint>
      {features.length > 0 ? (
        <>
          <div className="mb-2 overflow-x-auto">
            <Table
              className="mx-auto w-auto text-gray-700 dark:text-gray-400"
              striped
            >
              <Table.Head className="text-sm text-inherit">
                <TableHeadCell as="td" />
                {features.map((feature) => (
                  <Table.HeadCell
                    key={feature}
                    className="w-[1lh] p-1 align-bottom normal-case"
                  >
                    <div className="ml-1 max-h-16 max-w-16 truncate [writing-mode:vertical-rl]">
                      {feature}
                    </div>
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body>
                {features.map((featureA, indexA) => (
                  <Table.Row key={featureA}>
                    <TableHeadCell
                      as="th"
                      className="p-1 text-right text-sm  text-inherit"
                    >
                      <div className="max-w-30 truncate">{featureA}</div>
                    </TableHeadCell>
                    {features.map((featureB, indexB) => {
                      const key: DependenciesIndexKey =
                        indexB < indexA
                          ? `${featureB}:${featureA}`
                          : `${featureA}:${featureB}`;
                      return (
                        <Table.Cell
                          key={featureB}
                          className="p-1 text-center *:mx-auto"
                        >
                          {featureA !== featureB && (
                            <Tooltip
                              content={[featureA, featureB].join(" and ")}
                            >
                              <Checkbox
                                onChange={(event) => {
                                  setDependencies((dependencies) => ({
                                    ...dependencies,
                                    [key]: event.target.checked,
                                  }));
                                }}
                                color={"blue"}
                                checked={dependencies[key]}
                                data-feature-a={featureA}
                                data-feature-b={featureB}
                              />
                            </Tooltip>
                          )}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <ReadabilityConstraint className="mx-auto">
            <div className="flex justify-between mb-4">
              <div>
                <ExpandCollapseControl
                  isExpanded={isInfoOpen}
                  // className={twMerge("mb-4 p-0 text-sm font-normal")}
                  onClick={() => {
                    setIsInfoOpen((previous) => !previous);
                  }}
                >
                  {t(
                    "FeatureAttributes.FeaturesAttributesDependencies.guidance.expandControl",
                  )}
                </ExpandCollapseControl>
              </div>
              <div>
                <PrimaryButton disabled={!features.length} onClick={onUpdate}>
                  <UpdateIcon className="mr-1 h-5 w-5" />
                  <span>
                    {t(
                      "FeatureAttributes.FeaturesAttributesDependencies.actions.update",
                    )}
                  </span>
                </PrimaryButton>
              </div>
            </div>

            <div>
              <div
                className={twMerge(
                  "max-h-0 overflow-hidden transition-[max-height] duration-200 ease-in-out",
                  isInfoOpen && "max-h-[99rem]", // I wonder if this is enough...
                )}
              >
                <HelperText className="mb-4" color={"gray"}>
                  {t(
                    "FeatureAttributes.FeaturesAttributesDependencies.guidance.1",
                  )}
                </HelperText>
                <HelperText color={"gray"}>
                  {t(
                    "FeatureAttributes.FeaturesAttributesDependencies.guidance.2",
                  )}
                </HelperText>
              </div>
            </div>
          </ReadabilityConstraint>
        </>
      ) : (
        <Alert color="warning" icon={WarningIcon}>
          {t("FeatureAttributes.FeaturesAttributesDependencies.state.empty")}
        </Alert>
      )}
    </>
  );
};

type DependenciesIndexKey = `${string}:${string}`;
type DependenciesIndex = Record<DependenciesIndexKey, boolean>;
const getDependencies = (
  featureAttributesIndex: FeatureAttributesIndex,
): DependenciesIndex => {
  const features = Object.keys(featureAttributesIndex);
  return features.reduce((dependencies, featureA) => {
    features.forEach((featureB) => {
      const key: DependenciesIndexKey = `${featureA}:${featureB}`;
      if (dependencies[key]) {
        return;
      }

      dependencies[key] =
        !!featureAttributesIndex[featureA].dependent_features?.includes(
          featureB,
        ) ||
        !!featureAttributesIndex[featureB].dependent_features?.includes(
          featureA,
        );
    });
    return dependencies;
  }, {} as DependenciesIndex);
};
