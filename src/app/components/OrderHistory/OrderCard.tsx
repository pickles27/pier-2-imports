import { OrderPreview } from "app/lib/definitions";
import { Card } from "../designSystem";

export type OrderCardProps = OrderPreview;

export const OrderCard = ({ ...order }: OrderCardProps) => {
  return <Card>{JSON.stringify(order)}</Card>;
};
