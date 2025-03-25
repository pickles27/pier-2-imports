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

  const handleOrderHeaderClick = async () => {
    setErrorMessage("");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderPreview.orderId}`
    );
    const order = await response.json();

    if (!response.ok) {
      setErrorMessage(
        "Something went wrong when fetching your order. Refresh and try again."
      );
    }

    if (order) {
      setOrderDetails(order);
    }
  };

  return (
    <Card padding={0}>
      <OrderCardHeader
        isCardExpanded={!!orderDetails}
        onClick={handleOrderHeaderClick}
        {...orderPreview}
      />
      {orderDetails && (
        <OrderDetails errorMessage={errorMessage} {...orderDetails} />
      )}
    </Card>
  );
};
