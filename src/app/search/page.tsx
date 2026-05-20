import type { Metadata } from 'next';
import { DummyJsonProductRepository } from '../../infrastructure/repositories/DummyJsonProductRepository';
import { SearchProductsUseCase } from '../../application/use-cases/SearchProductsUseCase';
import { GetCategoriesUseCase } from '../../application/use-cases/GetCategoriesUseCase';
import { Header } from '../../presentation/components/layout/Header/Header';
import { ProductGrid } from '../../presentation/components/product/ProductGrid/ProductGrid';
import { EmptyState } from '../../presentation/components/search/EmptyState/EmptyState';
import { Container } from '../../presentation/components/layout/Container/Container';
import { Category } from '../../domain/entities/Category';

interface SearchPageProps {
  searchParams: Promise<{ s?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { s } = await searchParams;
  if (!s) return { title: 'Productos — Bidcom' };
  return { title: `"${s}" — Bidcom` };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s } = await searchParams;
  const query = s ?? '';

  const repository = new DummyJsonProductRepository();
  const searchProducts = new SearchProductsUseCase(repository);
  const products = await searchProducts.execute(query);

  const hasResults = products.length > 0;

  let categories: Category[] = [];
  if (!hasResults) {
    const getCategories = new GetCategoriesUseCase(repository);
    categories = await getCategories.execute();
  }

  return (
    <>
      <Header initialSearchValue={query} />
      <main>
        <Container className="py-8">
          {hasResults ? (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {products.length} resultado{products.length !== 1 ? 's' : ''} para{' '}
                <strong>&ldquo;{query}&rdquo;</strong>
              </p>
              <ProductGrid products={products} />
            </>
          ) : (
            <EmptyState categories={categories} />
          )}
        </Container>
      </main>
    </>
  );
}
