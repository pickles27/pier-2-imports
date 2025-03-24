// Note - these should be auto generated based on schema
// Would also normally use camel case as opposed to snake case on client side for keys

export type OrderStatus =
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Canceled";

export type OrderPreview = {
  order_id: number;
  purchase_date: string;
  total_amount: string;
  status: OrderStatus;
  estimated_delivery_date?: string | null;
};

export type Order = {
  email: string;
  phone: string;
  products: Product[];
} & OrderPreview &
  BillingAddress &
  ShippingAddress;

export type Product = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: string;
  thumbnail_url: string;
  tracking_number: string;
};

export type BillingAddress = {
  billing_name: string;
  billing_address1: string;
  billing_address2?: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
};

export type ShippingAddress = {
  shipping_name: string;
  shipping_address1: string;
  shipping_address2?: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
};
