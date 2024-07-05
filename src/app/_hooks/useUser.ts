import { useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user"]);
  console.log(userData);
  return userData;
};
