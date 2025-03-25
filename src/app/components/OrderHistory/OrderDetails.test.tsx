import { render, screen } from "@testing-library/react";
import { OrderDetails } from "./OrderDetails";
import { Order } from "app/lib/definitions";
import { formatDate } from "./helpers/formatDate";

export const mockOrderDetails: Order = {
  orderId: 42,
  purchaseDate: "2025-03-24T08:00:00.000Z",
  totalAmount: "$123.45",
  orderStatus: "Shipped",
  estimatedDeliveryDate: "2025-03-30T08:00:00.000Z",
  email: "mockuser@example.com",
  phone: "5551234567",
  trackingNumber: "TRACK-0042",
  products: [
    {
      productId: 1,
      productName: "Cozy Blanket",
      quantity: 1,
      price: "$45.00",
      thumbnailUrl: "https://via.placeholder.com/64",
    },
    {
      productId: 2,
      productName: "Ceramic Vase",
      quantity: 2,
      price: "$29.99",
      thumbnailUrl: "https://via.placeholder.com/64",
    },
  ],
  billingAddress: {
    name: "Jane Doe",
    address1: "123 Elm Street",
    address2: "Apt 5B",
    city: "Springfield",
    state: "IL",
    zip: "62704",
  },
  shippingAddress: {
    name: "Jane Doe",
    address1: "123 Elm Street",
    address2: "Apt 5B",
    city: "Springfield",
    state: "IL",
    zip: "62704",
  },
};

test("Order details renders the data as expected", () => {
  const errorMessage = "Mock error message";

  render(
    <OrderDetails
      errorMessage={errorMessage}
      order={mockOrderDetails}
      orderId={mockOrderDetails.orderId}
    />
  );

  expect(
    screen.getByRole("heading", {
      name: `Order Details #${mockOrderDetails.orderId}`,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", {
      name: "Products",
    })
  ).toBeInTheDocument();
  for (const product of mockOrderDetails.products) {
    expect(screen.getByText(product.productName)).toBeInTheDocument();
    expect(
      screen.getByText(`Qty: ${product.quantity} x ${product.price}`)
    ).toBeInTheDocument();
  }

  expect(
    screen.getByRole("heading", {
      name: "Billing Address",
    })
  ).toBeInTheDocument();

  // Billing and shipping name match
  expect(
    screen.getAllByText(mockOrderDetails.billingAddress.name)
  ).toHaveLength(2);

  expect(
    screen.getAllByText(mockOrderDetails.billingAddress.address1)
  ).toHaveLength(2);
  expect(
    screen.getAllByText(
      `${mockOrderDetails.billingAddress.city}, ${mockOrderDetails.billingAddress.state} ${mockOrderDetails.billingAddress.zip}`
    )
  ).toHaveLength(2);

  expect(
    screen.getByText(`Tracking Information: ${mockOrderDetails.trackingNumber}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      `Estimated Delivery Date: ${formatDate(
        mockOrderDetails.estimatedDeliveryDate
      )}`
    )
  ).toBeInTheDocument();
});
