import { create } from "zustand";

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = sessionStorage.getItem("user");
  const storedToken = sessionStorage.getItem("token");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,

    setAuth: (user, token) => {
      set(() => {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        return { user, token };
      });
    },

    clearAuth: () => {
      set(() => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        return { user: null, token: null };
      });
    },
  };
});
