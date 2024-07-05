import { GameShiftService } from "@/services/gameShift";
import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useCreateUserMutation } from "../_queries/useCreateUserMutation";

const service = new GameShiftService();

export const SignInDialog = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate } = useCreateUserMutation();

  const handleSignIn = () => {
    const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(email);
    if (!email || !isValid) return;
    mutate(email, {
      onSuccess: (d) => {
        console.log(d);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger>
        <Button>Connect</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Connect to GameShift</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Sign in to GameShift to earn new characters as you play
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="mad.lad@backpack.lit"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleSignIn}>Sign in</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
