import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getRandomHero } from "../utils/getRandomHero";
import { useUserHeroes } from "../_hooks/useUserHeroes";

export const useMintMutation = () => {
  const queryClient = useQueryClient();
  const userHeroes = useUserHeroes();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await fetch(`/api/user/${userId}/items/create`, {
        method: "POST",
        body: JSON.stringify({
          hero: getRandomHero(userHeroes),
        }),
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "items"] });
    },
  });
};
