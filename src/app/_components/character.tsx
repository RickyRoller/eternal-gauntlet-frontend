import { Box } from "@radix-ui/themes";
import "./character-styles.css";

type Heroes = Record<string, string>;
const heroes: Heroes = {
  doc: "doc/doc_idle_anim_f0",
  "dwarf-f": "dwarf/f/dwarf_f_idle_anim_f0",
  "dwarf-m": "dwarf/m/dwarf_m_idle_anim_f0",
  "elf-f": "elf/f/elf_f_idle_anim_f0",
  "elf-m": "elf/m/elf_m_idle_anim_f0",
  "knight-f": "knight/f/knight_f_idle_anim_f0",
  "knight-m": "knight/m/knight_m_idle_anim_f0",
  "lizard-f": "lizard/f/lizard_f_idle_anim_f0",
  "lizard-m": "lizard/m/lizard_m_idle_anim_f0",
  "wizzard-f": "wizard/f/wizzard_f_idle_anim_f0",
  "wizzard-m": "wizard/m/wizzard_m_idle_anim_f0",
};

interface CharacterProps {
  hero: string;
}

export const Character = ({ hero }: CharacterProps) => {
  const heroImage = heroes[hero];

  return (
    <Box className="character">
      <img src={`/assets/heroes/${heroImage}.png`} width="24px" />
    </Box>
  );
};
