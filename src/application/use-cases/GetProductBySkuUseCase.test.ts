import { describe, it, expect, vi } from 'vitest';
import { GetProductBySkuUseCase } from './GetProductBySkuUseCase';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    sku: 'RCH45Q1A',
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

function makeFakeRepository(product: Product | null): IProductRepository {
  return {
    search: vi.fn(),
    getById: vi.fn(),
    getBySkuFromList: vi.fn().mockResolvedValue(product),
    getCategories: vi.fn(),
  };
}

describe('GetProductBySkuUseCase', () => {
  it('returns the product when the sku exists', async () => {
    const product = makeProduct({ sku: 'RCH45Q1A' });
    const repository = makeFakeRepository(product);
    const useCase = new GetProductBySkuUseCase(repository);

    const result = await useCase.execute('RCH45Q1A');

    expect(repository.getBySkuFromList).toHaveBeenCalledWith('RCH45Q1A');
    expect(result).toEqual(product);
  });

  it('returns null when no product matches the sku', async () => {
    const repository = makeFakeRepository(null);
    const useCase = new GetProductBySkuUseCase(repository);

    const result = await useCase.execute('NONEXISTENT');

    expect(result).toBeNull();
  });

  it('passes the sku exactly as received to the repository', async () => {
    const repository = makeFakeRepository(null);
    const useCase = new GetProductBySkuUseCase(repository);

    await useCase.execute('ABC-123-XYZ');

    expect(repository.getBySkuFromList).toHaveBeenCalledWith('ABC-123-XYZ');
  });
});
