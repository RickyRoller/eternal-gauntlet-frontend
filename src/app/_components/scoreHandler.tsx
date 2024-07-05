import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useGetUser } from "../_queries/userGetUser";
import { useMintMutation } from "../_queries/useMintMutation";
import { MinusIcon } from "@radix-ui/react-icons";
import "./score-handler-styles.css";
import { MintCharacter } from "./mintCharacter";

const WINNING_SCORE = 2000;

export const ScoreHandler = () => {
  const [score, setScore] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintData, setMintData] = useState<any>(null);
  const { data: user } = useGetUser();

  const { mutate } = useMintMutation();

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "score") {
        setScore(event.data.score);
      }
    });
  }, []);

  useEffect(() => {
    if (score !== 0 && user?.referenceId) {
      setShowDialog(true);
    }
  }, [score]);

  const handleMint = () => {
    if (!user?.referenceId) return;
    setIsMinting(true);
    mutate(user?.referenceId, {
      onSuccess: (data) => {
        setIsMinting(false);
        setShowDialog(false);
        setMintData(data);
      },
    });
  };

  return (
    <>
      {/* Mint success dialog */}
      <Dialog.Root
        onOpenChange={(open) => {
          if (!open) setMintData(null);
        }}
        open={!!mintData}
      >
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Congratulations!</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            You earned a new hero!
            <MintCharacter data={mintData} />
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="center">
            <Box asChild width="100%">
              <Dialog.Close>
                <Button>Play again</Button>
              </Dialog.Close>
            </Box>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Game Over dialog */}
      <Dialog.Root onOpenChange={setShowDialog} open={showDialog}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Game Over</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            You scored {score} points and earned a new hero!
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="center">
            <Box asChild width="100%">
              {score > WINNING_SCORE ? (
                <Button onClick={handleMint}>
                  {isMinting && (
                    <Box asChild className="spinner">
                      <MinusIcon />
                    </Box>
                  )}{" "}
                  Mint
                </Button>
              ) : (
                <Dialog.Close>
                  <Button>Try again</Button>
                </Dialog.Close>
              )}
            </Box>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
