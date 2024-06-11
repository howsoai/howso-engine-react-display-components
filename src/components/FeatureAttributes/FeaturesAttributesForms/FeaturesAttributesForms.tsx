import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { FeatureAttributes } from "@howso/openapi-client";
import { Table, Button, Radio, Modal, Alert, getTheme } from "flowbite-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FeatureAttributeSample } from "../FeatureAttributeSample";
import { FeatureAttributesConfiguration } from "../FeatureAttributesConfiguration";
import {
  FeatureAttributeTypeField,
  featureAttributeTypeLabel,
} from "../fields";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { twMerge } from "tailwind-merge";
import {
  FeatureAttributeFormValues,
  getFeatureAttributesFromFormData,
} from "./utils";
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
  areFeatureAttributesValid,
  getFeatureAttributesForType,
} from "../utils";
import { MapDependentFeatureAttributesIcon } from "@/components/Icons";
import { featuresAttributesFormsTranslations } from "./constants";
import {
  type ActiveFeatureAtom,
  type FeatureAttributesIndexAtom,
  type SetFeatureAttributesAtom,
  type FeatureOptionsAtom,
  type TimeFeatureAtom,
} from "../hooks";

export type FeaturesAttributesFormsProps = {
  activeFeatureAtom: ActiveFeatureAtom;
  featureAttributesIndexAtom: FeatureAttributesIndexAtom;
  setFeatureAttributesAtom: SetFeatureAttributesAtom;
  optionsAtom: FeatureOptionsAtom;
  timeFeatureAtom: TimeFeatureAtom;
};
/**
 * A specialized view of all feature attributes at once.
 * Controls exist to expose a time feature, configuration errors, type, and samples simultaneously.
 *
 * ⚠️ This component relies heavily on Modal components, and is unsuited to Jupyter Notebook integrations.
 **/
export const FeaturesAttributesForms: FC<FeaturesAttributesFormsProps> = (
  props,
) => {
  const { t } = useDefaultTranslation();
  const {
    activeFeatureAtom,
    featureAttributesIndexAtom,
    optionsAtom,
    timeFeatureAtom,
  } = props;
  const activeFeature = useAtomValue(activeFeatureAtom);
  const featuresAttributes = useAtomValue(featureAttributesIndexAtom);
  const [options, setOptions] = useAtom(optionsAtom);
  const setTimeFeature = useSetAtom(timeFeatureAtom);

  const features = Object.keys(featuresAttributes);

  // Toggle time series
  const onChangeTimeSeries = (evt: ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, time_series: evt.currentTarget.checked });
    if (!evt.currentTarget.checked) setTimeFeature(null);
  };

  return (
    <>
      <ErrorBoundary>
        <div className="relative overflow-x-auto rounded-lg shadow-md">
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="whitespace-nowrap">
                {t(
                  "FeatureAttributes.FeaturesAttributesForms.headings.feature",
                )}
              </Table.HeadCell>
              <Table.HeadCell className="whitespace-nowrap">
                {t("FeatureAttributes.FeaturesAttributesForms.headings.sample")}
              </Table.HeadCell>
              <Table.HeadCell className="w-48 min-w-48 whitespace-nowrap">
                {t(featureAttributeTypeLabel)}
              </Table.HeadCell>
              <Table.HeadCell className="w-[1%] whitespace-nowrap text-center">
                <div className="flex items-center gap-2">
                  {options.time_series
                    ? t(
                        "FeatureAttributes.FeaturesAttributesForms.headings.timeFeature",
                      )
                    : t(
                        "FeatureAttributes.FeaturesAttributesForms.headings.timeSeries",
                      )}
                  <ToggleInput
                    onChange={onChangeTimeSeries}
                    checked={options.time_series || false}
                  />
                </div>
              </Table.HeadCell>
              <Table.HeadCell className="w-[1%] whitespace-nowrap text-center">
                {t(
                  "FeatureAttributes.FeaturesAttributesForms.headings.configuration",
                )}
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
            {t("FeatureAttributes.FeaturesAttributesForms.state.empty")}
          </Alert>
        )}
        <Controls {...props} containerProps={{ className: "mt-4" }} />
      </ErrorBoundary>
      {activeFeature && <ConfigureModal {...props} />}
    </>
  );
};

type FeatureFieldsProps = {
  feature: string;
} & Pick<
  FeaturesAttributesFormsProps,
  | "activeFeatureAtom"
  | "featureAttributesIndexAtom"
  | "setFeatureAttributesAtom"
  | "optionsAtom"
  | "timeFeatureAtom"
