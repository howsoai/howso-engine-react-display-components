import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  Table,
  Button,
  Radio,
  Modal,
  Alert,
  getTheme,
  Tooltip,
} from "flowbite-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FeatureAttributeSample } from "../FeatureAttributeSample";
import { FeatureAttributesConfiguration } from "../FeatureAttributesConfiguration";
import {
  FeatureAttributeTypeField,
  featureAttributeTypeLabel,
} from "../fields";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";
import { FeaturesAttributesDependencies } from "../FeaturesAttributesDependencies";
import { useDefaultTranslation } from "@/hooks";
import {
  ErrorBoundary,
  FormModal,
  ToggleInput,
  UpdateIcon,
  WarningIcon,
} from "@howso/react-tailwind-flowbite-components";
import {
  InferFeatureAttributeFormValues,
  getFeatureAttributeConfigurationIssues,
  getInferFeatureAttributeParamsFormValuesOnSubmit,
  setInferFeatureAttributeParamsFeatureAttributes,
  shouldInferAgain,
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
import { FeaturesAttributesContextProvider } from "../FeaturesAttributesContext";
import { FeatureAttributesConfigurationIssues } from "../FeatureAttributesConfigurationIssues";

export type FeaturesAttributesRowsProps = {
  activeFeatureAtom: FeatureAttributesActiveFeatureAtom;
  runRequiredAtom: InferFeatureAttributesRunRequiredFieldsAtom;
  paramsAtom: InferFeatureAttributesParamsAtom;
  optionsAtom: FeatureAttributesOptionsAtom;
  timeFeatureAtom: InferFeatureAttributesParamsTimeFeatureAtom;
};
/**
 * A specialized view of all feature attributes at once.
 * Controls exist to expose a time feature, configuration errors, type, and samples simultaneously.
 *
 * ⚠️ This component relies heavily on Modal components, and is unsuited to Jupyter Notebook integrations.
 **/
export const FeaturesAttributesRows: FC<FeaturesAttributesRowsProps> = (
  props,
) => {
  const { t } = useDefaultTranslation();
  const { activeFeatureAtom, paramsAtom, optionsAtom, timeFeatureAtom } = props;
  const activeFeature = useAtomValue(activeFeatureAtom);
  const params = useAtomValue(paramsAtom);
  const [options, setOptions] = useAtom(optionsAtom);
  const setTimeFeature = useSetAtom(timeFeatureAtom);

  const features = Object.keys(params.features || {});

  // Toggle time series
  const onChangeTimeSeries = (evt: ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, time_series: evt.currentTarget.checked });
    if (!evt.currentTarget.checked) setTimeFeature(null);
  };

  return (
    <FeaturesAttributesContextProvider>
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="whitespace-nowrap">
              {t(translations.headings.feature)}
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              {t(translations.headings.sample)}
            </Table.HeadCell>
            <Table.HeadCell className="w-48 min-w-48 whitespace-nowrap">
              {t(featureAttributeTypeLabel)}
            </Table.HeadCell>
            <Table.HeadCell className="w-[1%] whitespace-nowrap text-center">
              <div className="flex items-center gap-2">
                {options.time_series
                  ? t(translations.headings.timeFeature)
                  : t(translations.headings.timeSeries)}
                <ToggleInput
                  onChange={onChangeTimeSeries}
                  checked={options.time_series || false}
                />
              </div>
            </Table.HeadCell>
            <Table.HeadCell className="w-[1%] whitespace-nowrap text-center">
              {t(translations.headings.configuration)}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {features.map((featureName) => (
              <FeatureFields
                key={featureName}
                feature={featureName}
                {...props}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
      {!features.length && (
        <Alert color="warning" icon={WarningIcon}>
          {t(translations.state.empty)}
        </Alert>
      )}
      <Controls {...props} containerProps={{ className: "mt-4" }} />
      {activeFeature && <ConfigureModal {...props} />}
    </FeaturesAttributesContextProvider>
  );
};

type FeatureFieldsProps = {
  feature: string;
} & Pick<
  FeaturesAttributesRowsProps,
  | "activeFeatureAtom"
  | "paramsAtom"
  | "optionsAtom"
  | "runRequiredAtom"
  | "timeFeatureAtom"
>;
const FeatureFields: FC<FeatureFieldsProps> = ({
  activeFeatureAtom,
  runRequiredAtom,
  paramsAtom,
  feature,
  optionsAtom,
  timeFeatureAtom,
}) => {
  const { t } = useDefaultTranslation();
  const theme = getTheme();
  const setActiveFeature = useSetAtom(activeFeatureAtom);
  const setRunRequired = useSetAtom(runRequiredAtom);
  const [params, setParams] = useAtom(paramsAtom);
  const options = useAtomValue(optionsAtom);

  const attributes = params.features?.[feature];
  const setFeatureType = useCallback(
    (attributes: FeatureAttributes) => {
      const newParams = setInferFeatureAttributeParamsFeatureAttributes(
        params,
        feature,
        attributes,
      );
      setParams(newParams);
      if (shouldInferAgain({ type: true })) setRunRequired(true);
    },
    [setRunRequired, params, feature],
  );
  const issues = getFeatureAttributeConfigurationIssues(attributes);

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="min-w-32 text-gray-900 [overflow-wrap:anywhere] dark:text-white">
        <span>{feature}</span>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        <div className="max-w-52 truncate">
          <FeatureAttributeSample attributes={attributes} />
        </div>
      </Table.Cell>
      <Table.Cell className="w-48">
        <FeatureTypeControl
          attributes={attributes}
          feature={feature}
          setAttributes={setFeatureType}
        />
      </Table.Cell>
      <Table.Cell className="w-[1%] text-center">
        {options.time_series && (
          <TimeFeatureControl
            attributes={attributes}
            feature={feature}
            timeFeatureAtom={timeFeatureAtom}
          />
        )}
      </Table.Cell>
      <Table.Cell className="w-[1%] whitespace-nowrap text-center">
        <div className="flex items-center">
          <Button color={"light"} onClick={() => setActiveFeature(feature)}>
            <span>{t(translations.actions.configure)}</span>
          </Button>

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
      </Table.Cell>
    </Table.Row>
  );
};

type InlineInputProps = {
  feature: string;
};
type AttributeProps = {
  attributes: FeatureAttributes | undefined;
  setAttributes: (attributes: FeatureAttributes) => void;
};

type FeatureTypeControlProps = InlineInputProps & AttributeProps;
// Table row feature type dropdown
const FeatureTypeControl: FC<FeatureTypeControlProps> = ({
  attributes,
  setAttributes,
}) => {
  const form = useForm<FeatureAttributes>({ defaultValues: attributes });

  const onChange = useCallback(async () => {
    const values = form.getValues();
    setAttributes(values);
  }, [form, setAttributes]);

  useEffect(() => {
    if (!attributes) {
      return;
    }
    const values = form.getValues();
    if (values.type === attributes.type) {
      return;
    }

    form.resetField("type", { defaultValue: attributes.type });
  }, [form, attributes]);

  return (
    <FormProvider {...form}>
      <FeatureAttributeTypeField
        fieldType="select"
        onChange={onChange}
        label={undefined}
        helperText={undefined}
      />
    </FormProvider>
  );
};

// Table row time feature radio
type TimeFeatureControlProps = InlineInputProps &
  Pick<FeaturesAttributesRowsProps, "timeFeatureAtom"> &
  Pick<AttributeProps, "attributes"> & { disabled?: boolean };
const TimeFeatureControl: FC<TimeFeatureControlProps> = ({
  attributes,
  disabled,
  feature,
  timeFeatureAtom,
}) => {
  const [timeFeature, setTimeFeature] = useAtom(timeFeatureAtom);
  useEffect(() => {
    // Clear time feature when switched to non-continuous type
    if (feature === timeFeature?.name && attributes?.type !== "continuous")
      setTimeFeature(null);
  }, [attributes?.type, timeFeature, setTimeFeature, feature]);

  if (attributes?.type !== "continuous") return null;

  return (
    <Radio
      name="time_feature"
      onChange={() => {
        setTimeFeature(feature);
      }}
      checked={attributes?.time_series?.time_feature ?? false}
      disabled={disabled}
    />
  );
};

type ConfigureModalProps = Pick<
  FeaturesAttributesRowsProps,
  "activeFeatureAtom" | "paramsAtom" | "runRequiredAtom" | "timeFeatureAtom"
>;
const ConfigureModal: FC<ConfigureModalProps> = (props) => {
  const [activeFeature, setActiveFeature] = useAtom(props.activeFeatureAtom);
  const onClose = useCallback(() => setActiveFeature(null), [setActiveFeature]);

  return (
    <FormModal dismissible show size={"4xl"} onClose={onClose}>
      {/* Purpose using `key` here to force the component to load and unload, creating new `useForm` defaults */}
      <Form key={activeFeature} {...props} onClose={onClose} />
    </FormModal>
  );
};

const Form: FC<ConfigureModalProps & { onClose: () => void }> = ({
  activeFeatureAtom,
  runRequiredAtom,
  paramsAtom,
  timeFeatureAtom,
  onClose,
}) => {
  const { t } = useDefaultTranslation();
  const [activeFeature, setActiveFeature] = useAtom(activeFeatureAtom);
  if (!activeFeature) {
    throw new Error("activeFeature is undefined");
  }
  const setRunRequired = useSetAtom(runRequiredAtom);
  const [params, setParams] = useAtom(paramsAtom);
  const timeFeature = useAtomValue(timeFeatureAtom);
  const form = useFeatureAttributesForm(params, activeFeature);

  const { dirtyFields } = form.formState;
  const features = Object.keys(params.features || {});
  const nextFeature = features[features.indexOf(activeFeature) + 1];

  const onSave: SubmitHandler<InferFeatureAttributeFormValues> = (data) => {
    save(data);
    onClose();
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
    if (shouldInferAgain(dirtyFields)) setRunRequired(true);

    const newDefaults = getFeatureAttributesFormDefaultValues(
      newParams,
      activeFeature,
    );
    form.reset(newDefaults, { keepDirty: false, keepDefaultValues: false });
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        data-feature={activeFeature}
        aria-label={t(translations.form.label)}
      >
        <Modal.Header>
          {t(translations.actions.configureName, {
            name: activeFeature,
          })}
        </Modal.Header>
        <Modal.Body>
          <ErrorBoundary>
            <FeatureAttributesConfiguration
              featuresHaveTimeFeature={!!timeFeature}
            />
          </ErrorBoundary>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex grow flex-nowrap items-center justify-end gap-4 overflow-hidden">
            <Button color="primary" onClick={form.handleSubmit(onSave)}>
              <UpdateIcon className="mr-1 h-5 w-5" />
              <span>{t(translations.actions.update)}</span>
            </Button>
            {nextFeature && (
              <Button
                color="primary"
                onClick={form.handleSubmit(onSaveAndContinue)}
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
        </Modal.Footer>
      </form>
    </FormProvider>
  );
};

type ControlsProps = Pick<FeaturesAttributesRowsProps, "paramsAtom"> & {
  containerProps: React.HTMLProps<HTMLDivElement>;
};
const Controls: FC<ControlsProps> = ({ paramsAtom, containerProps }) => {
  return (
    <footer
      {...containerProps}
      className={twMerge(containerProps.className, "flex gap-2")}
    >
      <MapDependenciesControl paramsAtom={paramsAtom} />
    </footer>
  );
};

type MapDependenciesControlProps = Pick<
  FeaturesAttributesRowsProps,
  "paramsAtom"
>;
const MapDependenciesControl: FC<MapDependenciesControlProps> = (props) => {
  const { t } = useDefaultTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const label = t(translations.actions.mapDependents);
  return (
    <>
      <Button color={"light"} onClick={onOpen}>
        <MapDependentFeatureAttributesIcon className={"mr-1"} />
        {label}
      </Button>
      {isOpen && (
        <FormModal dismissible show size={"4xl"} onClose={onClose}>
          <form noValidate aria-label={label}>
            <Modal.Header>{label}</Modal.Header>
            <Modal.Body>
              <ErrorBoundary>
                <FeaturesAttributesDependencies {...props} onUpdate={onClose} />
              </ErrorBoundary>
            </Modal.Body>
          </form>
        </FormModal>
      )}
    </>
  );
};
