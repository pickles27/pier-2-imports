import { LoadingSpinner } from "app/components/designSystem";
import { OrderHistory } from "../components/OrderHistory/OrderHistory";
import { TrackOrderForm } from "../components/TrackOrderForm/TrackOrderForm";
import { Suspense } from "react";

async function fetchOrders(query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/?${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders. Please refresh and try again.");
  }
  return response.json();
}

export default async function Orders({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await searchParamsPromise;
  const query = new URLSearchParams(searchParams).toString();

  return (
    <div className="min-h-screen overflow-y bg-background-secondary font-[family-name:var(--font-geist-sans)] py-24 px-4 sm:px-20">
      <main className="w-full flex flex-col items-center sm:items-start gap-8">
        <TrackOrderForm />
        {query && (
          <Suspense fallback={<LoadingSpinner />}>
            <OrderHistory ordersPromise={fetchOrders(query)} />
          </Suspense>
        )}
      </main>
    </div>
  );
}
