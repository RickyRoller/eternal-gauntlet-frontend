import { Box, Button, Flex } from "@radix-ui/themes";
import { SignInDialog } from "./signInDialog";

export const Header = () => {
  return (
    <Box asChild p="2" mb="1" width="100%">
      <Flex justify="end">
        <SignInDialog />
      </Flex>
    </Box>
  );
};