>;
const FeatureFields: FC<FeatureFieldsProps> = ({
  activeFeatureAtom,
  featureAttributesIndexAtom,
  feature,
  setFeatureAttributesAtom,
  optionsAtom,
  timeFeatureAtom,
}) => {
  const { t } = useDefaultTranslation();
  const theme = getTheme();
  const setActiveFeature = useSetAtom(activeFeatureAtom);
  const featuresAttributes = useAtomValue(featureAttributesIndexAtom);
  const options = useAtomValue(optionsAtom);
  const setFeatureAttributes = useSetAtom(setFeatureAttributesAtom);

  const attributes = featuresAttributes[feature];
  const setFeatureType = useCallback(
    (attributes: FeatureAttributes) => {
      setFeatureAttributes(feature, attributes, { type: true });
    },
    [feature, setFeatureAttributes],
  );
  const isValid = areFeatureAttributesValid(attributes);

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
            <span>
              {t(featuresAttributesFormsTranslations.actions.configure)}
            </span>
          </Button>

          {!isValid && (
            <WarningIcon
              className={twMerge(
                "ml-1 text-lg",
                theme.label.root.colors.warning,
              )}
              title={t(
                "FeatureAttributes.FeaturesAttributesForms.labels.invalid_configuration",
                {
                  ns: "engine",
                },
              )}
            />
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
  attributes: FeatureAttributes;
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

  return (
    <FormProvider {...form}>
      <FeatureAttributeTypeField
        onChange={onChange}
        label={undefined}
        helperText={undefined}
      />
    </FormProvider>
  );
};

// Table row time feature radio
type TimeFeatureControlProps = InlineInputProps &
  Pick<FeaturesAttributesFormsProps, "timeFeatureAtom"> &
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
  FeaturesAttributesFormsProps,
  | "activeFeatureAtom"
  | "featureAttributesIndexAtom"
  | "setFeatureAttributesAtom"
  | "timeFeatureAtom"
>;
const ConfigureModal: FC<ConfigureModalProps> = (props) => {
  const [activeFeature, setActiveFeature] = useAtom(props.activeFeatureAtom);
  const onClose = useCallback(() => setActiveFeature(null), [setActiveFeature]);

  return (
    <FormModal dismissible show size={"3xl"} onClose={onClose}>
      {/* Purpose using `key` here to force the component to load and unload, creating new `useForm` defaults */}
      <Form key={activeFeature} {...props} onClose={onClose} />
    </FormModal>
  );
};

const Form: FC<ConfigureModalProps & { onClose: () => void }> = ({
  featureAttributesIndexAtom,
  activeFeatureAtom,
  setFeatureAttributesAtom,
  timeFeatureAtom,
  onClose,
}) => {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useAtom(activeFeatureAtom);
  if (!activeFeature) {
    throw new Error("activeFeature is undefined");
  }
  const featuresAttributes = useAtomValue(featureAttributesIndexAtom);
  const attributes = featuresAttributes[activeFeature];
  const setFeatureAttributes = useSetAtom(setFeatureAttributesAtom);
  const timeFeature = useAtomValue(timeFeatureAtom);

  const form = useForm<FeatureAttributeFormValues>({
    defaultValues: {
      ...getFeatureAttributesForType(attributes),
      is_datetime: !!attributes.date_time_format,
    },
    shouldUnregister: true,
  });

  const { dirtyFields } = form.formState;
  const features = Object.keys(featuresAttributes);
  const nextFeature = features[features.indexOf(activeFeature) + 1];

  const onSave: SubmitHandler<FeatureAttributeFormValues> = (data) => {
    save(data);
    onClose();
  };
  const onSaveAndContinue: SubmitHandler<FeatureAttributeFormValues> = (
    data,
  ) => {
    save(data);
    setActiveFeature(nextFeature);
  };

  const save: SubmitHandler<FeatureAttributeFormValues> = (data) => {
    const attributes = getFeatureAttributesFromFormData(data);
    setFeatureAttributes(activeFeature, attributes, dirtyFields);
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        data-feature={activeFeature}
        aria-label={t(featuresAttributesFormsTranslations.form.label)}
      >
        <Modal.Header>
          {t(featuresAttributesFormsTranslations.actions.configureName, {
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
              <span>
                {t(featuresAttributesFormsTranslations.actions.update)}
              </span>
            </Button>
            {nextFeature && (
              <Button
                color="primary"
                onClick={form.handleSubmit(onSaveAndContinue)}
              >
                <UpdateIcon className="mr-1 h-5 w-5" />
                <div className="max-w-60 truncate">
                  {t(
                    featuresAttributesFormsTranslations.actions
                      .updateAndGoToTarget,
                    {
                      target: nextFeature,
                    },
                  )}
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
  FeaturesAttributesFormsProps,
  "featureAttributesIndexAtom"
> & {
  containerProps: React.HTMLProps<HTMLDivElement>;
};
const Controls: FC<ControlsProps> = ({
  featureAttributesIndexAtom,
  containerProps,
}) => {
  return (
    <footer
      {...containerProps}
      className={twMerge(containerProps.className, "flex gap-2")}
    >
      <MapDependenciesControl
        featureAttributesIndexAtom={featureAttributesIndexAtom}
      />
    </footer>
  );
};

type MapDependenciesControlProps = Pick<
  FeaturesAttributesFormsProps,
  "featureAttributesIndexAtom"
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

  const label = t(featuresAttributesFormsTranslations.actions.mapDependents);
  return (
    <>
      <Button color={"light"} onClick={onOpen}>
        <MapDependentFeatureAttributesIcon className={"mr-1"} />
        {label}
      </Button>
      {isOpen && (
        <FormModal dismissible show size={"3xl"} onClose={onClose}>
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
