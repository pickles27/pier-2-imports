import { NextResponse, NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const results = await sql`
      SELECT
        o.order_id,
        o.email,
        o.phone,
        o.purchase_date,
        o.total_amount,
        o.status,
        o.estimated_delivery_date,

        ba.name         AS billing_name,
        ba.address1     AS billing_address1,
        ba.address2     AS billing_address2,
        ba.city         AS billing_city,
        ba.state        AS billing_state,
        ba.zip          AS billing_zip,

        sa.name         AS shipping_name,
        sa.address1     AS shipping_address1,
        sa.address2     AS shipping_address2,
        sa.city         AS shipping_city,
        sa.state        AS shipping_state,
        sa.zip          AS shipping_zip,

        p.product_id,
        p.name          AS product_name,
        p.price,
        p.thumbnail_url,
        oi.quantity,
        oi.tracking_number

      FROM orders o

      LEFT JOIN billing_addresses ba ON ba.order_id = o.order_id
      LEFT JOIN shipping_addresses sa ON sa.order_id = o.order_id
      LEFT JOIN order_items oi ON oi.order_id = o.order_id
      LEFT JOIN products p ON p.product_id = oi.product_id

      WHERE o.order_id = ${id};
    `;

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
