import { Order } from "app/lib/definitions";

export type OrderDetailsProps = Order;

// if products.length > 1, render Products card
// if tracking number exists, render tracking into
// if shipping info exists render shipping card
// if billing info exists render billing card

// render cards in grid and ensure they stack properly on mobile

export const OrderDetails = ({ order_id, ...rest }: OrderDetailsProps) => {
  return (
    <section className="bg-background-secondary p-8">
      <h4>Order Details #{order_id}</h4>
      <p>{JSON.stringify(rest)}</p>
    </section>
  );
};
