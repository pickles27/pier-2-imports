import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");

    const results = await sql`
      SELECT order_id, purchase_date, total_amount, status, estimated_delivery_date
      FROM orders
      WHERE email = ${email} OR phone = ${phone};
    `;

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
