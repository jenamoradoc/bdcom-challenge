import { getProductRepository } from '../infrastructure/repositories/productRepositoryFactory';
import { SearchProductsUseCase } from '../application/use-cases/SearchProductsUseCase';
import { Typography } from '../presentation/components/ui/Typography/Typography';
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
          <Typography variant="h2" className="mb-6">Productos destacados</Typography>
          <ProductGrid products={products} />
        </Container>
      </main>
    </>
  );
}
