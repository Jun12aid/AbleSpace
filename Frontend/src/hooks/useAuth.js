import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get("/auth/me").then(res => res.data),
    retry: false,
  });

  return {
    user: data,
    isLoading,
  };
};
