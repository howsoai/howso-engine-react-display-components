import {
  type Dispatch,
  type SetStateAction,
  FC,
  useState,
  useEffect,
  useContext,
} from "react";
import { Button, Alert, getTheme, Checkbox, Tooltip } from "flowbite-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";
import { FeatureAttributeSample } from "../FeatureAttributeSample";
import { FeatureAttributesConfiguration } from "../FeatureAttributesConfiguration";
import { useDefaultTranslation } from "@/hooks";
import {
  ErrorBoundary,
  FieldLabel,
  FieldSelect,
  FieldStatic,
  UpdateIcon,
  WarningIcon,
} from "@howso/react-tailwind-flowbite-components";
import {
  InferFeatureAttributeFormValues,
  getFeatureAttributeConfigurationIssues,
  getInferFeatureAttributeParamsFormValuesOnSubmit,
  shouldInferAgain as shouldInferFeatureAttributesAgain,
} from "../utils";
import { MapDependentFeatureAttributesIcon } from "@/components/Icons";
import { translations } from "./constants";
import {
  type FeatureAttributesActiveFeatureAtom,
  type InferFeatureAttributesParamsAtom,
  type FeatureAttributesOptionsAtom,
  type InferFeatureAttributesParamsTimeFeatureAtom,
  useFeatureAttributesForm,
  getFeatureAttributesFormDefaultValues,
  InferFeatureAttributesRunRequiredFieldsAtom,
} from "../hooks";
import { FeaturesAttributesDependencies } from "../FeaturesAttributesDependencies";
import {
  FeaturesAttributesContext,
  FeaturesAttributesContextProvider,
} from "../FeaturesAttributesContext";
import { FeatureAttributesConfigurationIssues } from "../FeatureAttributesConfigurationIssues";

export type FeaturesAttributesCompactProps = {
  activeFeatureAtom: FeatureAttributesActiveFeatureAtom;
  optionsAtom: FeatureAttributesOptionsAtom;
  paramsAtom: InferFeatureAttributesParamsAtom;
  runRequiredAtom: InferFeatureAttributesRunRequiredFieldsAtom;
  timeFeatureAtom: InferFeatureAttributesParamsTimeFeatureAtom;
};
/**
 * A specialized view of all feature attributes at once.
 * Controls exist to expose a time feature, configuration errors, type, and samples simultaneously.
 *
 * ⚠️ This component relies heavily on Modal components, and is unsuited to Jupyter Notebook integrations.
 **/
