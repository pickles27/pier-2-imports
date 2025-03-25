import { Address } from "app/lib/definitions";
import { BaseDetailCard } from "./BaseDetailCard";

export type AddressCardProps = Address & {
  title: string;
};

export const AddressCard = ({
  name,
  address1,
  address2,
  city,
  state,
  zip,
  title,
}: AddressCardProps) => (
  <BaseDetailCard title={title}>
    <div className="flex flex-col gap-1 text-foreground-secondary text-sm">
      {[name, address1, address2, `${city}, ${state} ${zip}`]
        .filter(Boolean)
        .map((element) => (
          <span key={element}>{element}</span>
        ))}
    </div>
  </BaseDetailCard>
);
