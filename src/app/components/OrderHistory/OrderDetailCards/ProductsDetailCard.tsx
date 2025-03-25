import { Product } from "app/lib/definitions";
import { BaseDetailCard } from "./BaseDetailCard";
import Image from "next/image";

export type ProductsDetailCardProps = {
  products: Product[];
};

export const ProductsDetailCard = ({ products }: ProductsDetailCardProps) => {
  return (
    <BaseDetailCard title="Products">
      <div className="flex flex-col gap-2">
        {products.map(
          ({ productId, productName, thumbnailUrl, quantity, price }) => (
            <figure
              key={productId}
              className="flex items-center gap-2 text-sm text-foreground-secondary"
            >
              <Image
                className="rounded-sm"
                height={64}
                width={64}
                alt={productName}
                src={thumbnailUrl}
              />
              <figcaption className="flex flex-col">
                <span className="font-bold text-foreground">{productName}</span>
                <span>
                  Qty: {quantity} x {price}
                </span>
              </figcaption>
            </figure>
          )
        )}
      </div>
    </BaseDetailCard>
  );
};
