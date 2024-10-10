import {
  ExpandCollapseControl,
  FieldLabel,
  FieldSelect,
  FieldText,
  PrimaryButton,
  ReadabilityConstraint,
  TableHeadCell,
  UpdateIcon,
  useFormValues,
  UX,
  WarningIcon,
} from "@howso/react-tailwind-flowbite-components";
import {
  Alert,
  ButtonProps,
  Checkbox,
  HelperText,
  Table,
  Tooltip,
} from "flowbite-react";
import { useAtom } from "jotai";
import {
  memo,
  useState,
  type Dispatch,
  type FC,
  type MouseEvent,
  type SetStateAction,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { type InferFeatureAttributesParamsAtom } from "../hooks";
import { FeatureAttributesIndex } from "../types";
import { FeaturesAttributesDependenciesI18nBundle as i18n } from "./FeaturesAttributesDependencies.i18n";

export type FeaturesAttributesDependenciesProps = {
  /** A feature to preselect when rendering in list view */
  initialFeature?: string;
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
  const { t } = useTranslation(i18n.namespace);
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
          {t(i18n.strings.help)}
        </HelperText>
      </ReadabilityConstraint>
      {features.length > 0 ? (
        <>
          <div className="mb-2">
            {features.length <= 20 ? (
              <Matrix
                dependencies={dependencies}
                setDependencies={setDependencies}
                features={features}
              />
            ) : (
              <List
                dependencies={dependencies}
                setDependencies={setDependencies}
                features={features}
                initialFeature={props.initialFeature}
              />
            )}
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
                  {t(i18n.strings.guidance.expandControl)}
                </ExpandCollapseControl>
              </div>
              <div>
                <PrimaryButton disabled={!features.length} onClick={onUpdate}>
                  <UpdateIcon className="mr-1 h-5 w-5" />
                  <span>{t(i18n.strings.actions.update)}</span>
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
                  {t(i18n.strings.guidance[1])}
                </HelperText>
                <HelperText color={"gray"}>
                  {t(i18n.strings.guidance[2])}
                </HelperText>
              </div>
            </div>
          </ReadabilityConstraint>
        </>
      ) : (
        <Alert color="warning" icon={WarningIcon}>
          {t(i18n.strings.state.empty)}
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

type MatrixProps = {
  dependencies: DependenciesIndex;
  setDependencies: Dispatch<SetStateAction<DependenciesIndex>>;
  features: string[];
};
const Matrix: FC<MatrixProps> = ({
  dependencies,
  setDependencies,
  features,
}) => {
  return (
    <Table className="mx-auto w-auto text-gray-700 dark:text-gray-400" striped>
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
                <MatrixCell
                  key={key}
                  dependenciesKey={key}
                  checked={dependencies[key]}
                  featureA={featureA}
                  featureB={featureB}
                  setDependencies={setDependencies}
                />
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

type MatrixCellProps = {
  checked: boolean;
  featureA: string;
  featureB: string;
  dependenciesKey: string;
  setDependencies: Dispatch<SetStateAction<DependenciesIndex>>;
};
const MatrixCell: FC<MatrixCellProps> = memo(
  ({ checked, featureA, featureB, dependenciesKey, setDependencies }) => {
    return (
      <Table.Cell key={featureB} className="p-1 text-center *:mx-auto">
        {featureA !== featureB && (
          <Tooltip content={[featureA, featureB].join(" and ")}>
            <Checkbox
              onChange={(event) => {
                setDependencies((dependencies) => ({
                  ...dependencies,
                  [dependenciesKey]: event.target.checked,
                }));
              }}
              color={"blue"}
              checked={checked}
              data-feature-a={featureA}
              data-feature-b={featureB}
            />
          </Tooltip>
        )}
      </Table.Cell>
    );
  },
);

type ListProps = {
  dependencies: DependenciesIndex;
  setDependencies: Dispatch<SetStateAction<DependenciesIndex>>;
  features: string[];
  /** A feature to preselect when rendering in list view */
  initialFeature?: string;
};
const List: FC<ListProps> = (props) => {
  const featureSelectForm = useForm({
    values: { feature: props.initialFeature || "", filter: "" },
  });

  return (
    <FormProvider {...featureSelectForm}>
      <ListFeatureSelect {...props} />
    </FormProvider>
  );
};

const ListFeatureSelect: FC<ListProps> = ({
  dependencies,
  features,
  setDependencies,
}) => {
  const { register } = useFormContext();
  const { feature, filter } = useFormValues();
  const lowerFilter = filter?.toLowerCase();

  return (
    <>
      <FieldSelect
        className={UX.classes.marginBottom}
        label={"Feature"}
        {...register("feature")}
      >
        <option value="">Select a feature</option>
        {features.map((feature) => (
          <option key={feature} value={feature}>
            {feature}
          </option>
        ))}
      </FieldSelect>
      <div className="ml-4">
        <FieldText
          label={null}
          sizing={"sm"}
          placeholder={
            feature
              ? `Filter ${features.length - 1} features`
              : `Filter features`
          }
          {...register("filter", { disabled: !feature })}
          className={"mb-2"}
        />
        <div className="space-y-1 max-h-40 overflow-auto pl-1">
          {features.map((featureA, indexA) => {
            return (
              featureA === feature &&
              features.map((featureB, indexB) => {
                const key: DependenciesIndexKey =
                  indexB < indexA
                    ? `${featureB}:${featureA}`
                    : `${featureA}:${featureB}`;
                const isNotFiltered =
                  !filter || featureB.toLowerCase().includes(lowerFilter);

                return (
                  isNotFiltered && (
                    <ListItem
                      key={key}
                      dependenciesKey={key}
                      checked={dependencies[key]}
                      featureA={featureA}
                      featureB={featureB}
                      setDependencies={setDependencies}
                    />
                  )
                );
              })
            );
          })}
        </div>
      </div>
    </>
  );
};

type ListItemProps = {
  checked: boolean;
  featureA: string;
  featureB: string;
  dependenciesKey: string;
  setDependencies: Dispatch<SetStateAction<DependenciesIndex>>;
};
const ListItem: FC<ListItemProps> = memo(
  ({ checked, featureA, featureB, dependenciesKey, setDependencies }) => {
    return (
      <>
        {featureA !== featureB && (
          <FieldLabel>
            <Checkbox
              onChange={(event) => {
                setDependencies((dependencies) => ({
                  ...dependencies,
                  [dependenciesKey]: event.target.checked,
                }));
              }}
              color={"blue"}
              checked={checked}
              data-feature-a={featureA}
              data-feature-b={featureB}
              className="mr-2"
            />
            {featureB}
          </FieldLabel>
        )}
      </>
    );
  },
);
