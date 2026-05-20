import { describe, it, expect, vi } from 'vitest';
import { SearchProductsUseCase } from './SearchProductsUseCase';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    sku: 'ABC123',
    title: 'Test Product',
    price: 99.99,
    description: 'A test product',
    category: 'electronics',
    thumbnail: 'https://example.com/img.jpg',
    images: [],
    rating: 4.5,
    stock: 10,
    ...overrides,
  };
}

function makeFakeRepository(products: Product[] = []): IProductRepository {
  return {
    search: vi.fn().mockResolvedValue(products),
    getById: vi.fn(),
    getBySkuFromList: vi.fn(),
    getCategories: vi.fn(),
  };
}

describe('SearchProductsUseCase', () => {
  it('calls repository.search with the given query and default limit', async () => {
    const fakeProducts = [makeProduct()];
    const repository = makeFakeRepository(fakeProducts);
    const useCase = new SearchProductsUseCase(repository);

    const result = await useCase.execute('laptop');

    expect(repository.search).toHaveBeenCalledWith('laptop', 20);
    expect(result).toEqual(fakeProducts);
  });

  it('calls repository.search with a custom limit when provided', async () => {
    const repository = makeFakeRepository();
    const useCase = new SearchProductsUseCase(repository);

    await useCase.execute('phone', 10);

    expect(repository.search).toHaveBeenCalledWith('phone', 10);
  });

  it('returns empty array when repository returns no products', async () => {
    const repository = makeFakeRepository([]);
    const useCase = new SearchProductsUseCase(repository);

    const result = await useCase.execute('nonexistent');

    expect(result).toEqual([]);
  });
});
