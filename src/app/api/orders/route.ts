import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    const results = await sql`
      SELECT order_id, purchase_date, total_amount, status, estimated_delivery_date
      FROM orders
      WHERE email = ${email} OR phone = ${phone};
    `;

    const orders = results.map((result) => ({
      orderId: result.order_id,
      purchaseDate: result.purchase_date,
      totalAmount: result.total_amount,
      status: result.status,
      estimatedDeliveryDate: result.estimated_delivery_date,
    }));

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
