import { Order } from "app/lib/definitions";
import { BaseDetailCard } from "./BaseDetailCard";
import { FaTruck } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { formatDate } from "../helpers/formatDate";

export type TrackingInformationCardProps = Pick<
  Order,
  "trackingNumber" | "estimatedDeliveryDate"
>;

export const TrackingInformationCard = ({
  estimatedDeliveryDate,
  trackingNumber,
}: TrackingInformationCardProps) => (
  <BaseDetailCard title="Tracking Information">
    <div className="flex flex-col gap-2 text-sm font-bold">
      <div className="flex items-center gap-1">
        <FaTruck />
        <span>Tracking Information: {trackingNumber}</span>
      </div>
      {estimatedDeliveryDate && (
        <div className="flex items-center gap-1">
          <IoMdCheckmarkCircle />
          <span>
            Estimated Delivery Date: {formatDate(estimatedDeliveryDate)}
          </span>
        </div>
      )}
    </div>
  </BaseDetailCard>
);
