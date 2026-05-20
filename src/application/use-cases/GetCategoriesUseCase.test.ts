import { describe, it, expect, vi } from 'vitest';
import { GetCategoriesUseCase } from './GetCategoriesUseCase';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Category } from '../../domain/entities/Category';

function makeFakeRepository(categories: Category[] = []): IProductRepository {
  return {
    search: vi.fn(),
    getById: vi.fn(),
    getBySkuFromList: vi.fn(),
    getCategories: vi.fn().mockResolvedValue(categories),
  };
}

describe('GetCategoriesUseCase', () => {
  it('returns categories from the repository', async () => {
    const fakeCategories: Category[] = [
      { slug: 'smartphones', name: 'Smartphones', url: 'https://dummyjson.com/products/category/smartphones' },
      { slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops' },
    ];
    const repository = makeFakeRepository(fakeCategories);
    const useCase = new GetCategoriesUseCase(repository);

    const result = await useCase.execute();

    expect(repository.getCategories).toHaveBeenCalledOnce();
    expect(result).toEqual(fakeCategories);
  });

  it('returns empty array when repository has no categories', async () => {
    const repository = makeFakeRepository([]);
    const useCase = new GetCategoriesUseCase(repository);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
