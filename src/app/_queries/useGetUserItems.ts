import { useQuery } from "@tanstack/react-query";

export const useGetUserItems = (userId: string, enabled = false) => {
  return useQuery({
    enabled,
    queryKey: ["user", "items", userId],
    queryFn: async () => {
      const res = await fetch(`/api/user/${userId}/items`, {
        method: "GET",
      });
      const items = await res.json();
      return items.data;
    },
  });
};
