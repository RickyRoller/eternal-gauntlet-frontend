import { Box, Flex, Text } from "@radix-ui/themes";
import { Character } from "./character";
import { SignInDialog } from "./signInDialog";
import { useGetUser } from "../_queries/userGetUser";
import { useUserHeroes } from "../_hooks/useUserHeroes";
import { send_message_to_bevy } from "../../../public/eternal-gauntlet";
import { Heroes } from "../types/heroes";
import { useEffect, useState } from "react";

export const CharacterSelector = () => {
  const { data: user } = useGetUser();
  const userHeroes = useUserHeroes();

  const [activeHero, setActiveHero] = useState<Heroes>("wizzard-m");

  useEffect(() => {
    // Send ready message from bevy and then send the hero to bevy
    // send_message_to_bevy("wizzard-m");
  }, []);

  const handleClick = (hero: Heroes) => {
    setActiveHero(hero);
    send_message_to_bevy(hero);
  };

  return (
    <Flex>
      <Box>
        <Character
          active={activeHero === "dwarf-f"}
          hero="dwarf-f"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
        <Character
          active={activeHero === "dwarf-m"}
          hero="dwarf-m"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
      </Box>
      <Box>
        <Character
          active={activeHero === "elf-f"}
          hero="elf-f"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
        <Character
          active={activeHero === "elf-m"}
          hero="elf-m"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
      </Box>
      <Box>
        <Character
          active={activeHero === "knight-f"}
          hero="knight-f"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
        <Character
          active={activeHero === "knight-m"}
          hero="knight-m"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
      </Box>
      <Box>
        <Character
          active={activeHero === "lizard-f"}
          hero="lizard-f"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
        <Character
          active={activeHero === "lizard-m"}
          hero="lizard-m"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
      </Box>
      <Box>
        <Character
          active={activeHero === "wizzard-f"}
          hero="wizzard-f"
          availableHeroes={userHeroes}
          onClick={handleClick}
        />
        <Character
          active={activeHero === "wizzard-m"}
          hero="wizzard-m"
          availableHeroes={["wizzard-m"]}
          onClick={handleClick}
        />
      </Box>
      <Box ml="2">
        <Text as="div">Select your hero!</Text>
        <Text as="div" color="violet">
          {user
            ? "Connected! Play to earn new heroes"
            : "Connect to earn new heroes"}
        </Text>
        {!user && (
          <Box mt="1">
            <SignInDialog />
          </Box>
        )}
      </Box>
    </Flex>
  );
};
