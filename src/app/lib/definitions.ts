export type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Canceled";

export type OrderPreview = {
  orderId: number;
  purchaseDate: string;
  totalAmount: string;
  status: OrderStatus;
  estimatedDeliveryDate?: string | null;
};

export type Order = {
  email: string;
  phone: string;
  products: Product[];
} & OrderPreview &
  BillingAddress &
  ShippingAddress;

export type Product = {
  productId: number;
  name: string;
  quantity: number;
  price: string;
  thumbnailUrl: string;
  trackingNumber: string;
};

export type BillingAddress = {
  billingName: string;
  billingAddress1: string;
  billingAddress2?: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
};

export type ShippingAddress = {
  shippingName: string;
  shippingAddress1: string;
  shippingAddress2?: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
};
