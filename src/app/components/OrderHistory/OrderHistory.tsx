import { OrderPreview } from "app/lib/definitions";
import { OrderCard } from "./OrderCard";

export type OrdersHistoryProps = {
  orders: OrderPreview[];
};

export const OrderHistory = ({ orders }: OrdersHistoryProps) => (
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
