import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FAKE_USER = { email: 'usuario@bidcom.com', password: '1234', name: 'Usuario Bidcom' };

interface AuthStore {
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email, password) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
          set({ user: { email: FAKE_USER.email, name: FAKE_USER.name } });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null }),

      isLoggedIn: () => get().user !== null,
    }),
    { name: 'auth' }
  )
);
