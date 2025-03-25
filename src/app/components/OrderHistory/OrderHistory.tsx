import { OrderPreview } from "app/lib/definitions";
import { OrderCard } from "./OrderCard";
import { Card } from "../designSystem";

export type OrdersHistoryProps = {
  query: string;
};

export const OrderHistory = async ({ query }: OrdersHistoryProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/?${query}`
  );
  const orders: OrderPreview[] = await response.json();

  if (!response.ok) {
    // TODO: replace with non-ugly error component
    return (
      <Card>
        <p role="alert">oh noes</p>
      </Card>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-lg font-bold">Order History</h2>
      {orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.orderId}>
              <OrderCard {...order} />
            </div>
          ))}
        </div>
      ) : (
        <ZeroResults />
      )}
    </div>
  );
};

const ZeroResults = () => (
  <Card>
    <div className="flex flex-col items-center text-sm text-center">
      <p>
        Your search returned zero results. Please double check your email and/or
        phone number and try again.
      </p>
      <div className="w-1/4 my-2 text-gray-300">
        <hr />
      </div>
      <p>If the issue persists, call customer support at (333) 333-3333.</p>
    </div>
  </Card>
);
