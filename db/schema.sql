CREATE TYPE order_status AS ENUM (
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Canceled'
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  purchase_date TIMESTAMP NOT NULL,
  total_amount TEXT NOT NULL,
  status order_status NOT NULL,
  estimated_delivery_date TIMESTAMP,
  tracking_number TEXT
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(product_id),
  quantity INTEGER NOT NULL
);

CREATE TABLE billing_addresses (
  order_id INTEGER PRIMARY KEY REFERENCES orders(order_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL
);

CREATE TABLE shipping_addresses (
  order_id INTEGER PRIMARY KEY REFERENCES orders(order_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL
);
