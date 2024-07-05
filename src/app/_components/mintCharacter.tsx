import { Box } from "@radix-ui/themes";
import { getHeroImage } from "../utils/getHeroImage";
import "./mint-character.css";

export const MintCharacter = ({ data }: { data: any }) => {
  const hero = data?.item?.attributes?.find(
    (attr: any) => attr.traitType === "hero",
  );
  if (!hero) return <></>;

  const heroImage = getHeroImage(hero.value);
  return (
    <Box my="3" className="mint-character">
      <img src={heroImage} alt={hero.value} />
    </Box>
  );
};
