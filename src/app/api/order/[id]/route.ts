import { NextResponse, NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Order } from "app/lib/definitions";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [order] = await sql`
      SELECT
        o.order_id,
        o.email,
        o.phone,
        o.purchase_date,
        o.total_amount,
        o.status,
        o.estimated_delivery_date,
        o.tracking_number,

        json_build_object(
          'name', ba.name,
          'address1', ba.address1,
          'address2', ba.address2,
          'city', ba.city,
          'state', ba.state,
          'zip', ba.zip
        ) AS billing_address,

        json_build_object(
          'name', sa.name,
          'address1', sa.address1,
          'address2', sa.address2,
          'city', sa.city,
          'state', sa.state,
          'zip', sa.zip
        ) AS shipping_address,

        json_agg(
          json_build_object(
            'productId', p.product_id,
            'productName', p.name,
            'price', p.price,
            'thumbnailUrl', p.thumbnail_url,
            'quantity', oi.quantity
          )
        ) FILTER (WHERE p.product_id IS NOT NULL) AS products

      FROM orders o
      LEFT JOIN billing_addresses ba ON ba.order_id = o.order_id
      LEFT JOIN shipping_addresses sa ON sa.order_id = o.order_id
      LEFT JOIN order_items oi ON oi.order_id = o.order_id
      LEFT JOIN products p ON p.product_id = oi.product_id
      WHERE o.order_id = ${id}
      GROUP BY
        o.order_id,
        ba.name, ba.address1, ba.address2, ba.city, ba.state, ba.zip,
        sa.name, sa.address1, sa.address2, sa.city, sa.state, sa.zip;
    `;

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const formattedOrder: Order = {
      orderId: order.order_id,
      email: order.email,
      phone: order.phone,
      purchaseDate: order.purchase_date.toISOString(),
      totalAmount: order.total_amount,
      orderStatus: order.status,
      trackingNumber: order.tracking_number,
      estimatedDeliveryDate:
        order.estimated_delivery_date?.toISOString() ?? null,
      billingAddress: order.billing_address,
      shippingAddress: order.shipping_address,
      products: order.products,
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
