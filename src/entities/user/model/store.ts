import { create } from "zustand";
import type { AuthState, User } from "./types";

export const useUserStore = create<AuthState>((set) => ({
  user: undefined, // undefined means loading
  setUser: (user: User | null | undefined) => set({ user }),
  logout: () => set({ user: null }),
}));
