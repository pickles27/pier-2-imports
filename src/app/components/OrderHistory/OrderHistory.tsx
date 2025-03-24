import { OrderPreview } from "app/lib/definitions";
import { OrderCard } from "./OrderCard";

export type OrdersHistoryProps = {
  query: string;
};

export const OrderHistory = async ({ query }: OrdersHistoryProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/?${query}`
  );
  const orders: OrderPreview[] = await response.json();

  if (!response.ok) {
    // TODO: replace with empty state
    return <p>oh noes</p>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-bold">Order History</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.orderId}>
            <OrderCard {...order} />
          </div>
        ))}
      </div>
    </div>
  );
};
