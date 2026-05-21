import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../domain/entities/Product';

interface FavoritesStore {
  products: Product[];
  toggle: (product: Product) => void;
  isFavorite: (sku: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      products: [],

      toggle: (product) => {
        set((state) => ({
          products: state.products.some((p) => p.sku === product.sku)
            ? state.products.filter((p) => p.sku !== product.sku)
            : [...state.products, product],
        }));
      },

      isFavorite: (sku) => get().products.some((p) => p.sku === sku),
    }),
    { name: 'favorites' }
  )
);
