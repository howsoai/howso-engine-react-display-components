import { FeatureAttributes } from "@howso/engine";
import {
  ErrorBoundary,
  FieldSelectProps,
  FormModal,
  Radio,
  SecondaryButton,
  Skeleton,
  ToggleInput,
  UpdateIcon,
  WarningIcon,
} from "@howso/react-tailwind-flowbite-components";
import { Alert, Button, getTheme, Modal, Table, Tooltip } from "flowbite-react";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { MapDependentFeatureAttributesIcon } from "../../Icons";
import { FeatureAttributeSample } from "../FeatureAttributeSample";
import { FeatureAttributesConfiguration } from "../FeatureAttributesConfiguration";
import { FeatureAttributesConfigurationIssues } from "../FeatureAttributesConfigurationIssues";
import {
  FeaturesAttributesContext,
  FeaturesAttributesContextProvider,
} from "../FeaturesAttributesContext";
import { FeaturesAttributesDependencies } from "../FeaturesAttributesDependencies";
import {
  FeatureAttributeTypeField,
  featureAttributeTypeLabel,
} from "../fields";
import {
  type FeatureAttributesActiveFeatureAtom,
  type FeatureAttributesOptionsAtom,
  getFeatureAttributesFormDefaultValues,
  type InferFeatureAttributesParamsAtom,
  type InferFeatureAttributesParamsTimeFeatureAtom,
  InferFeatureAttributesRunRequiredFieldsAtom,
  useFeatureAttributesForm,
} from "../hooks";
import { IFeatureAttributePurposes } from "../types";
import {
  getFeatureAttributeConfigurationIssues,
  getInferFeatureAttributeParamsFormValuesOnSubmit,
  InferFeatureAttributeFormValues,
  setInferFeatureAttributeParamsFeatureAttributes,
  shouldInferAgain,
} from "../utils";
import { FeaturesAttributesRowsI18nBundle as i18n } from "./FeaturesAttributesRows.i18n";

export type FeaturesAttributesRowsProps = IFeatureAttributePurposes & {
  activeFeatureAtom: FeatureAttributesActiveFeatureAtom;
  loading?: boolean;
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
export const FeaturesAttributesRows: FC<FeaturesAttributesRowsProps> = ({
  purposes,
  ...props
}) => {
  const { t } = useTranslation(i18n.namespace);
  const { activeFeatureAtom, paramsAtom, optionsAtom, timeFeatureAtom } = props;
  const activeFeature = useAtomValue(activeFeatureAtom);
  const params = useAtomValue(paramsAtom);

  const features = Object.keys(params.features || {});

  return (
    <FeaturesAttributesContextProvider purposes={purposes}>
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <Table striped>
          <Table.Head>
            <TableHeadCells
              optionsAtom={optionsAtom}
              timeFeatureAtom={timeFeatureAtom}
            />
          </Table.Head>
          <Table.Body className="divide-y">
            {props.loading
              ? new Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <FeatureFields
                      key={`loading:${index}`}
                      feature={undefined}
                      {...props}
                    />
                  ))
              : features.map((featureName) => (
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
          {t(i18n.strings.state.empty)}
        </Alert>
      )}
      <Controls {...props} containerProps={{ className: "mt-4" }} />
      {activeFeature && <ConfigureModal {...props} />}
    </FeaturesAttributesContextProvider>
  );
};

type TableHeadCellsProps = {
  optionsAtom: FeatureAttributesOptionsAtom;
  timeFeatureAtom: InferFeatureAttributesParamsTimeFeatureAtom;
};
const TableHeadCells: FC<TableHeadCellsProps> = ({
  optionsAtom,
  timeFeatureAtom,
}) => {
  const { t } = useTranslation(i18n.namespace);
  const [options, setOptions] = useAtom(optionsAtom);
  const setTimeFeature = useSetAtom(timeFeatureAtom);

  // Toggle time series
  const onChangeTimeSeries = (evt: ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, time_series: evt.currentTarget.checked });
    if (!evt.currentTarget.checked) setTimeFeature(null);
  };

  return (
    <>
      <Table.HeadCell className="whitespace-nowrap">
        {t(i18n.strings.headings.feature)}
      </Table.HeadCell>
      <Table.HeadCell className="whitespace-nowrap">
        {t(i18n.strings.headings.sample)}
      </Table.HeadCell>
      <Table.HeadCell className="w-48 min-w-48 whitespace-nowrap">
        {t(featureAttributeTypeLabel)}
      </Table.HeadCell>
      <Table.HeadCell className="w-[1%] whitespace-nowrap text-center">
        <div className="flex items-center gap-2">
          {options.time_series
            ? t(i18n.strings.headings.timeFeature)
            : t(i18n.strings.headings.timeSeries)}
          <ToggleInput
            onChange={onChangeTimeSeries}
            checked={options.time_series || false}
          />
        </div>
      </Table.HeadCell>
      <Table.HeadCell className="w-[1%] whitespace-nowrap text-center">
        {t(i18n.strings.headings.configuration)}
      </Table.HeadCell>
    </>
  );
};

type FeatureFieldsProps = {
  feature: string | undefined;
} & Pick<
  FeaturesAttributesRowsProps,
  | "activeFeatureAtom"
  | "loading"
  | "optionsAtom"
  | "paramsAtom"
  | "runRequiredAtom"
  | "timeFeatureAtom"
