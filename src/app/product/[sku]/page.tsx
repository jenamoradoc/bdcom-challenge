import { DummyJsonProductRepository } from '../../../infrastructure/repositories/DummyJsonProductRepository';
import { GetProductBySkuUseCase } from '../../../application/use-cases/GetProductBySkuUseCase';
import { GetCategoriesUseCase } from '../../../application/use-cases/GetCategoriesUseCase';
import { Header } from '../../../presentation/components/layout/Header/Header';
import { ProductDetail } from '../../../presentation/components/product/ProductDetail/ProductDetail';
import { EmptyState } from '../../../presentation/components/search/EmptyState/EmptyState';
import { Container } from '../../../presentation/components/layout/Container/Container';
import { BackButton } from '../../../presentation/components/ui/BackButton/BackButton';

interface ProductPageProps {
  params: Promise<{ sku: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { sku } = await params;

  const repository = new DummyJsonProductRepository();
  const getProductBySku = new GetProductBySkuUseCase(repository);
  const product = await getProductBySku.execute(sku);

  if (!product) {
    const getCategories = new GetCategoriesUseCase(repository);
    const categories = await getCategories.execute();

    return (
      <>
        <Header />
        <main>
          <Container>
            <EmptyState categories={categories} />
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Container>
          <BackButton />
          <ProductDetail product={product} />
        </Container>
      </main>
    </>
  );
}
