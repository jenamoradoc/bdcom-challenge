import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Category } from '../../domain/entities/Category';

export class GetCategoriesUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(): Promise<Category[]> {
    return this.repository.getCategories();
  }
}
