import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/user";

export const useGetUser = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const userData = queryClient.getQueryData(["user-cache"]);
      return userData as User;
    },
  });
};
