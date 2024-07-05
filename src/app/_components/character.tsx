import { Box } from "@radix-ui/themes";
import "./character-styles.css";
import { getHeroImage } from "../utils/getHeroImage";
import { Heroes } from "../types/heroes";
import cx from "classnames";

interface CharacterProps {
  hero: Heroes;
  availableHeroes: Heroes[];
  active: boolean;
  onClick: (hero: Heroes) => void;
}

export const Character = ({
  hero,
  availableHeroes,
  active,
  onClick,
}: CharacterProps) => {
  const heroImage = getHeroImage(hero);

  return (
    <Box
      onClick={() => onClick(hero)}
      className={cx("character", {
        locked: !availableHeroes.includes(hero),
        active,
      })}
    >
      <img src={heroImage} width="24px" />
    </Box>
  );
};
