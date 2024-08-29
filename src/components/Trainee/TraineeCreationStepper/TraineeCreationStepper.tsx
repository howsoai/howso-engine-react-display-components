import {
  Stepper,
  type StepperProps,
} from "@howso/react-tailwind-flowbite-components";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  TraineeDefineIcon,
  TraineeLoadIcon,
  TraineeTrainIcon,
} from "../../Icons";
import { TraineeCreationStepperI18nBundle as i18n } from "./TraineeCreationStepper.i18n";

export type TraineeCreationStepperProps = Pick<
  StepperProps,
  "vertical" | "step" | "marginBottom"
> & {};
const TraineeCreationStepperComponent: FC<TraineeCreationStepperProps> = ({
  ...props
}) => {
  const { t } = useTranslation(i18n.namespace);

  return (
    <Stepper steps={3} {...props}>
      <Stepper.Item
        className={TraineeCreationStepper.classes.item}
        position={0}
      >
        <Stepper.Icon>
          <TraineeLoadIcon className={TraineeCreationStepper.classes.icon} />
        </Stepper.Icon>
        <Stepper.Content>
          <Stepper.Content.Heading
            className={TraineeCreationStepper.classes.heading}
          >
            {t(i18n.strings.load.title)}
          </Stepper.Content.Heading>
          <Stepper.Content.Description
            className={TraineeCreationStepper.classes.description}
          >
            {t(i18n.strings.load.description)}
          </Stepper.Content.Description>
        </Stepper.Content>
      </Stepper.Item>

      {/* <Stepper.Spacer /> */}

      <Stepper.Item
        className={TraineeCreationStepper.classes.item}
        position={1}
      >
        <Stepper.Icon>
          <TraineeDefineIcon className={TraineeCreationStepper.classes.icon} />
        </Stepper.Icon>
        <Stepper.Content>
          <Stepper.Content.Heading
            className={TraineeCreationStepper.classes.heading}
          >
            {t(i18n.strings.define.title)}
          </Stepper.Content.Heading>
          <Stepper.Content.Description
            className={TraineeCreationStepper.classes.description}
          >
            {t(i18n.strings.define.description)}
          </Stepper.Content.Description>
        </Stepper.Content>
      </Stepper.Item>

      {/* <Stepper.Spacer /> */}

      <Stepper.Item
        className={TraineeCreationStepper.classes.item}
        position={2}
      >
        <Stepper.Icon>
          <TraineeTrainIcon className={TraineeCreationStepper.classes.icon} />
        </Stepper.Icon>
        <Stepper.Content>
          <Stepper.Content.Heading
            className={TraineeCreationStepper.classes.heading}
          >
            {t(i18n.strings.train.title)}
          </Stepper.Content.Heading>
          <Stepper.Content.Description
            className={TraineeCreationStepper.classes.description}
          >
            {t(i18n.strings.train.description)}
          </Stepper.Content.Description>
        </Stepper.Content>
      </Stepper.Item>
    </Stepper>
  );
};

export const TraineeCreationStepper = Object.assign(
  TraineeCreationStepperComponent,
  {
    classes: {
      item: "grow",
      icon: "",
      heading: "",
      description: "hidden md:block",
    },
  },
);
