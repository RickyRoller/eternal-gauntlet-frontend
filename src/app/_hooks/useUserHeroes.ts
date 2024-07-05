import { useGetUserItems } from "../_queries/useGetUserItems";
import { useGetUser } from "../_queries/userGetUser";

export const userUserHeroes = () => {
  const { data: user } = useGetUser();
  const { data: userItems } = useGetUserItems(
    user?.referenceId ?? "",
    !!user?.referenceId,
  );

  return userItems
    ? userItems?.flatMap((item: any) =>
        item.item.attributes
          .filter((attr: any) => attr.traitType === "hero")
          .map((attr: any) => attr.value),
      )
    : [];
};