export const FeaturesAttributesCompact: FC<FeaturesAttributesCompactProps> = (
  props,
) => {
  const { t } = useDefaultTranslation();
  const { activeFeatureAtom, paramsAtom, optionsAtom, timeFeatureAtom } = props;
  const activeFeature = useAtomValue(activeFeatureAtom);
  const params = useAtomValue(paramsAtom);
  const features = Object.keys(params.features || {});
  const [isMappingOpen, setIsMappingOpen] = useState(false);

  const [areConfigurationsDirty, setAreConfigurationsDirty] = useState(false);
  const [isCompact, setIsCompact] = useState(true);

  return (
    <FeaturesAttributesContextProvider compact={isCompact}>
      <Header
        activeFeatureAtom={activeFeatureAtom}
        areConfigurationsDirty={areConfigurationsDirty}
        paramsAtom={paramsAtom}
        // is compact
        isCompact={isCompact}
        setIsCompact={setIsCompact}
        toggleIsMappingOpen={() => setIsMappingOpen((previous) => !previous)}
        optionsAtom={optionsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />
      <hr className="my-4" />
      {!features.length ? (
        <Alert color="warning" icon={WarningIcon}>
          {t(translations.state.empty)}
        </Alert>
      ) : isMappingOpen ? (
        <FeaturesAttributesDependencies
          {...props}
          onUpdate={() => setIsMappingOpen(false)}
        />
      ) : !activeFeature ? (
        <Alert color="info">{t(translations.state.unselected)}</Alert>
      ) : (
        <Configuration
          {...props}
          areConfigurationsDirty={areConfigurationsDirty}
          setAreConfigurationsDirty={setAreConfigurationsDirty}
        />
      )}
    </FeaturesAttributesContextProvider>
  );
};

type HeaderProps = {
  activeFeatureAtom: FeatureAttributesActiveFeatureAtom;
  areConfigurationsDirty: boolean;
  paramsAtom: InferFeatureAttributesParamsAtom;
  // isCompact
  isCompact: boolean;
  setIsCompact: Dispatch<SetStateAction<boolean>>;
  // isMappingOpen
  toggleIsMappingOpen: () => void;
  optionsAtom: FeatureAttributesOptionsAtom;
  timeFeatureAtom: InferFeatureAttributesParamsTimeFeatureAtom;
};
type HeaderFormValues = {
  feature: string | undefined;
  timeFeature: string | undefined;
};
const Header: FC<HeaderProps> = ({
  activeFeatureAtom,
  areConfigurationsDirty,
  paramsAtom: inferFeatureAttributesParamsAtom,
  isCompact,
  setIsCompact,
  toggleIsMappingOpen,
  optionsAtom,
  timeFeatureAtom,
}) => {
  const { t } = useDefaultTranslation();
  const params = useAtomValue(inferFeatureAttributesParamsAtom);
  const featuresAttributes = params.features || {};
  const features = Object.keys(featuresAttributes);

  const [activeFeature, setActiveFeature] = useAtom(activeFeatureAtom);
  const [timeFeature, setTimeFeature] = useAtom(timeFeatureAtom);
  const [options, setOptions] = useAtom(optionsAtom);

  const form = useForm<HeaderFormValues>({
    defaultValues: { feature: features.at(0) },
  });

  return (
    <header className="flex flow-row gap-4 justify-between items-end">
      <div className="flex gap-4 items-center">
        <FormProvider {...form}>
          <FieldSelect
            required
            label={t(translations.header.fields.feature.label)}
            labelInline
            // labelProps={{ className: "w-40" }}
            sizing={"sm"}
            name="feature"
            onChange={async (event) => {
              setActiveFeature(event.target.value);
            }}
            value={activeFeature || ""}
            disabled={areConfigurationsDirty || !features.length}
          >
            <option value=""></option>
            {features.map((feature) => (
              <option key={feature} value={feature}>
                {feature}
              </option>
            ))}
          </FieldSelect>

          <FieldLabel sizing="sm">
            <Checkbox
              color={"blue"}
              disabled={!activeFeature}
              onChange={async (event) => {
                setOptions({ ...options, time_series: event.target.checked });
                setTimeFeature(
                  event.target.checked ? activeFeature : undefined,
                );
              }}
              checked={activeFeature === timeFeature?.name}
            />{" "}
            {t(translations.header.fields.timeFeature.label)}
          </FieldLabel>
        </FormProvider>
      </div>

      <div className="flex gap-4 items-end">
        <Button
          color={"light"}
          size={"sm"}
          disabled={!features.length}
          onClick={toggleIsMappingOpen}
        >
          <MapDependentFeatureAttributesIcon className={"mr-1"} />
          {t(translations.actions.mapDependents)}
        </Button>
        <Button.Group>
          <Button
            size={"sm"}
            color={isCompact ? "info" : "gray"}
            onClick={() => setIsCompact(true)}
          >
            {t(translations.labels.density.compact)}
          </Button>
          <Button
            size={"sm"}
            color={!isCompact ? "info" : "gray"}
            onClick={() => setIsCompact(false)}
          >
            {t(translations.labels.density.comfortable)}
          </Button>
        </Button.Group>
      </div>
    </header>
  );
};

type ConfigurationProps = Pick<
  FeaturesAttributesCompactProps,
  "activeFeatureAtom" | "runRequiredAtom" | "paramsAtom" | "timeFeatureAtom"
> & {
  areConfigurationsDirty: boolean;
  setAreConfigurationsDirty: Dispatch<SetStateAction<boolean>>;
};
const Configuration: FC<ConfigurationProps> = (props) => {
  const { activeFeatureAtom, paramsAtom: inferFeatureAttributesParamsAtom } =
    props;

  const { t } = useDefaultTranslation();
  const theme = getTheme();
  const activeFeature = useAtomValue(activeFeatureAtom);
  const params = useAtomValue(inferFeatureAttributesParamsAtom);
  const attributes = activeFeature
    ? params.features?.[activeFeature]
    : undefined;
  if (!attributes) {
    throw new Error(`attributes are not defined for ${activeFeature}`);
  }
  const issues = getFeatureAttributeConfigurationIssues(attributes);

  return (
    <section data-testid="configuration-container">
      <header className="mb-2 flex gap-4 items-baseline justify-between">
        <div className="flex gap-1 items-center">
          <h3 className="text-lg">
            {t(translations.actions.configureName, {
              name: activeFeature,
            })}
          </h3>
          {issues && (
            <Tooltip
              content={<FeatureAttributesConfigurationIssues issues={issues} />}
            >
              <WarningIcon
                className={twMerge(
                  "ml-1 text-lg",
                  theme.label.root.colors.warning,
                )}
              />
            </Tooltip>
          )}
        </div>
      </header>
      {/* Purpose using `key` here to force the component to load and unload, creating new `useForm` defaults */}
      <Form key={activeFeature} {...props} />
    </section>
  );
};

const Form: FC<ConfigurationProps> = ({
  areConfigurationsDirty,
  setAreConfigurationsDirty,
  activeFeatureAtom,
  runRequiredAtom,
  paramsAtom,
  timeFeatureAtom,
}) => {
  const { t } = useDefaultTranslation();
  const { buttonProps, fieldTextProps } = useContext(FeaturesAttributesContext);
  const [activeFeature, setActiveFeature] = useAtom(activeFeatureAtom);
  if (!activeFeature) {
    throw new Error("activeFeature is undefined");
  }
  const setRunRequired = useSetAtom(runRequiredAtom);
  const [params, setParams] = useAtom(paramsAtom);
  const features = Object.keys(params.features || {});
  const attributes = params.features?.[activeFeature];
  const timeFeature = useAtomValue(timeFeatureAtom);
  const form = useFeatureAttributesForm(params, activeFeature);

  const { dirtyFields } = form.formState;
  const values = form.getValues();
  useEffect(() => {
    setAreConfigurationsDirty(
      // Super weird. Unless the values is a dependency, after the first form.reset() dirty fields stop being tracked
      values && Object.keys(dirtyFields).length > 0,
    );
  }, [setAreConfigurationsDirty, values, dirtyFields]);

  const nextFeature = features[features.indexOf(activeFeature) + 1];

  const onSave: SubmitHandler<InferFeatureAttributeFormValues> = (data) => {
    save(data);
  };
  const onSaveAndContinue: SubmitHandler<InferFeatureAttributeFormValues> = (
    data,
  ) => {
    save(data);
    setActiveFeature(nextFeature);
  };

  const save: SubmitHandler<InferFeatureAttributeFormValues> = (data) => {
    const newParams = getInferFeatureAttributeParamsFormValuesOnSubmit({
      data,
      feature: activeFeature,
      params,
    });
    setParams(newParams);
    if (shouldInferFeatureAttributesAgain(dirtyFields)) setRunRequired(true);

    const newDefaults = getFeatureAttributesFormDefaultValues(
      newParams,
      activeFeature,
    );
    form.reset(newDefaults);
  };

  return (
    <FormProvider {...form}>
      {attributes?.sample && (
        <FieldStatic
          {...fieldTextProps}
          label={t(translations.labels.sample)}
          value={
            <FeatureAttributeSample attributes={attributes} disableModal />
          }
          containerProps={{ className: "mb-6" }}
        />
      )}
      <form
        noValidate
        data-feature={activeFeature}
        aria-label={t(translations.form.label)}
      >
        <ErrorBoundary>
          <FeatureAttributesConfiguration
            featuresHaveTimeFeature={!!timeFeature}
          />
        </ErrorBoundary>
        <div className="flex grow flex-nowrap items-center justify-end gap-4 overflow-hidden">
          <Button
            {...buttonProps}
            color="primary"
            onClick={form.handleSubmit(onSave)}
            disabled={!areConfigurationsDirty}
          >
            <UpdateIcon className="mr-1 h-5 w-5" />
            <span>{t(translations.actions.update)}</span>
          </Button>
          {nextFeature && (
            <Button
              {...buttonProps}
              color="primary"
              onClick={form.handleSubmit(onSaveAndContinue)}
              disabled={!areConfigurationsDirty}
            >
              <UpdateIcon className="mr-1 h-5 w-5" />
              <div className="max-w-60 truncate">
                {t(translations.actions.updateAndGoToTarget, {
                  target: nextFeature,
                })}
              </div>
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
