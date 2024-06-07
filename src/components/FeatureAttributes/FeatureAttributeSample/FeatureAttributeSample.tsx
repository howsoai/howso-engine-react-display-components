import { FeatureAttributes } from "@howso/openapi-client";
import { useDefaultTranslation } from "@/hooks/useDefaultTranslation";
import { Modal } from "flowbite-react";
import { FC, useState } from "react";

export type FeatureAttributeSampleProps = {
  attributes: Pick<FeatureAttributes, "data_type" | "sample">;
};
export const FeatureAttributeSample: FC<FeatureAttributeSampleProps> = ({
  attributes,
}) => {
  console.info("attributes", attributes);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  switch (true) {
    case attributes.data_type === "json":
    case attributes.data_type === "yaml":
      return (
        <>
          <button onClick={openModal} className="max-w-full">
            <code>
              {typeof attributes.sample === "string"
                ? // CSS will handle the dynamic truncation, this is just DOM length protection
                  attributes.sample.substring(0, 500)
                : JSON.stringify(attributes.sample)}
            </code>
          </button>
          {isOpen && (
            <FeatureAttributeSampleModal
              attributes={attributes}
              onClose={closeModal}
            />
          )}
        </>
      );
    case attributes.sample === null:
      return <code className="text-red-500 dark:text-red-700">null</code>;
    case attributes.data_type === "boolean":
      return (
        <code className="text-blue-500 dark:text-blue-700">
          {attributes.sample}
        </code>
      );
    case attributes.data_type === "amalgam":
    case attributes.data_type === "string":
    case attributes.data_type === "string_mixable":
    case attributes.data_type === "formatted_date_time":
      return <code>"{attributes.sample}"</code>;
    default:
      return <code>{attributes.sample}</code>;
  }
};

const FeatureAttributeSampleModal: FC<
  FeatureAttributeSampleProps & { onClose: () => void }
> = ({ attributes, onClose }) => {
  const { t } = useDefaultTranslation();
  return (
    <Modal show onClose={onClose} dismissible>
      <Modal.Header>
        {t("FeatureAttributes.FeatureAttributeSample.modal.title")}
      </Modal.Header>
      <Modal.Body>
        <pre>
          <code>
            {typeof attributes.sample === "string"
              ? attributes.sample
              : JSON.stringify(attributes.sample)}
          </code>
        </pre>
      </Modal.Body>
    </Modal>
  );
};