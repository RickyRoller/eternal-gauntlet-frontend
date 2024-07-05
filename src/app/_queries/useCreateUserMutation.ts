import { GameShiftService } from "@/app/_services/gameShift";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(`/api/user/create`, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      return await res.json();
    },
  });
};
