import { useQuery } from "@tanstack/react-query";

export const useGetUserItems = (userId: string) => {
  return useQuery({
    queryKey: ["user", "items", userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}/items`, {
        method: "GET",
      });
      return await res.json();
    },
  });
};
