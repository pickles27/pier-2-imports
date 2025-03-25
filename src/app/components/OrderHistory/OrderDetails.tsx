import { Order } from "app/lib/definitions";
import { ProductsDetailCard } from "./OrderDetailCards/ProductsDetailCard";
import { AddressCard } from "./OrderDetailCards/AddressCard";
import { TrackingInformationCard } from "./OrderDetailCards/TrackingInformationCard";

export type OrderDetailsProps = Order;

export const OrderDetails = ({
  estimatedDeliveryDate,
  orderId,
  products,
  billingAddress,
  shippingAddress,
  trackingNumber,
}: OrderDetailsProps) => {
  return (
    <section className="bg-background-secondary p-8 pt-4">
      <h3 className="text-md font-bold">Order Details #{orderId}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {!!products && <ProductsDetailCard products={products} />}
        {!!trackingNumber && (
          <TrackingInformationCard
            trackingNumber={trackingNumber}
            estimatedDeliveryDate={estimatedDeliveryDate}
          />
        )}
        {!!billingAddress && (
          <AddressCard title="Billing Address" {...billingAddress} />
        )}
        {!!shippingAddress && (
          <AddressCard title="Shipping Address" {...shippingAddress} />
        )}
      </div>
    </section>
  );
};
