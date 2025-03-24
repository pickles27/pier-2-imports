import { OrderPreview } from "./definitions";

export const mockOrders: OrderPreview[] = [
  {
    orderId: 1,
    purchaseDate: "2025-03-22T07:00:00.000Z",
    totalAmount: "$46.07",
    status: "Processing",
    estimatedDeliveryDate: "2025-03-29T07:00:00.000Z",
  },
  {
    orderId: 20,
    purchaseDate: "2025-03-07T08:00:00.000Z",
    totalAmount: "$237.79",
    status: "Canceled",
    estimatedDeliveryDate: null,
  },
  {
    orderId: 19,
    purchaseDate: "2025-02-09T08:00:00.000Z",
    totalAmount: "$57.84",
    status: "Processing",
    estimatedDeliveryDate: "2025-02-16T08:00:00.000Z",
  },
  {
    orderId: 18,
    purchaseDate: "2025-03-13T07:00:00.000Z",
    totalAmount: "$284.00",
    status: "Processing",
    estimatedDeliveryDate: "2025-03-20T07:00:00.000Z",
  },
];
