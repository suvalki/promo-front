import { api } from "@/shared/api/base";

export const analyticsApi = {
  getMe: async () => {
    return api.analytics.analyticsControllerGetMe();
  },
};
