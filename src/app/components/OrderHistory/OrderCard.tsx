"use client";

import { useState } from "react";
import { OrderPreview, Order } from "app/lib/definitions";
import { Card } from "../designSystem";
import { OrderDetails } from "./OrderDetails";
import { OrderCardHeader } from "./OrderCardHeader";

export type OrderCardProps = OrderPreview;

export const OrderCard = ({ ...orderPreview }: OrderCardProps) => {
  const [orderDetails, setOrderDetails] = useState<Order>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOrderHeaderClick = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderPreview.orderId}`
      );
      const order = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      if (order) {
        setOrderDetails(order);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Something went wrong while fetching your order. Refresh and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding={0}>
      <OrderCardHeader
        isCardExpanded={!!orderDetails}
        onClick={handleOrderHeaderClick}
        {...orderPreview}
      />
      {(isLoading || orderDetails || errorMessage) && (
        <OrderDetails
          isLoading={isLoading}
          errorMessage={errorMessage}
          order={orderDetails}
          // Pass order id separately to enable the order details section to display during loading.
          orderId={orderPreview.orderId}
        />
      )}
    </Card>
  );
};