>;
const FeatureFields: FC<FeatureFieldsProps> = ({
  activeFeatureAtom,
  feature,
  loading,
  optionsAtom,
  paramsAtom,
  runRequiredAtom,
  timeFeatureAtom,
}) => {
  const { t } = useTranslation(i18n.namespace);
  const theme = getTheme();
  const { purposes } = useContext(FeaturesAttributesContext);
  const setActiveFeature = useSetAtom(activeFeatureAtom);
  const setRunRequired = useSetAtom(runRequiredAtom);
  const [params, setParams] = useAtom(paramsAtom);
  const options = useAtomValue(optionsAtom);

  const attributes = feature ? params.features?.[feature] : undefined;
  const setFeatureType = useCallback(
    (attributes: FeatureAttributes) => {
      if (!feature) {
        return;
      }

      const newParams = setInferFeatureAttributeParamsFeatureAttributes(
        params,
        feature,
        attributes,
      );
      setParams(newParams);
      if (shouldInferAgain({ type: true })) setRunRequired(true);
    },
    [setRunRequired, setParams, params, feature],
  );
  const issues =
    attributes &&
    getFeatureAttributeConfigurationIssues(attributes, {
      purposes,
    });

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="min-w-32 text-gray-900 [overflow-wrap:anywhere] dark:text-white">
        <span>
          {loading ? <Skeleton variant="text" className="w-32" /> : feature}
        </span>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        <div className="max-w-52 truncate">
          {loading ? (
            <Skeleton variant="text" className="w-24" />
          ) : (
            <FeatureAttributeSample attributes={attributes} />
          )}
        </div>
      </Table.Cell>
      <Table.Cell className="w-48">
        <FeatureTypeControl
          attributes={attributes}
          feature={feature}
          setAttributes={setFeatureType}
          disabled={loading}
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
          <SecondaryButton
            onClick={() => setActiveFeature(feature || "")}
            disabled={loading}
          >
            {t(i18n.strings.actions.configure)}
          </SecondaryButton>

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
  feature?: string;
};
type AttributeProps = Omit<
  FieldSelectProps,
  "fieldType" | "label" | "helperText" | "onChange"
> & {
  attributes: FeatureAttributes | undefined;
  setAttributes: (attributes: FeatureAttributes) => void;
};

type FeatureTypeControlProps = InlineInputProps & AttributeProps;
// Table row feature type dropdown
const FeatureTypeControl: FC<FeatureTypeControlProps> = ({
  attributes,
  setAttributes,
  ...props
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
        {...props}
      />
    </FormProvider>
  );
};

// Table row time feature radio
type TimeFeatureControlProps = InlineInputProps &
  Pick<FeaturesAttributesRowsProps, "timeFeatureAtom"> &
  Pick<AttributeProps, "attributes"> & {
    loading?: boolean;
    disabled?: boolean;
  };
const TimeFeatureControl: FC<TimeFeatureControlProps> = ({
  attributes,
  disabled,
  loading,
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
      color="blue"
      onChange={() => {
        setTimeFeature(feature);
      }}
      checked={attributes?.time_series?.time_feature ?? false}
      disabled={loading || disabled}
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
  const { t } = useTranslation(i18n.namespace);
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
        aria-label={t(i18n.strings.form.label)}
      >
        <Modal.Header>
          {t(i18n.strings.actions["configure_{{name}}"], {
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
          <div className="flex grow flex-nowrap items-center justify-end gap-4">
            <Button color="primary" onClick={form.handleSubmit(onSave)}>
              <UpdateIcon className="mr-1 h-5 w-5" />
              <span>{t(i18n.strings.actions.update)}</span>
            </Button>
            {nextFeature && (
              <Button
                color="primary"
                onClick={form.handleSubmit(onSaveAndContinue)}
              >
                <UpdateIcon className="mr-1 h-5 w-5" />
                <div className="max-w-60 truncate">
                  {t(i18n.strings.actions["updateAndGoTo_{{target}}"], {
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

type ControlsProps = Pick<
  FeaturesAttributesRowsProps,
  "loading" | "paramsAtom"
> & {
  containerProps: React.HTMLProps<HTMLDivElement>;
};
const Controls: FC<ControlsProps> = ({
  loading,
  paramsAtom,
  containerProps,
}) => {
  return (
    <footer
      {...containerProps}
      className={twMerge(containerProps.className, "flex gap-2")}
    >
      <MapDependenciesControl loading={loading} paramsAtom={paramsAtom} />
    </footer>
  );
};

type MapDependenciesControlProps = Pick<
  FeaturesAttributesRowsProps,
  "loading" | "paramsAtom"
>;
const MapDependenciesControl: FC<MapDependenciesControlProps> = ({
  loading,
  ...props
}) => {
  const { t } = useTranslation(i18n.namespace);
  const params = useAtomValue(props.paramsAtom);
  const featuresAttributes = params.features || {};
  const features = Object.keys(featuresAttributes);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const label = t(i18n.strings.actions.mapDependents);

  return (
    <>
      <SecondaryButton onClick={onOpen} disabled={loading || !features.length}>
        <MapDependentFeatureAttributesIcon className={"mr-1"} />
        {label}
      </SecondaryButton>
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
