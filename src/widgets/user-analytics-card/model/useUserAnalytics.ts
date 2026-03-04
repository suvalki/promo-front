import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/entities/analytics/api";

export const useUserAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "me"],
    queryFn: () => analyticsApi.getMe(),
  });

  return {
    data,
    isLoading,
  };
};
