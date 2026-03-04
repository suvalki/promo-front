import { api } from "@/shared/api/base";
import type { AuthOutDto } from "@/shared/api/gen/api";

export const authApi = {
  getMe: async () => {
    return api.auth.authControllerMe();
  },
  logout: async () => {
    return api.auth.authControllerLogout();
  },
};
