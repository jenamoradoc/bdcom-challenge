import Image from 'next/image';
import { Product } from '../../../../domain/entities/Product';
import { formatPrice } from '../../../../lib/utils';
import { Badge } from '../../ui/Badge/Badge';
import { Typography } from '../../ui/Typography/Typography';
import { FavoriteButton } from '../../ui/FavoriteButton/FavoriteButton';
import { AddToCartButton } from '../../ui/AddToCartButton/AddToCartButton';

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
          <Typography variant="caption" className="uppercase tracking-wider">
            {product.brand}
          </Typography>
        )}

        <Typography variant="h1">{product.title}</Typography>

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
          <Typography variant="caption">{product.rating.toFixed(1)} / 5</Typography>
          <span className="text-sm text-gray-400">·</span>
          <Typography variant="caption">{product.stock} en stock</Typography>
        </div>

        <Badge label={product.category} variant="neutral" />

        <Typography variant="body" className="leading-relaxed">
          {product.description}
        </Typography>

        <div className="flex items-center gap-3 mt-2">
          <AddToCartButton product={product} />
          <FavoriteButton
            sku={product.sku}
            className="h-11 w-11 border border-gray-200 hover:border-red-400 text-gray-400 hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
}

export { ProductDetail };
export default ProductDetail;
