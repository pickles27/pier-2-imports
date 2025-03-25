import { OrderPreview } from "app/lib/definitions";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { formatDate } from "./helpers/formatDate";

export type OrderCardHeaderProps = OrderPreview & {
  isCardExpanded: boolean;
  onClick: () => void;
};

export const OrderCardHeader = ({
  isCardExpanded,
  onClick,
  ...order
}: OrderCardHeaderProps) => {
  const formattedPurchaseDate = formatDate(order.purchase_date);
  const formattedDeliveryDate = formatDate(order.estimated_delivery_date);
  return (
    <button className="w-full cursor-pointer p-8" onClick={onClick}>
      <div className="flex flex-col gap-2 text-left">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-md">#{order.order_id}</span>
            <span className="text-foreground-secondary/90 text-sm font-semibold">
              {formattedPurchaseDate}
            </span>
          </div>
          <span className="bg-background-secondary py-1 px-3 rounded-full text-xs font-bold">
            {order.status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 font-semibold text-foreground-secondary text-sm">
            <span>Total Amount: {order.total_amount}</span>
            <span>Estimated Delivery: {formattedDeliveryDate}</span>
          </div>
          {isCardExpanded ? <PiCaretUpBold /> : <PiCaretDownBold />}
        </div>
      </div>
    </button>
  );
};
