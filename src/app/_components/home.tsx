"use client";

import { Box } from "@radix-ui/themes";
import { CharacterSelector } from "./characterSelector";
import { ScoreHandler } from "./scoreHandler";

export const Home = () => {
  return (
    <Box>
      <ScoreHandler />
      <Box width="1279px" my="4">
        <CharacterSelector />
      </Box>
      <canvas id="game-canvas" width="1200px" height="700px" />
    </Box>
  );
};
