import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { OrderPreview } from "app/lib/definitions";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    const rows = await sql`
      SELECT order_id, purchase_date, total_amount, status, estimated_delivery_date
      FROM orders
      WHERE email = ${email} OR phone = ${phone}
      ORDER BY purchase_date DESC;
    `;

    const orders: OrderPreview[] = rows.map((row) => ({
      orderId: row.order_id,
      purchaseDate:
        typeof row.purchase_date === "string"
          ? row.purchase_date
          : row.purchase_date.toISOString(),
      totalAmount: row.total_amount,
      orderStatus: row.status,
      estimatedDeliveryDate: row.estimated_delivery_date
        ? typeof row.estimated_delivery_date === "string"
          ? row.estimated_delivery_date
          : row.estimated_delivery_date.toISOString()
        : null,
    }));

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
