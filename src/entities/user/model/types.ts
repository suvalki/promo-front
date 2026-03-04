import type { AuthOutDto } from "@/shared/api/gen/api";

export type User = AuthOutDto;

export interface AuthState {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
  logout: () => void;
}
