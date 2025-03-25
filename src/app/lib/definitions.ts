export type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Canceled";

export type Product = {
  productId: number;
  productName: string;
  quantity: number;
  price: string;
  thumbnailUrl: string;
};

export type Address = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
};

export type OrderPreview = {
  orderId: number;
  purchaseDate: string;
  totalAmount: string;
  orderStatus: OrderStatus;
  estimatedDeliveryDate?: string | null;
};

export type Order = OrderPreview & {
  email: string;
  phone: string;
  trackingNumber: string;
  billingAddress: Address;
  shippingAddress: Address;
  products: Product[];
};
