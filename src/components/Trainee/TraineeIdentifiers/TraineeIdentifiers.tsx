import { Identicon, Skeleton } from "@howso/react-tailwind-flowbite-components";
import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

export type TraineeIdentifiersProps = ComponentProps<"div"> & {
  id?: string;
  name?: string;
  loading?: boolean;
};
export const TraineeIdentifiers: FC<TraineeIdentifiersProps> = ({
  id,
  name,
  loading,
  ...props
}) => {
  const primary = name || id;
  const secondary = name && id ? id : undefined;

  return (
    <div
      {...props}
      className={twMerge(props.className, "flex flex-row items-center gap-4")}
    >
      <Identicon id={id} loading={loading} className="h-[32px]" />
      <div className="truncate">
        <div className="text-sm font-medium truncate">
          {loading ? <Skeleton variant="text" className="w-32" /> : primary}
        </div>
        {(loading || secondary) && (
          <div className="text-xs truncate">
            {loading ? <Skeleton variant="text" className="w-64" /> : secondary}
          </div>
        )}
      </div>
    </div>
  );
};
