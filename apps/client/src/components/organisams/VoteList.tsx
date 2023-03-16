import { Container, Stack, Center, Skeleton, Text, Heading } from "@chakra-ui/react";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";
import { RadioButton } from "../atoms/RadioButton";
import { VoteCard } from "../molecules/VoteCard";
import { useFetchProposals } from "use-aragon";
import { useRouter } from "next/router";
import { CardContainer } from "../atoms/CardContainer";

export const VoteList = () => {
  const router = useRouter();
  const { dao } = router.query;

  const votes = useFetchProposals({
    daoAddressOrEns: dao as string,
  });
  return (
    <Container w="100%" px="0">
      <Center>
        <RadioButtonGroup
          key={"md"}
          defaultValue="all"
          size={"md"}
          onChange={(e) => console.log(e)}
        >
          <RadioButton value="open">Open</RadioButton>
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="closed">Closed</RadioButton>
        </RadioButtonGroup>
      </Center>
      <Stack pt={4} w="100%">
        {votes?.data?.map((vote) => (
          <VoteCard key={vote.id} {...vote} />
        ))}
        {votes?.data?.length === 0 && (
          <CardContainer h="200px">
            <Center>
              <Heading size="lg" fontWeight="normal">
                No Votes!
              </Heading>
            </Center>
          </CardContainer>
        )}
        {<Skeleton height="200px" isLoaded={!!votes.data} />}
      </Stack>
    </Container>
  );
};
