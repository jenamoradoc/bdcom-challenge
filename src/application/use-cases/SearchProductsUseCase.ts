import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Product } from '../../domain/entities/Product';

export class SearchProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(query: string, limit: number = 20): Promise<Product[]> {
    return this.repository.search(query, limit);
  }
}
