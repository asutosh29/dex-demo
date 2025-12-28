import { Session, User } from "better-auth";
import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  setUser: (user) =>
    set(() => ({
      user,
      isLoggedIn: user !== null,
    })),
}));
