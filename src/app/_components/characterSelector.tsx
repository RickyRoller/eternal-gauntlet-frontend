import { Box, Flex, Text } from "@radix-ui/themes";
import { Character } from "./character";
import { SignInDialog } from "./signInDialog";

export const CharacterSelector = () => {
  return (
    <Flex>
      <Box>
        <Character hero="dwarf-f" />
        <Character hero="dwarf-m" />
      </Box>
      <Box>
        <Character hero="elf-f" />
        <Character hero="elf-m" />
      </Box>
      <Box>
        <Character hero="knight-f" />
        <Character hero="knight-m" />
      </Box>
      <Box>
        <Character hero="lizard-f" />
        <Character hero="lizard-m" />
      </Box>
      <Box>
        <Character hero="wizzard-f" />
        <Character hero="wizzard-m" />
      </Box>
      <Box ml="2">
        <Text as="div">Select your hero!</Text>
        <Text as="div" color="violet">
          Connect to GameShift to earn new heroes
        </Text>
        <Box asChild mt="1">
          <SignInDialog />
        </Box>
      </Box>
    </Flex>
  );
};
