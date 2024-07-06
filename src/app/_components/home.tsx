"use client";

import { Box } from "@radix-ui/themes";
import { CharacterSelector } from "./characterSelector";
import { ScoreHandler } from "./scoreHandler";
import { ReactElement } from "react";
import { ReactQueryProvider } from "./reactQueryProvider";
import init from "../../../public/eternal-gauntlet";

init();

interface HomeProps {
  canvas: ReactElement;
}

export const Home = ({ canvas }: HomeProps) => {
  return (
    <ReactQueryProvider>
      <Box>
        <ScoreHandler />
        <Box width="1279px" my="4">
          <CharacterSelector />
        </Box>
        {canvas}
      </Box>
    </ReactQueryProvider>
  );
};
