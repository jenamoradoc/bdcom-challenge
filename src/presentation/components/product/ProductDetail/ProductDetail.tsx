import Image from 'next/image';
import { Product } from '../../../../domain/entities/Product';
import { formatPrice } from '../../../../lib/utils';
import { Badge } from '../../ui/Badge/Badge';

export interface ProductDetailProps {
  product: Product;
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <div className="relative aspect-square rounded-[var(--radius-card)] overflow-hidden bg-[var(--color-neutral-100)]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        {product.brand && (
          <p className="text-sm text-gray-500 uppercase tracking-wider">
            {product.brand}
          </p>
        )}

        <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">
          {product.title}
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-[var(--color-primary)]">
            {formatPrice(product.price)}
          </span>
          {product.discountPercentage && product.discountPercentage > 0 && (
            <Badge
              label={`-${Math.round(product.discountPercentage)}%`}
              variant="secondary"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-yellow-400" aria-hidden="true">★</span>
          <span className="text-sm text-gray-600">
            {product.rating.toFixed(1)} / 5
          </span>
          <span className="text-sm text-gray-400">·</span>
          <span className="text-sm text-gray-600">
            {product.stock} en stock
          </span>
        </div>

        <Badge label={product.category} variant="neutral" />

        <p className="text-[var(--color-neutral-900)] leading-relaxed">
          {product.description}
        </p>

        <button className="mt-2 w-full md:w-auto px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-[var(--radius-button)] hover:bg-[var(--color-primary-dark)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export { ProductDetail };
export default ProductDetail;
