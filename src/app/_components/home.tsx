"use client";

import { Box } from "@radix-ui/themes";
import { useUser } from "../_hooks/useUser";
import { CharacterSelector } from "./characterSelector";

export const Home = () => {
  const user = useUser();
  // useGetUserItems(user.id);

  return (
    <Box>
      <Box width="1279px" my="4">
        <CharacterSelector />
      </Box>
      <canvas id="game-canvas" width="1200px" height="700px" />
    </Box>
  );
};
