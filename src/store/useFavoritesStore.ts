import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  skus: string[];
  toggle: (sku: string) => void;
  isFavorite: (sku: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      skus: [],

      toggle: (sku) => {
        set((state) => ({
          skus: state.skus.includes(sku)
            ? state.skus.filter((s) => s !== sku)
            : [...state.skus, sku],
        }));
      },

      isFavorite: (sku) => get().skus.includes(sku),
    }),
    { name: 'favorites' }
  )
);
