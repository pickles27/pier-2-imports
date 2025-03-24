import { OrderHistory } from "../components/OrderHistory/OrderHistory";
import { TrackOrderForm } from "../components/TrackOrderForm/TrackOrderForm";

export default async function Orders({
  searchParams: searchParamsPromise,
}: {
  searchParams: Record<string, string>;
}) {
  const searchParams = await searchParamsPromise;
  const query = new URLSearchParams(searchParams).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/?${query}`
  );
  const orders = await response.json();

  // todo: ensure fetch only called when at least one of the query params exist
  // add error boundary and suspense
  // check response.ok and handle error if needed

  return (
    <div className="min-h-screen overflow-y bg-gray-100 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)] py-24 px-4 sm:px-20">
      <main className="w-full flex flex-col items-center sm:items-start gap-8">
        <TrackOrderForm />
        <OrderHistory orders={orders} />
      </main>
    </div>
  );
}
