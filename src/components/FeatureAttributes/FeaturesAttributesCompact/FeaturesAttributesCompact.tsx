import { FC } from "react";
import { Button, Alert, getTheme } from "flowbite-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FeatureAttributeSample } from "../FeatureAttributeSample";
import { FeatureAttributesConfiguration } from "../FeatureAttributesConfiguration";
import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import { useDefaultTranslation } from "@/hooks";
import {
  ErrorBoundary,
  FieldSelect,
  UpdateIcon,
  WarningIcon,
} from "@howso/react-tailwind-flowbite-components";
import {
  FeatureAttributeFormValues,
  areFeatureAttributesValid,
  getFeatureAttributesForType,
  getFeatureAttributesFromFormData,
} from "../utils";
import { MapDependentFeatureAttributesIcon } from "@/components/Icons";
import { translations } from "./constants";
import {
  type ActiveFeatureAtom,
  type FeatureAttributesIndexAtom,
  type SetFeatureAttributesAtom,
  type FeatureOptionsAtom,
  type TimeFeatureAtom,
} from "../hooks";
import { twMerge } from "tailwind-merge";

export type FeaturesAttributesCompactProps = {
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
export const FeaturesAttributesCompact: FC<FeaturesAttributesCompactProps> = (
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
  const features = Object.keys(featuresAttributes);

  return (
    <ErrorBoundary>
      <Header
        activeFeatureAtom={activeFeatureAtom}
        featureAttributesIndexAtom={featureAttributesIndexAtom}
        optionsAtom={optionsAtom}
        timeFeatureAtom={timeFeatureAtom}
      />
      {!features.length ? (
        <Alert color="warning" icon={WarningIcon}>
          {t(translations.state.empty)}
        </Alert>
      ) : !activeFeature ? (
        <Alert color="info">{t(translations.state.unselected)}</Alert>
      ) : (
        <Configuration {...props} />
      )}
    </ErrorBoundary>
  );
};

type HeaderProps = {
  activeFeatureAtom: ActiveFeatureAtom;
  featureAttributesIndexAtom: FeatureAttributesIndexAtom;
  optionsAtom: FeatureOptionsAtom;
  timeFeatureAtom: TimeFeatureAtom;
};
type HeaderFormValues = {
  feature: string | undefined;
  timeFeature: string | undefined;
};
const Header: FC<HeaderProps> = ({
  activeFeatureAtom,
  featureAttributesIndexAtom,
  optionsAtom,
  timeFeatureAtom,
}) => {
  const { t } = useDefaultTranslation();
  const featuresAttributes = useAtomValue(featureAttributesIndexAtom);
  const features = Object.keys(featuresAttributes);

  const [activeFeature, setActiveFeature] = useAtom(activeFeatureAtom);
  const [timeFeature, setTimeFeature] = useAtom(timeFeatureAtom);
  const [options, setOptions] = useAtom(optionsAtom);

  const form = useForm<HeaderFormValues>({
    defaultValues: { feature: features.at(0) },
  });

  return (
    <header className="flex flow-row gap-2 mb-4">
      <FormProvider {...form}>
        <FieldSelect
          label={t(translations.header.fields.feature.label)}
          name="feature"
          onChange={async (event) => {
            setActiveFeature(event.target.value);
          }}
          defaultValue={activeFeature || undefined}
        >
          <option value=""></option>
          {features.map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}
        </FieldSelect>

        <FieldSelect
          label={t(translations.header.fields.timeFeature.label)}
          name="timeFeature"
          onChange={async (event) => {
            const time_series = !!event.target.value;
            setOptions({ ...options, time_series: time_series });
            if (!time_series) setTimeFeature(event.target.value);
          }}
          defaultValue={timeFeature?.name}
        >
          <option value=""></option>
          {features.map((feature) => (
            <option key={feature} value={feature}>
              {feature}
            </option>
          ))}
        </FieldSelect>
      </FormProvider>

      <Button color={"light"} disabled>
        <MapDependentFeatureAttributesIcon className={"mr-1"} />
        {t(translations.actions.mapDependents)}
      </Button>
    </header>
  );
};

type ConfigurationProps = Pick<
  FeaturesAttributesCompactProps,
  | "activeFeatureAtom"
  | "featureAttributesIndexAtom"
  | "setFeatureAttributesAtom"
  | "timeFeatureAtom"
>;
const Configuration: FC<ConfigurationProps> = (props) => {
  const { activeFeatureAtom, featureAttributesIndexAtom } = props;

  const { t } = useDefaultTranslation();
  const theme = getTheme();
  const activeFeature = useAtomValue(activeFeatureAtom);
  const featuresAttributes = useAtomValue(featureAttributesIndexAtom);
  const attributes = activeFeature
    ? featuresAttributes[activeFeature]
    : undefined;
  if (!attributes) {
    throw new Error(`attributes are not defined for ${activeFeature}`);
  }
  const isValid = areFeatureAttributesValid(attributes);

  return (
    <section>
      <header className="mb-2 flex gap-4 items-baseline justify-between">
        <div className="flex gap-1 items-center">
          <h3 className="text-xl">
            {t(translations.actions.configureName, {
              name: activeFeature,
            })}
          </h3>
          {!isValid && (
            <WarningIcon
              className={twMerge(
                "ml-1 text-lg",
                theme.label.root.colors.warning,
              )}
              title={t(translations.labels.invalidConfiguration)}
            />
          )}
        </div>
        <div>
          {t(translations.labels.sample)}:{" "}
          <FeatureAttributeSample attributes={attributes} disableModal />
        </div>
      </header>
      <Form {...props} />
    </section>
  );
};

const Form: FC<ConfigurationProps> = ({
  featureAttributesIndexAtom,
  activeFeatureAtom,
  setFeatureAttributesAtom,
  timeFeatureAtom,
}) => {
  const { t } = useDefaultTranslation();
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
        aria-label={t(translations.form.label)}
      >
        <ErrorBoundary>
          <FeatureAttributesConfiguration
            featuresHaveTimeFeature={!!timeFeature}
          />
        </ErrorBoundary>
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
      </form>
    </FormProvider>
  );
};

// type MapDependenciesControlProps = Pick<
//   FeaturesAttributesRowsProps,
//   "featureAttributesIndexAtom"
// >;
// const MapDependenciesControl: FC<MapDependenciesControlProps> = (props) => {
//   const { t } = useDefaultTranslation();
//   const [isOpen, setIsOpen] = useState(false);
//   const onOpen = () => {
//     setIsOpen(true);
//   };
//   const onClose = () => {
//     setIsOpen(false);
//   };

//   const label = ;
//   return (
//     <>
//       <Button color={"light"} onClick={onOpen}>
//         <MapDependentFeatureAttributesIcon className={"mr-1"} />
//         {label}
//       </Button>
//       {isOpen && (
//         <FormModal dismissible show size={"3xl"} onClose={onClose}>
//           <form noValidate aria-label={label}>
//             <Modal.Header>{label}</Modal.Header>
//             <Modal.Body>
//               <ErrorBoundary>
//                 <FeaturesAttributesDependencies {...props} onUpdate={onClose} />
//               </ErrorBoundary>
//             </Modal.Body>
//           </form>
//         </FormModal>
//       )}
//     </>
//   );
// };
