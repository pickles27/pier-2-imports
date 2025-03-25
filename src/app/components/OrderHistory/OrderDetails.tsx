import { Order } from "app/lib/definitions";
import { ProductsDetailCard } from "./OrderDetailCards/ProductsDetailCard";
import { AddressCard } from "./OrderDetailCards/AddressCard";
import { TrackingInformationCard } from "./OrderDetailCards/TrackingInformationCard";
import { LoadingSpinner } from "../designSystem";

export type OrderDetailsProps = {
  errorMessage?: string;
  isLoading?: boolean;
  order?: Order;
  orderId: number;
};

export const OrderDetails = ({
  errorMessage,
  isLoading,
  order,
  orderId,
}: OrderDetailsProps) => {
  return (
    <section className="bg-background-secondary p-8 pt-4">
      <h3 className="text-md font-bold">Order Details #{orderId}</h3>
      {errorMessage && <p role="alert">{errorMessage}</p>}
      {isLoading && <LoadingSpinner />}
      {order && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {!!order.products && <ProductsDetailCard products={order.products} />}
          {!!order.trackingNumber && (
            <TrackingInformationCard
              trackingNumber={order.trackingNumber}
              estimatedDeliveryDate={order.estimatedDeliveryDate}
            />
          )}
          {!!order.billingAddress && (
            <AddressCard title="Billing Address" {...order.billingAddress} />
          )}
          {!!order.shippingAddress && (
            <AddressCard title="Shipping Address" {...order.shippingAddress} />
          )}
        </div>
      )}
    </section>
  );
};
