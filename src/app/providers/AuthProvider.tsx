import { useUserStore } from "@/entities/user/model/store";
import { authApi } from "@/entities/user/api/auth";
import { LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => authApi.getMe(),
    retry: false,
    enabled: user === undefined,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (isError) {
      setUser(null);
    }
  }, [data, isError, setUser]);

  if (user === undefined || (isLoading && !data)) {
    return <LoadingOverlay visible />;
  }

  return <>{children}</>;
};
