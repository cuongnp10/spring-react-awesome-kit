import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loginAsDemo: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 1,
        email: "admin@awesomekit.dev",
        name: "Admin Developer",
        role: "ADMIN",
      },
      token: "demo-jwt-token-awesome-kit",
      isAuthenticated: true,
      login: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      loginAsDemo: () =>
        set({
          user: {
            id: 1,
            email: "admin@awesomekit.dev",
            name: "Admin Developer",
            role: "ADMIN",
          },
          token: "demo-jwt-token-awesome-kit",
          isAuthenticated: true,
        }),
    }),
    {
      name: "awesome-kit-auth",
    }
  )
);
