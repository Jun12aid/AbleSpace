import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/auth.api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
    retry: false,
  });
};
