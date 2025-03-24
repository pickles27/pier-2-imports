import { OrderPreview } from "app/lib/definitions";

export type OrderCardHeaderProps = OrderPreview & {
  onClick: () => void;
};

// TODO: Add content and styling

export const OrderCardHeader = ({
  onClick,
  ...order
}: OrderCardHeaderProps) => {
  return (
    <button className="w-full cursor-pointer p-8" onClick={onClick}>
      Order preview for: {JSON.stringify(order)}
    </button>
  );
};
