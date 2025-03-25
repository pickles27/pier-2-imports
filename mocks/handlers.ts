import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/orders", () => {
    return HttpResponse.json([
      {
        orderId: 101,
        purchaseDate: "2025-03-20T15:30:00Z",
        totalAmount: "$149.99",
        orderStatus: "Shipped",
        estimatedDeliveryDate: "2025-03-25T15:30:00Z",
      },
      {
        orderId: 102,
        purchaseDate: "2025-03-17T09:45:00Z",
        totalAmount: "$89.50",
        orderStatus: "Delivered",
        estimatedDeliveryDate: "2025-03-22T09:45:00Z",
      },
    ]);
  }),

  http.get("/api/order/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      orderId: Number(id),
      email: "mock@example.com",
      phone: "5551234567",
      purchaseDate: "2025-03-20T15:30:00Z",
      totalAmount: "$149.99",
      orderStatus: "Shipped",
      estimatedDeliveryDate: "2025-03-25T15:30:00Z",
      trackingNumber: `TRACK-${id}`,
      billingAddress: {
        name: "Mock Billing",
        address1: "123 Test Ln",
        address2: "",
        city: "Testville",
        state: "TS",
        zip: "00000",
      },
      shippingAddress: {
        name: "Mock Shipping",
        address1: "456 Delivery Rd",
        address2: "",
        city: "Shipville",
        state: "SS",
        zip: "11111",
      },
      products: [],
    });
  }),
];
