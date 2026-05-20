import { getProductRepository } from '../infrastructure/repositories/productRepositoryFactory';
import { SearchProductsUseCase } from '../application/use-cases/SearchProductsUseCase';
import { Header } from '../presentation/components/layout/Header/Header';
import { ProductGrid } from '../presentation/components/product/ProductGrid/ProductGrid';
import { Container } from '../presentation/components/layout/Container/Container';

export default async function HomePage() {
  const repository = getProductRepository();
  const searchProducts = new SearchProductsUseCase(repository);
  const products = await searchProducts.execute('');

  return (
    <>
      <Header />
      <main>
        <Container className="py-8">
          <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
            Productos destacados
          </h2>
          <ProductGrid products={products} />
        </Container>
      </main>
    </>
  );
}
