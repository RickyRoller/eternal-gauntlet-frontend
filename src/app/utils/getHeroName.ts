import { Heroes } from "../types/heroes";

const heroNames: Record<Heroes, string> = {
  "dwarf-f": "Dwarf Female",
  "dwarf-m": "Dwarf Male",
  "elf-f": "Elf Female",
  "elf-m": "Elf Male",
  "knight-f": "Knight Female",
  "knight-m": "Knight Male",
  "lizard-f": "Lizard Female",
  "lizard-m": "Lizard Male",
  "wizzard-f": "Wizzard Female",
  "wizzard-m": "Wizzard Male",
};

export const getHeroName = (hero: Heroes): string => heroNames[hero];
