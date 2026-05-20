import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../../domain/entities/Product';
import { formatPrice } from '../../../../lib/utils';

export interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.sku}`}
      className="group flex flex-col bg-white rounded-[var(--radius-card)] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative h-48 md:h-56 overflow-hidden bg-[var(--color-neutral-100)]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1">
        <p className="text-sm text-[var(--color-neutral-900)] line-clamp-2 font-medium leading-snug">
          {product.title}
        </p>
        <p className="mt-auto pt-2 text-[var(--color-primary)] font-bold text-base">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export { ProductCard };
export default ProductCard;
